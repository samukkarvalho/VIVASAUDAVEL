// ====================================================
// 🔥 FIREBASE HELPER - FUNÇÕES AUXILIARES
// ====================================================
// Use este arquivo em treino.html, dieta.html, acompanhamento.html

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, where, getDocs, orderBy, limit } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// ============================================
// ⚠️ COLE SUAS CONFIGURAÇÕES AQUI TAMBÉM
// ============================================
const firebaseConfig = {
    apiKey: "COLE_SEU_API_KEY_AQUI",
    authDomain: "COLE_SEU_AUTH_DOMAIN_AQUI",
    projectId: "COLE_SEU_PROJECT_ID_AQUI",
    storageBucket: "COLE_SEU_STORAGE_BUCKET_AQUI",
    messagingSenderId: "COLE_SEU_MESSAGING_SENDER_ID_AQUI",
    appId: "COLE_SEU_APP_ID_AQUI"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ====================================================
// VERIFICAR SE USUÁRIO ESTÁ LOGADO
// ====================================================
export function checkAuth(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            callback(user);
        } else {
            // Redirecionar para login se não estiver logado
            window.location.href = 'index.html';
        }
    });
}

// ====================================================
// SALVAR TREINO NO FIRESTORE
// ====================================================
export async function salvarTreino(userId, treinoData) {
    try {
        const treinoRef = await addDoc(collection(db, `users/${userId}/treinos`), {
            ...treinoData,
            criadoEm: new Date(),
            tipo: 'treino'
        });
        
        console.log('Treino salvo com ID:', treinoRef.id);
        return { success: true, id: treinoRef.id };
    } catch (error) {
        console.error('Erro ao salvar treino:', error);
        return { success: false, error };
    }
}

// ====================================================
// CARREGAR ÚLTIMO TREINO
// ====================================================
export async function carregarUltimoTreino(userId) {
    try {
        const q = query(
            collection(db, `users/${userId}/treinos`),
            orderBy('criadoEm', 'desc'),
            limit(1)
        );
        
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { success: true, data: doc.data(), id: doc.id };
        } else {
            return { success: false, message: 'Nenhum treino encontrado' };
        }
    } catch (error) {
        console.error('Erro ao carregar treino:', error);
        return { success: false, error };
    }
}

// ====================================================
// SALVAR DIETA NO FIRESTORE
// ====================================================
export async function salvarDieta(userId, dietaData) {
    try {
        const dietaRef = await addDoc(collection(db, `users/${userId}/dietas`), {
            ...dietaData,
            criadoEm: new Date(),
            tipo: 'dieta'
        });
        
        console.log('Dieta salva com ID:', dietaRef.id);
        return { success: true, id: dietaRef.id };
    } catch (error) {
        console.error('Erro ao salvar dieta:', error);
        return { success: false, error };
    }
}

// ====================================================
// CARREGAR ÚLTIMA DIETA
// ====================================================
export async function carregarUltimaDieta(userId) {
    try {
        const q = query(
            collection(db, `users/${userId}/dietas`),
            orderBy('criadoEm', 'desc'),
            limit(1)
        );
        
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { success: true, data: doc.data(), id: doc.id };
        } else {
            return { success: false, message: 'Nenhuma dieta encontrada' };
        }
    } catch (error) {
        console.error('Erro ao carregar dieta:', error);
        return { success: false, error };
    }
}

// ====================================================
// SALVAR PROGRESSO (PESO, MEDIDAS)
// ====================================================
export async function salvarProgresso(userId, progressoData) {
    try {
        const progressoRef = await addDoc(collection(db, `users/${userId}/progressos`), {
            ...progressoData,
            registradoEm: new Date()
        });
        
        console.log('Progresso salvo com ID:', progressoRef.id);
        return { success: true, id: progressoRef.id };
    } catch (error) {
        console.error('Erro ao salvar progresso:', error);
        return { success: false, error };
    }
}

// ====================================================
// CARREGAR TODOS OS PROGRESSOS
// ====================================================
export async function carregarProgressos(userId) {
    try {
        const q = query(
            collection(db, `users/${userId}/progressos`),
            orderBy('registradoEm', 'asc')
        );
        
        const querySnapshot = await getDocs(q);
        const progressos = [];
        
        querySnapshot.forEach((doc) => {
            progressos.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return { success: true, data: progressos };
    } catch (error) {
        console.error('Erro ao carregar progressos:', error);
        return { success: false, error };
    }
}

// ====================================================
// EXEMPLO DE USO EM TREINO.HTML
// ====================================================
/*
<script type="module">
    import { checkAuth, salvarTreino, carregarUltimoTreino } from './firebase-helper.js';
    
    checkAuth(async (user) => {
        console.log('Usuário logado:', user.displayName);
        
        // Ao gerar treino, salvar no Firebase
        const treinoData = {
            objetivo: 'Hipertrofia',
            frequencia: '5x/semana',
            exercicios: [...]
        };
        
        const resultado = await salvarTreino(user.uid, treinoData);
        if (resultado.success) {
            alert('Treino salvo com sucesso!');
        }
        
        // Carregar último treino ao abrir a página
        const ultimoTreino = await carregarUltimoTreino(user.uid);
        if (ultimoTreino.success) {
            console.log('Último treino:', ultimoTreino.data);
            // Preencher formulário com dados salvos
        }
    });
</script>
*/
