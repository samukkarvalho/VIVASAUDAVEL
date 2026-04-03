// LICENSE SYSTEM - VidaSaudável
// Sistema de gerenciamento de licenças

import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

class LicenseSystem {
    constructor(db, auth) {
        this.db = db;
        this.auth = auth;
    }

    // Gerar código de licença
    generateLicenseCode() {
        const year = new Date().getFullYear();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `VIDA-${year}-${random}`;
    }

    // Criar nova licença
    async createLicense(code, email, price, currency) {
        try {
            const licenseRef = doc(this.db, 'licenses', code);
            await setDoc(licenseRef, {
                code: code,
                email: email,
                price: price,
                currency: currency,
                status: 'active',
                createdAt: serverTimestamp(),
                activatedAt: null,
                userId: null,
                type: 'lifetime'
            });
            return { success: true, code };
        } catch (error) {
            console.error('Erro ao criar licença:', error);
            return { success: false, error: error.message };
        }
    }

    // Ativar licença
    async activateLicense(code, userId) {
        try {
            const licenseRef = doc(this.db, 'licenses', code);
            const licenseSnap = await getDoc(licenseRef);

            if (!licenseSnap.exists()) {
                return { success: false, error: 'Código inválido' };
            }

            const license = licenseSnap.data();

            if (license.userId && license.userId !== userId) {
                return { success: false, error: 'Código já ativado por outro usuário' };
            }

            if (license.status !== 'active') {
                return { success: false, error: 'Código inativo' };
            }

            // Atualizar licença
            await updateDoc(licenseRef, {
                userId: userId,
                activatedAt: serverTimestamp()
            });

            // Atualizar usuário para premium
            const userRef = doc(this.db, 'users', userId);
            await updateDoc(userRef, {
                isPremium: true,
                licenseCode: code,
                upgradedAt: serverTimestamp()
            });

            return { success: true };
        } catch (error) {
            console.error('Erro ao ativar licença:', error);
            return { success: false, error: error.message };
        }
    }

    // Verificar se usuário é premium
    async checkPremiumStatus(userId) {
        try {
            const userRef = doc(this.db, 'users', userId);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                return false;
            }

            const userData = userSnap.data();
            return userData.isPremium === true;
        } catch (error) {
            console.error('Erro ao verificar status:', error);
            return false;
        }
    }

    // Verificar limites de uso (versão free)
    async checkUsageLimits(userId, type) {
        try {
            const userRef = doc(this.db, 'users', userId);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                return { canUse: false, reason: 'user_not_found' };
            }

            const userData = userSnap.data();

            // Premium tem acesso ilimitado
            if (userData.isPremium === true) {
                return { canUse: true, isPremium: true };
            }

            // Verificar limites da versão free
            const now = new Date();
            const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());

            const usageRef = doc(this.db, 'usage', `${userId}_${weekStart.getTime()}`);
            const usageSnap = await getDoc(usageRef);

            let usage = usageSnap.exists() ? usageSnap.data() : {
                treinos: 0,
                dietas: 0,
                weekStart: weekStart.getTime()
            };

            // Limites da versão free: 1 por semana
            if (type === 'treino' && usage.treinos >= 1) {
                return { canUse: false, reason: 'limit_reached', limit: 1 };
            }

            if (type === 'dieta' && usage.dietas >= 1) {
                return { canUse: false, reason: 'limit_reached', limit: 1 };
            }

            return { canUse: true, isPremium: false, usage };
        } catch (error) {
            console.error('Erro ao verificar limites:', error);
            return { canUse: false, reason: 'error' };
        }
    }

    // Incrementar uso
    async incrementUsage(userId, type) {
        try {
            const now = new Date();
            const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
            const usageRef = doc(this.db, 'usage', `${userId}_${weekStart.getTime()}`);

            const usageSnap = await getDoc(usageRef);
            let usage = usageSnap.exists() ? usageSnap.data() : {
                treinos: 0,
                dietas: 0,
                weekStart: weekStart.getTime()
            };

            if (type === 'treino') {
                usage.treinos += 1;
            } else if (type === 'dieta') {
                usage.dietas += 1;
            }

            await setDoc(usageRef, usage);
            return true;
        } catch (error) {
            console.error('Erro ao incrementar uso:', error);
            return false;
        }
    }
}

// Exportar
window.LicenseSystem = LicenseSystem;
