// Script de test de l'authentification - À exécuter dans la console du navigateur

console.log('🔍 Test de l\'authentification...');

// Vérifier les données stockées
const user = JSON.parse(localStorage.getItem("user") || "null");
const token = localStorage.getItem("token");

console.log('👤 Utilisateur:', user);
console.log('🔑 Token:', token ? 'Présent' : 'Absent');

if (user && token) {
  console.log('✅ Authentification OK');
  console.log('📋 Informations utilisateur:');
  console.log('   - ID:', user._id || user.id);
  console.log('   - Nom:', user.firstName, user.lastName);
  console.log('   - Email:', user.email);
  console.log('   - Rôle:', user.role);
  
  // Test de l'API avec le token
  console.log('\n🌐 Test de l\'API...');
  fetch('http://localhost:5000/api/appointments', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log('📡 Statut de la réponse:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('📦 Réponse de l\'API:', data);
    if (Array.isArray(data)) {
      console.log(`📅 Nombre de rendez-vous trouvés: ${data.length}`);
    }
  })
  .catch(error => {
    console.error('❌ Erreur API:', error);
  });
} else {
  console.log('❌ Authentification manquante');
  if (!user) console.log('   - Utilisateur non connecté');
  if (!token) console.log('   - Token manquant');
}