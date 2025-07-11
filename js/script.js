
    // Create cosmic background with Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('cosmic-canvas'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8
    });
    
    const starsVertices = [];
    for (let i = 0; i < 5000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Position camera
    camera.position.z = 5;
    
    // Animation function
    function animate() {
      requestAnimationFrame(animate);
      
      // Rotate stars slowly
      stars.rotation.x += 0.0001;
      stars.rotation.y += 0.0001;
      
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Create constellation effect
    const constellation = document.getElementById('constellation');
    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random properties
      const size = Math.random() * 3;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 3 + 2;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${posX}%`;
      star.style.top = `${posY}%`;
      star.style.animationDelay = `${delay}s`;
      star.style.animationDuration = `${duration}s`;
      
      constellation.appendChild(star);
    }
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
      const header = document.getElementById('header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.cosmic-nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      });
    });
    
    // Interactive card effects
    const cards = document.querySelectorAll('.project-card, .skill-card, .contact-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleY = (x - centerX) / 25;
        const angleX = (centerY - y) / 25;
        
        card.style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg) translateZ(20px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0) rotateX(0) translateZ(10px)';
      });
    });
    
    // Create project counter
    const projectCounter = document.getElementById('project-counter');
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((_, index) => {
      const counterItem = document.createElement('div');
      counterItem.classList.add('counter-item');
      counterItem.setAttribute('data-index', index);
      counterItem.addEventListener('click', () => {
        const targetCard = document.querySelectorAll('.project-card')[index];
        window.scrollTo({
          top: targetCard.offsetTop - 150,
          behavior: 'smooth'
        });
      });
      projectCounter.appendChild(counterItem);
    });
    
    // Set first counter item as active
    if (projectCounter.children.length > 0) {
      projectCounter.children[0].classList.add('active');
    }
    
    // Update active project counter on scroll
// Update active counter dot when a project card is in view
window.addEventListener('scroll', () => {
  const projectCards = document.querySelectorAll('.project-card');
  const counterItems = document.querySelectorAll('.counter-item');

  projectCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    // Check if the card is in view (use a larger portion of the screen to trigger)
    if (rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4) {
      // Remove 'active' class from all dots
      counterItems.forEach(item => item.classList.remove('active'));
      // Add 'active' class to the dot corresponding to the visible project card
      if (counterItems[index]) {
        counterItems[index].classList.add('active');
      }
    }
  });
});
