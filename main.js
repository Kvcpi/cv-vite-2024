import './style.css'
import cvData from './cv2024.json'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="cv-container">
    <header class="scroll-animation">
      <h1>${cvData.nom}</h1>
      <h2>${cvData.titre}</h2>
    </header>
    
    <section class="contact-info scroll-animation">
      <p>Email: ${cvData.contact.email}</p>
      <p>Téléphone: ${cvData.contact.telephone}</p>
      <p>Adresse: ${cvData.contact.adresse}</p>
      <p>Âge: ${cvData.contact.age} ans</p>
      <p>Permis: ${cvData.permis.type} ${cvData.permis.vehiculePersonnel ? '(véhicule personnel)' : ''}</p>
      <p>Mobilité: ${cvData.mobilite ? 'Oui' : 'Non'}</p>
    </section>
    
    <section class="experiences">
      <h3 class="scroll-animation">Expériences professionnelles</h3>
      <div class="card-container">
        ${cvData.experiencesProfessionnelles.map(exp => `
          <div class="card scroll-animation" tabindex="0">
            <h4>${exp.poste}</h4>
            <p>${exp.entreprise}</p>
            <p>${exp.periode || exp.annee}</p>
          </div>
        `).join('')}
      </div>
    </section>
    
    <section class="formations">
      <h3 class="scroll-animation">Formations</h3>
      <div class="card-container">
        ${cvData.formations.map(formation => `
          <div class="card scroll-animation" tabindex="0">
            <h4>${formation.diplome}</h4>
            <p>${formation.etablissement}, ${formation.lieu}</p>
            <p>${formation.periode}</p>
          </div>
        `).join('')}
      </div>
    </section>
    
    <section class="competences">
      <h3 class="scroll-animation">Compétences</h3>
      <ul>
        ${cvData.competences.map(comp => `<li class="scroll-animation" tabindex="0">${comp}</li>`).join('')}
      </ul>
    </section>
    
    <section class="langues">
      <h3 class="scroll-animation">Langues</h3>
      <ul>
        ${cvData.langues.map(langue => `
          <li class="scroll-animation" tabindex="0">${langue.langue} - ${langue.niveau}</li>
        `).join('')}
      </ul>
    </section>
    
    <section class="interets">
      <h3 class="scroll-animation">Centres d'intérêt</h3>
      <ul>
        ${cvData.centresInteret.map(interet => `<li class="scroll-animation" tabindex="0">${interet}</li>`).join('')}
      </ul>
    </section>
  </div>
  <button class="dark-mode-toggle" aria-label="Activer/désactiver le mode sombre">🌓</button>
  <button class="scroll-to-top" aria-label="Retour en haut de la page">↑</button>
`

// Fonctionnalité de mode sombre
const darkModeToggle = document.querySelector('.dark-mode-toggle')
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode')
})

// Animation au défilement
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

document.querySelectorAll('.scroll-animation').forEach(el => {
  observer.observe(el)
})

// Interaction au clavier pour les éléments focusables
document.querySelectorAll('.card, .competences li, .langues li, .interets li').forEach(el => {
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      el.click()
    }
  })
})

// Fonctionnalité de Scroll to Top
const scrollToTopButton = document.querySelector('.scroll-to-top')

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) { // Afficher le bouton après avoir défilé de 300px
    scrollToTopButton.classList.add('visible')
  } else {
    scrollToTopButton.classList.remove('visible')
  }
})

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

// Accessibilité : permettre l'utilisation du bouton avec le clavier
scrollToTopButton.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
})