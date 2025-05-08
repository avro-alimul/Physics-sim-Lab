// Simulation data
const simulations = [
    {
        id: 'projectile-motion',
        title: 'Projectile Motion',
        category: 'motion',
        description: 'Explore the path of a projectile under gravity with adjustable parameters.',
        image: 'images/projectile-motion.jpg'
    },
    {
        id: 'wave-interference',
        title: 'Wave Interference',
        category: 'waves',
        description: 'Visualize constructive and destructive interference of waves.',
        image: 'images/wave-interference.jpg'
    },
    {
        id: 'circuit-builder',
        title: 'Circuit Builder',
        category: 'electricity',
        description: 'Build and analyze simple electrical circuits with various components.',
        image: 'images/circuit-builder.jpg'
    },
    {
        id: 'lens-simulator',
        title: 'Lens Simulator',
        category: 'optics',
        description: 'Understand image formation through different types of lenses.',
        image: 'images/lens-simulator.jpg'
    }
];

// Physics concepts data
const concepts = [
    {
        title: "Newton's Laws",
        description: "The fundamental principles that describe the relationship between forces and motion.",
        icon: "fas fa-rocket"
    },
    {
        title: "Wave Properties",
        description: "Understanding amplitude, frequency, wavelength, and their relationships.",
        icon: "fas fa-wave-square"
    },
    {
        title: "Electric Circuits",
        description: "The flow of electric current and the behavior of circuit components.",
        icon: "fas fa-bolt"
    },
    {
        title: "Optical Phenomena",
        description: "Light behavior including reflection, refraction, and image formation.",
        icon: "fas fa-lightbulb"
    }
];

// Initialize simulations and concepts
document.addEventListener('DOMContentLoaded', function() {
    // Populate simulations grid
    const simulationGrid = document.querySelector('.simulation-grid');
    if (simulationGrid) {
        simulations.forEach(sim => {
            const card = createSimulationCard(sim);
            simulationGrid.appendChild(card);
        });
    }

    // Populate concepts grid
    const conceptGrid = document.querySelector('.concept-grid');
    if (conceptGrid) {
        concepts.forEach(concept => {
            const card = createConceptCard(concept);
            conceptGrid.appendChild(card);
        });
    }

    // Initialize filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            filterSimulations(filter);
        });
    });

    // Simulation Card Animations
    const simulationCards = document.querySelectorAll('.simulation-card');
    
    simulationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
});

// Create simulation card
function createSimulationCard(simulation) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    
    col.innerHTML = `
        <div class="glass-card simulation-card" data-category="${simulation.category}">
            <img src="${simulation.image}" alt="${simulation.title}" class="img-fluid mb-3">
            <h3>${simulation.title}</h3>
            <p>${simulation.description}</p>
            <a href="simulations/${simulation.id}.html" class="btn btn-primary glow-button">Try Now</a>
        </div>
    `;
    
    return col;
}

// Create concept card
function createConceptCard(concept) {
    const col = document.createElement('div');
    col.className = 'col-md-3 mb-4';
    
    col.innerHTML = `
        <div class="glass-card concept-card">
            <i class="${concept.icon} fa-3x mb-3"></i>
            <h3>${concept.title}</h3>
            <p>${concept.description}</p>
            <button class="btn btn-primary glow-button learn-more">Learn More</button>
        </div>
    `;
    
    return col;
}

// Filter simulations
function filterSimulations(filter) {
    const cards = document.querySelectorAll('.simulation-card');
    cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.parentElement.style.display = 'block';
        } else {
            card.parentElement.style.display = 'none';
        }
    });
}

// Projectile Motion Simulation
class ProjectileMotion {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.velocity = 50;
        this.angle = 45;
        this.gravity = 9.8;
        this.time = 0;
        this.isRunning = false;
        
        this.initialize();
    }
    
    initialize() {
        // Set up canvas
        this.canvas.width = 800;
        this.canvas.height = 400;
        
        // Add controls
        this.addControls();
        
        // Start animation
        this.animate();
    }
    
    addControls() {
        // Add velocity slider
        const velocitySlider = document.createElement('input');
        velocitySlider.type = 'range';
        velocitySlider.min = '0';
        velocitySlider.max = '100';
        velocitySlider.value = this.velocity;
        velocitySlider.addEventListener('input', (e) => {
            this.velocity = e.target.value;
        });
        
        // Add angle slider
        const angleSlider = document.createElement('input');
        angleSlider.type = 'range';
        angleSlider.min = '0';
        angleSlider.max = '90';
        angleSlider.value = this.angle;
        angleSlider.addEventListener('input', (e) => {
            this.angle = e.target.value;
        });
        
        // Add controls to the page
        const controls = document.createElement('div');
        controls.className = 'simulation-controls';
        controls.appendChild(velocitySlider);
        controls.appendChild(angleSlider);
        this.canvas.parentElement.appendChild(controls);
    }
    
    animate() {
        if (this.isRunning) {
            this.update();
        }
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    update() {
        this.time += 0.1;
        
        // Calculate position
        const x = this.velocity * Math.cos(this.angle * Math.PI / 180) * this.time;
        const y = this.canvas.height - (this.velocity * Math.sin(this.angle * Math.PI / 180) * this.time - 0.5 * this.gravity * this.time * this.time);
        
        // Check if projectile has hit the ground
        if (y > this.canvas.height) {
            this.isRunning = false;
            this.time = 0;
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw ground
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height);
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.stroke();
        
        // Draw projectile
        const x = this.velocity * Math.cos(this.angle * Math.PI / 180) * this.time;
        const y = this.canvas.height - (this.velocity * Math.sin(this.angle * Math.PI / 180) * this.time - 0.5 * this.gravity * this.time * this.time);
        
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
    }
    
    start() {
        this.isRunning = true;
        this.time = 0;
    }
    
    stop() {
        this.isRunning = false;
    }
    
    reset() {
        this.isRunning = false;
        this.time = 0;
        this.draw();
    }
}

// Wave Interference Simulation
class WaveInterference {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.time = 0;
        this.isRunning = false;
        
        // Wave 1 parameters
        this.amplitude1 = 50;
        this.frequency1 = 2;
        this.phase1 = 0;
        
        // Wave 2 parameters
        this.amplitude2 = 50;
        this.frequency2 = 2;
        this.phase2 = 180;
        
        this.initialize();
    }
    
    initialize() {
        // Set up canvas
        this.canvas.width = 800;
        this.canvas.height = 400;
        
        // Add controls
        this.addControls();
        
        // Start animation
        this.animate();
    }
    
    addControls() {
        // Wave 1 controls
        const amplitude1Slider = document.getElementById('amplitude1-slider');
        const frequency1Slider = document.getElementById('frequency1-slider');
        const phase1Slider = document.getElementById('phase1-slider');
        
        amplitude1Slider.addEventListener('input', (e) => {
            this.amplitude1 = parseInt(e.target.value);
            document.getElementById('amplitude1-value').textContent = this.amplitude1;
        });
        
        frequency1Slider.addEventListener('input', (e) => {
            this.frequency1 = parseInt(e.target.value);
            document.getElementById('frequency1-value').textContent = this.frequency1;
        });
        
        phase1Slider.addEventListener('input', (e) => {
            this.phase1 = parseInt(e.target.value);
            document.getElementById('phase1-value').textContent = this.phase1;
        });
        
        // Wave 2 controls
        const amplitude2Slider = document.getElementById('amplitude2-slider');
        const frequency2Slider = document.getElementById('frequency2-slider');
        const phase2Slider = document.getElementById('phase2-slider');
        
        amplitude2Slider.addEventListener('input', (e) => {
            this.amplitude2 = parseInt(e.target.value);
            document.getElementById('amplitude2-value').textContent = this.amplitude2;
        });
        
        frequency2Slider.addEventListener('input', (e) => {
            this.frequency2 = parseInt(e.target.value);
            document.getElementById('frequency2-value').textContent = this.frequency2;
        });
        
        phase2Slider.addEventListener('input', (e) => {
            this.phase2 = parseInt(e.target.value);
            document.getElementById('phase2-value').textContent = this.phase2;
        });
    }
    
    animate() {
        if (this.isRunning) {
            this.time += 0.05;
        }
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw axes
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height / 2);
        this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.ctx.strokeStyle = '#666';
        this.ctx.stroke();
        
        // Draw wave 1
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#4a90e2';
        this.drawWave(this.amplitude1, this.frequency1, this.phase1);
        this.ctx.stroke();
        
        // Draw wave 2
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#6c5ce7';
        this.drawWave(this.amplitude2, this.frequency2, this.phase2);
        this.ctx.stroke();
        
        // Draw resultant wave
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#00ff88';
        this.drawResultantWave();
        this.ctx.stroke();
    }
    
    drawWave(amplitude, frequency, phase) {
        const centerY = this.canvas.height / 2;
        const scale = this.canvas.width / (2 * Math.PI);
        
        for (let x = 0; x < this.canvas.width; x++) {
            const t = x / scale;
            const y = centerY + amplitude * Math.sin(2 * Math.PI * frequency * t + phase * Math.PI / 180);
            
            if (x === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
    }
    
    drawResultantWave() {
        const centerY = this.canvas.height / 2;
        const scale = this.canvas.width / (2 * Math.PI);
        
        for (let x = 0; x < this.canvas.width; x++) {
            const t = x / scale;
            const y1 = this.amplitude1 * Math.sin(2 * Math.PI * this.frequency1 * t + this.phase1 * Math.PI / 180);
            const y2 = this.amplitude2 * Math.sin(2 * Math.PI * this.frequency2 * t + this.phase2 * Math.PI / 180);
            const y = centerY + y1 + y2;
            
            if (x === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
    }
    
    start() {
        this.isRunning = true;
    }
    
    stop() {
        this.isRunning = false;
    }
    
    reset() {
        this.isRunning = false;
        this.time = 0;
        this.draw();
    }
}

// Circuit Builder Simulation
class CircuitBuilder {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.components = [];
        this.selectedComponent = null;
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        
        this.initialize();
    }
    
    initialize() {
        // Set up canvas
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        // Add event listeners
        this.addEventListeners();
        
        // Start animation
        this.animate();
    }
    
    addEventListeners() {
        // Component palette selection
        document.querySelectorAll('.component-item').forEach(item => {
            item.addEventListener('click', () => {
                this.selectedComponent = item.getAttribute('data-component');
            });
        });
        
        // Canvas interaction
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
        
        // Control buttons
        document.getElementById('clear-btn').addEventListener('click', () => this.clearCircuit());
        document.getElementById('analyze-btn').addEventListener('click', () => this.analyzeCircuit());
    }
    
    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (this.selectedComponent) {
            this.isDragging = true;
            this.dragStart = { x, y };
            
            // Add new component
            this.components.push({
                type: this.selectedComponent,
                x: x,
                y: y,
                width: 40,
                height: 40,
                value: this.getDefaultValue(this.selectedComponent)
            });
        }
    }
    
    handleMouseMove(e) {
        if (this.isDragging) {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Update component position
            const lastComponent = this.components[this.components.length - 1];
            lastComponent.x = x;
            lastComponent.y = y;
        }
    }
    
    handleMouseUp() {
        this.isDragging = false;
    }
    
    getDefaultValue(type) {
        switch (type) {
            case 'battery': return 9; // 9V
            case 'resistor': return 100; // 100Ω
            case 'capacitor': return 0.001; // 1mF
            case 'inductor': return 0.1; // 0.1H
            default: return 0;
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw components
        this.components.forEach(component => {
            this.drawComponent(component);
        });
    }
    
    drawComponent(component) {
        this.ctx.save();
        this.ctx.translate(component.x, component.y);
        
        switch (component.type) {
            case 'battery':
                this.drawBattery();
                break;
            case 'resistor':
                this.drawResistor();
                break;
            case 'capacitor':
                this.drawCapacitor();
                break;
            case 'inductor':
                this.drawInductor();
                break;
            case 'wire':
                this.drawWire();
                break;
        }
        
        this.ctx.restore();
    }
    
    drawBattery() {
        this.ctx.beginPath();
        this.ctx.rect(-20, -20, 40, 40);
        this.ctx.strokeStyle = '#4a90e2';
        this.ctx.stroke();
        
        // Draw battery symbol
        this.ctx.beginPath();
        this.ctx.moveTo(-10, -10);
        this.ctx.lineTo(-10, 10);
        this.ctx.moveTo(0, -10);
        this.ctx.lineTo(0, 10);
        this.ctx.moveTo(10, -10);
        this.ctx.lineTo(10, 10);
        this.ctx.stroke();
    }
    
    drawResistor() {
        this.ctx.beginPath();
        this.ctx.rect(-20, -20, 40, 40);
        this.ctx.strokeStyle = '#6c5ce7';
        this.ctx.stroke();
        
        // Draw resistor symbol
        this.ctx.beginPath();
        this.ctx.moveTo(-10, 0);
        this.ctx.lineTo(10, 0);
        this.ctx.stroke();
    }
    
    drawCapacitor() {
        this.ctx.beginPath();
        this.ctx.rect(-20, -20, 40, 40);
        this.ctx.strokeStyle = '#00ff88';
        this.ctx.stroke();
        
        // Draw capacitor symbol
        this.ctx.beginPath();
        this.ctx.moveTo(-10, -10);
        this.ctx.lineTo(-10, 10);
        this.ctx.moveTo(10, -10);
        this.ctx.lineTo(10, 10);
        this.ctx.stroke();
    }
    
    drawInductor() {
        this.ctx.beginPath();
        this.ctx.rect(-20, -20, 40, 40);
        this.ctx.strokeStyle = '#ff6b6b';
        this.ctx.stroke();
        
        // Draw inductor symbol
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    
    drawWire() {
        this.ctx.beginPath();
        this.ctx.moveTo(-20, 0);
        this.ctx.lineTo(20, 0);
        this.ctx.strokeStyle = '#666';
        this.ctx.stroke();
    }
    
    clearCircuit() {
        this.components = [];
        this.updateCircuitInfo();
    }
    
    analyzeCircuit() {
        // Calculate total resistance
        let totalResistance = 0;
        let totalVoltage = 0;
        
        this.components.forEach(component => {
            if (component.type === 'resistor') {
                totalResistance += component.value;
            } else if (component.type === 'battery') {
                totalVoltage += component.value;
            }
        });
        
        // Calculate current using Ohm's Law
        const totalCurrent = totalVoltage / totalResistance;
        
        // Update circuit information
        document.getElementById('total-voltage').textContent = totalVoltage.toFixed(2);
        document.getElementById('total-current').textContent = totalCurrent.toFixed(2);
        document.getElementById('total-resistance').textContent = totalResistance.toFixed(2);
    }
    
    updateCircuitInfo() {
        document.getElementById('total-voltage').textContent = '0';
        document.getElementById('total-current').textContent = '0';
        document.getElementById('total-resistance').textContent = '0';
    }
}

// Lens Simulator
class LensSimulator {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.lensType = 'convex';
        this.objectDistance = 50;
        this.objectHeight = 10;
        this.focalLength = 20;
        
        this.initialize();
    }
    
    initialize() {
        // Set up canvas
        this.canvas.width = 800;
        this.canvas.height = 400;
        
        // Add controls
        this.addControls();
        
        // Start animation
        this.animate();
    }
    
    addControls() {
        // Lens type selector
        document.querySelectorAll('.lens-type-selector button').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.lens-type-selector button').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                this.lensType = button.getAttribute('data-type');
                this.updateImageInfo();
            });
        });
        
        // Object distance slider
        const objectDistanceSlider = document.getElementById('object-distance-slider');
        objectDistanceSlider.addEventListener('input', (e) => {
            this.objectDistance = parseInt(e.target.value);
            document.getElementById('object-distance-value').textContent = this.objectDistance;
            this.updateImageInfo();
        });
        
        // Object height slider
        const objectHeightSlider = document.getElementById('object-height-slider');
        objectHeightSlider.addEventListener('input', (e) => {
            this.objectHeight = parseInt(e.target.value);
            document.getElementById('object-height-value').textContent = this.objectHeight;
            this.updateImageInfo();
        });
        
        // Focal length slider
        const focalLengthSlider = document.getElementById('focal-length-slider');
        focalLengthSlider.addEventListener('input', (e) => {
            this.focalLength = parseInt(e.target.value);
            document.getElementById('focal-length-value').textContent = this.focalLength;
            this.updateImageInfo();
        });
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw optical axis
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height / 2);
        this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.ctx.strokeStyle = '#666';
        this.ctx.stroke();
        
        // Draw lens
        this.drawLens();
        
        // Draw object
        this.drawObject();
        
        // Draw image
        this.drawImage();
        
        // Draw rays
        this.drawRays();
    }
    
    drawLens() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Draw lens
        this.ctx.beginPath();
        if (this.lensType === 'convex') {
            this.ctx.moveTo(centerX, centerY - 100);
            this.ctx.lineTo(centerX + 10, centerY);
            this.ctx.lineTo(centerX, centerY + 100);
            this.ctx.lineTo(centerX - 10, centerY);
        } else {
            this.ctx.moveTo(centerX, centerY - 100);
            this.ctx.lineTo(centerX - 10, centerY);
            this.ctx.lineTo(centerX, centerY + 100);
            this.ctx.lineTo(centerX + 10, centerY);
        }
        this.ctx.closePath();
        this.ctx.strokeStyle = '#4a90e2';
        this.ctx.stroke();
        
        // Draw focal points
        const focalPoint1 = centerX + (this.lensType === 'convex' ? this.focalLength : -this.focalLength);
        const focalPoint2 = centerX + (this.lensType === 'convex' ? -this.focalLength : this.focalLength);
        
        this.ctx.beginPath();
        this.ctx.arc(focalPoint1, centerY, 5, 0, Math.PI * 2);
        this.ctx.arc(focalPoint2, centerY, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = '#6c5ce7';
        this.ctx.fill();
    }
    
    drawObject() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const objectX = centerX - this.objectDistance;
        
        // Draw object
        this.ctx.beginPath();
        this.ctx.moveTo(objectX, centerY);
        this.ctx.lineTo(objectX, centerY - this.objectHeight);
        this.ctx.strokeStyle = '#00ff88';
        this.ctx.stroke();
        
        // Draw object arrow
        this.ctx.beginPath();
        this.ctx.moveTo(objectX - 10, centerY - this.objectHeight);
        this.ctx.lineTo(objectX, centerY - this.objectHeight);
        this.ctx.lineTo(objectX - 5, centerY - this.objectHeight - 5);
        this.ctx.stroke();
    }
    
    drawImage() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Calculate image distance and height
        const imageDistance = this.calculateImageDistance();
        const imageHeight = this.calculateImageHeight();
        const imageX = centerX + imageDistance;
        
        // Draw image
        this.ctx.beginPath();
        this.ctx.moveTo(imageX, centerY);
        this.ctx.lineTo(imageX, centerY - imageHeight);
        this.ctx.strokeStyle = '#ff6b6b';
        this.ctx.stroke();
        
        // Draw image arrow
        this.ctx.beginPath();
        this.ctx.moveTo(imageX + 10, centerY - imageHeight);
        this.ctx.lineTo(imageX, centerY - imageHeight);
        this.ctx.lineTo(imageX + 5, centerY - imageHeight - 5);
        this.ctx.stroke();
    }
    
    drawRays() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const objectX = centerX - this.objectDistance;
        const objectY = centerY - this.objectHeight;
        
        // Calculate image position
        const imageDistance = this.calculateImageDistance();
        const imageHeight = this.calculateImageHeight();
        const imageX = centerX + imageDistance;
        const imageY = centerY - imageHeight;
        
        // Draw parallel ray
        this.ctx.beginPath();
        this.ctx.moveTo(objectX, objectY);
        this.ctx.lineTo(centerX, objectY);
        this.ctx.lineTo(imageX, imageY);
        this.ctx.strokeStyle = 'rgba(74, 144, 226, 0.5)';
        this.ctx.stroke();
        
        // Draw focal ray
        this.ctx.beginPath();
        this.ctx.moveTo(objectX, objectY);
        this.ctx.lineTo(centerX, centerY - this.objectHeight * 0.5);
        this.ctx.lineTo(imageX, imageY);
        this.ctx.strokeStyle = 'rgba(108, 92, 231, 0.5)';
        this.ctx.stroke();
        
        // Draw center ray
        this.ctx.beginPath();
        this.ctx.moveTo(objectX, objectY);
        this.ctx.lineTo(centerX, centerY);
        this.ctx.lineTo(imageX, imageY);
        this.ctx.strokeStyle = 'rgba(0, 255, 136, 0.5)';
        this.ctx.stroke();
    }
    
    calculateImageDistance() {
        // Lens equation: 1/f = 1/do + 1/di
        const f = this.lensType === 'convex' ? this.focalLength : -this.focalLength;
        const do_ = this.objectDistance;
        const di = 1 / (1/f - 1/do_);
        return di;
    }
    
    calculateImageHeight() {
        const di = this.calculateImageDistance();
        const do_ = this.objectDistance;
        const M = -di/do_; // Magnification
        return this.objectHeight * M;
    }
    
    updateImageInfo() {
        const di = this.calculateImageDistance();
        const hi = this.calculateImageHeight();
        const M = -di/this.objectDistance;
        
        document.getElementById('image-distance').textContent = Math.abs(di).toFixed(2);
        document.getElementById('image-height').textContent = Math.abs(hi).toFixed(2);
        document.getElementById('magnification').textContent = Math.abs(M).toFixed(2);
        
        let imageType = '';
        if (this.lensType === 'convex') {
            if (this.objectDistance > this.focalLength) {
                imageType = 'Real, Inverted';
            } else {
                imageType = 'Virtual, Upright';
            }
        } else {
            imageType = 'Virtual, Upright';
        }
        document.getElementById('image-type').textContent = imageType;
    }
}

// Simulation Loading States
function showLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;
    return originalText;
}

function hideLoadingState(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;
}

// Simulation Launch Handlers
document.querySelectorAll('.simulation-card .btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        const originalText = showLoadingState(this);
        
        // Simulate loading delay (remove in production)
        setTimeout(() => {
            hideLoadingState(this, originalText);
        }, 1000);
    });
});

// Simulation Preview Images
const simulationPreviews = {
    'projectile-motion': 'images/simulations/projectile-preview.png',
    'wave-interference': 'images/simulations/wave-preview.png',
    'circuit-builder': 'images/simulations/circuit-preview.png',
    'lens-simulator': 'images/simulations/lens-preview.png',
    'simple-harmonic-motion': 'images/simulations/shm-preview.png',
    'double-pendulum': 'images/simulations/pendulum-preview.png'
};

// Load simulation previews
function loadSimulationPreviews() {
    Object.entries(simulationPreviews).forEach(([simulation, imagePath]) => {
        const card = document.querySelector(`[href*="${simulation}"]`).closest('.glass-card');
        if (card) {
            const preview = document.createElement('div');
            preview.className = 'simulation-preview';
            preview.style.backgroundImage = `url(${imagePath})`;
            card.insertBefore(preview, card.firstChild);
        }
    });
}

// Initialize simulation features
document.addEventListener('DOMContentLoaded', function() {
    loadSimulationPreviews();
});

// Initialize simulations when their respective pages are loaded
if (document.querySelector('#projectile-motion-canvas')) {
    const canvas = document.querySelector('#projectile-motion-canvas');
    const simulation = new ProjectileMotion(canvas);
    
    // Add control buttons
    const controls = document.createElement('div');
    controls.className = 'simulation-buttons';
    
    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start';
    startBtn.addEventListener('click', () => simulation.start());
    
    const stopBtn = document.createElement('button');
    stopBtn.textContent = 'Stop';
    stopBtn.addEventListener('click', () => simulation.stop());
    
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset';
    resetBtn.addEventListener('click', () => simulation.reset());
    
    controls.appendChild(startBtn);
    controls.appendChild(stopBtn);
    controls.appendChild(resetBtn);
    
    canvas.parentElement.appendChild(controls);
}

if (document.querySelector('#wave-interference-canvas')) {
    const canvas = document.querySelector('#wave-interference-canvas');
    const simulation = new WaveInterference(canvas);
    
    // Add control buttons
    document.getElementById('start-btn').addEventListener('click', () => simulation.start());
    document.getElementById('stop-btn').addEventListener('click', () => simulation.stop());
    document.getElementById('reset-btn').addEventListener('click', () => simulation.reset());
}

if (document.querySelector('#circuit-canvas')) {
    const canvas = document.querySelector('#circuit-canvas');
    const simulation = new CircuitBuilder(canvas);
}

if (document.querySelector('#lens-canvas')) {
    const canvas = document.querySelector('#lens-canvas');
    const simulation = new LensSimulator(canvas);
} 