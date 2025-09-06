import axios from 'axios';

// Script de test pour la suppression d'utilisateur

const testDeleteUser = async () => {
  try {
    console.log('🧪 Test de suppression d\'utilisateur...');
    
    // 1. Se connecter en tant qu'admin
    const loginResponse = await axios.post('http://localhost:5000/api/login', {
      email: 'admin@maclinique.com', // Remplacez par un email admin existant
      password: 'admin123' // Remplacez par le mot de passe admin
    });

    const token = loginResponse.data.token;
    console.log('✅ Connexion admin réussie');

    // 2. Récupérer la liste des utilisateurs
    const usersResponse = await axios.get('http://localhost:5000/api/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    console.log(`📋 ${usersResponse.data.length} utilisateurs trouvés`);
    
    // 3. Tenter de supprimer un utilisateur (trouvez un utilisateur non-admin à supprimer)
    const nonAdminUser = usersResponse.data.find(user => user.role !== 'admin');
    
    if (nonAdminUser) {
      console.log(`🎯 Tentative de suppression de: ${nonAdminUser.firstName} ${nonAdminUser.lastName}`);
      
      const deleteResponse = await axios.delete(`http://localhost:5000/api/users/${nonAdminUser._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('✅ Suppression réussie:', deleteResponse.data);
    } else {
      console.log('⚠️ Aucun utilisateur non-admin trouvé pour le test');
    }

  } catch (error) {
    console.error('❌ Erreur durant le test:', error.response?.data || error.message);
  }
};

// Tester sans authentification (doit échouer)
const testDeleteWithoutAuth = async () => {
  try {
    console.log('🧪 Test de suppression sans authentification...');
    
    const response = await axios.delete('http://localhost:5000/api/users/123456789012345678901234');
    console.log('⚠️ Suppression réussie sans auth (problème de sécurité!)');
  } catch (error) {
    console.log('✅ Suppression bloquée sans authentification:', error.response?.data?.message);
  }
};

// Exécuter les tests
// testDeleteWithoutAuth();
// testDeleteUser();

console.log('📝 Script de test créé. Décommentez les lignes à la fin pour exécuter les tests.');
console.log('⚠️ Assurez-vous d\'avoir un compte admin avec les bonnes informations de connexion.');