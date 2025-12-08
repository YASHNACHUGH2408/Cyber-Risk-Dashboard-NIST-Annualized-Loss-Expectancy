document.addEventListener('DOMContentLoaded', function() {
    // Create particles
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration between 10s and 20s
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Demo sliders functionality
    const assetValueSlider = document.getElementById('asset-value');
    const exposureFactorSlider = document.getElementById('exposure-factor');
    const attackFrequencySlider = document.getElementById('attack-frequency');
    
    const assetValueDisplay = document.getElementById('asset-value-display');
    const exposureFactorDisplay = document.getElementById('exposure-factor-display');
    const attackFrequencyDisplay = document.getElementById('attack-frequency-display');
    
    const sleValue = document.getElementById('sle-value');
    const aleValue = document.getElementById('ale-value');
    const riskLevel = document.getElementById('risk-level');
    
    function formatIndianCurrency(value) {
        // Convert to Indian numbering system (lakhs, crores)
        value = Math.round(value);
        let result = value.toString();
        let lastThree = result.substring(result.length - 3);
        let otherNumbers = result.substring(0, result.length - 3);
        
        if (otherNumbers !== '') {
            lastThree = ',' + lastThree;
        }
        
        // Add commas every two digits for the remaining part
        let formattedOtherNumbers = '';
        for (let i = otherNumbers.length - 1, count = 0; i >= 0; i--, count++) {
            if (count === 2) {
                formattedOtherNumbers = ',' + formattedOtherNumbers;
                count = 0;
            }
            formattedOtherNumbers = otherNumbers.charAt(i) + formattedOtherNumbers;
        }
        
        result = formattedOtherNumbers + lastThree;
        return '$' + result;
    }
    
    function calculateRisk() {
        const assetValue = parseInt(assetValueSlider.value);
        const exposureFactor = parseInt(exposureFactorSlider.value);
        const attackFrequency = parseFloat(attackFrequencySlider.value);
        
        // Update displays
        assetValueDisplay.textContent = formatIndianCurrency(assetValue);
        exposureFactorDisplay.textContent = exposureFactor + '%';
        attackFrequencyDisplay.textContent = attackFrequency.toFixed(1);
        
        // Calculate SLE and ALE
        const sle = assetValue * (exposureFactor / 100);
        const ale = sle * attackFrequency;
        
        // Update results
        sleValue.textContent = formatIndianCurrency(sle);
        aleValue.textContent = formatIndianCurrency(ale);
        
        // Determine risk level
        let riskLevelText = '';
        let riskLevelColor = '';
        
        if (ale < 10000) {
            riskLevelText = 'Low';
            riskLevelColor = 'var(--success)';
        } else if (ale < 50000) {
            riskLevelText = 'Medium';
            riskLevelColor = 'var(--warning)';
        } else if (ale < 100000) {
            riskLevelText = 'High';
            riskLevelColor = '#ff6b6b';
        } else {
            riskLevelText = 'Critical';
            riskLevelColor = 'var(--danger)';
        }
        
        riskLevel.textContent = riskLevelText;
        riskLevel.style.color = riskLevelColor;
    }
    
    // Add event listeners to sliders
    assetValueSlider.addEventListener('input', calculateRisk);
    exposureFactorSlider.addEventListener('input', calculateRisk);
    attackFrequencySlider.addEventListener('input', calculateRisk);
    
    // Initial calculation
    calculateRisk();
    
    // Dashboard tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Generate sample data for the dashboard
    const assetData = [
        { name: 'Customer Database', type: 'Database', value: 500000, exposure: 40, aro: 2.5 },
        { name: 'Web Server', type: 'Server', value: 75000, exposure: 75, aro: 5.0 },
        { name: 'Email System', type: 'Application', value: 120000, exposure: 30, aro: 3.0 },
        { name: 'Financial Records', type: 'Database', value: 850000, exposure: 90, aro: 1.2 },
        { name: 'Employee Laptops', type: 'Hardware', value: 45000, exposure: 60, aro: 8.0 },
        { name: 'Backup Storage', type: 'Storage', value: 320000, exposure: 25, aro: 0.5 },
        { name: 'CRM System', type: 'Application', value: 180000, exposure: 50, aro: 2.0 },
        { name: 'Network Infrastructure', type: 'Network', value: 220000, exposure: 80, aro: 1.5 }
    ];
    
    // Calculate risk metrics
    assetData.forEach(asset => {
        asset.sle = asset.value * (asset.exposure / 100);
        asset.ale = asset.sle * asset.aro;
        
        if (asset.ale < 10000) {
            asset.riskLevel = 'Low';
            asset.riskClass = 'low';
        } else if (asset.ale < 50000) {
            asset.riskLevel = 'Medium';
            asset.riskClass = 'medium';
        } else if (asset.ale < 100000) {
            asset.riskLevel = 'High';
            asset.riskClass = 'high';
        } else {
            asset.riskLevel = 'Critical';
            asset.riskClass = 'critical';
        }
    });
    
    // Populate asset table
    const tableBody = document.getElementById('assetTableBody');
    assetData.forEach(asset => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${asset.name}</td>
            <td>${asset.type}</td>
            <td>${formatIndianCurrency(asset.value)}</td>
            <td>${asset.exposure}%</td>
            <td>${asset.aro}</td>
            <td>${formatIndianCurrency(asset.sle)}</td>
            <td>${formatIndianCurrency(asset.ale)}</td>
            <td><span class="risk-badge ${asset.riskClass}">${asset.riskLevel}</span></td>
        `;
        tableBody.appendChild(row);
    });
    
    // Create charts (using Chart.js)
    // Risk Distribution Chart
    const riskCtx = document.getElementById('riskDistributionChart').getContext('2d');
    new Chart(riskCtx, {
        type: 'doughnut',
        data: {
            labels: ['Low', 'Medium', 'High', 'Critical'],
            datasets: [{
                data: [2, 3, 2, 1],
                backgroundColor: [
                    'rgba(46, 213, 115, 0.7)',
                    'rgba(255, 165, 2, 0.7)',
                    'rgba(255, 107, 107, 0.7)',
                    'rgba(255, 71, 87, 0.7)'
                ],
                borderColor: [
                    'rgba(46, 213, 115, 1)',
                    'rgba(255, 165, 2, 1)',
                    'rgba(255, 107, 107, 1)',
                    'rgba(255, 71, 87, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#e0e6ed'
                    }
                }
            }
        }
    });
    
    // Risk Trends Chart
    const trendsCtx = document.getElementById('riskTrendsChart').getContext('2d');
    new Chart(trendsCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Average Risk Score',
                data: [5.2, 5.5, 5.8, 6.0, 6.1, 6.2],
                borderColor: 'rgba(0, 255, 136, 1)',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e6ed'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e6ed'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e0e6ed'
                    }
                }
            }
        }
    });
    
    // High Risk Assets Chart
    const highRiskCtx = document.getElementById('highRiskChart').getContext('2d');
    const highRiskAssets = assetData
        .sort((a, b) => b.ale - a.ale)
        .slice(0, 5);
    
    new Chart(highRiskCtx, {
        type: 'bar',
        data: {
            labels: highRiskAssets.map(a => a.name),
            datasets: [{
                label: 'Annual Loss Expectancy ($)',
                data: highRiskAssets.map(a => Math.round(a.ale)),
                backgroundColor: 'rgba(0, 255, 136, 0.7)',
                borderColor: 'rgba(0, 255, 136, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e6ed',
                        callback: function(value) {
                            return formatIndianCurrency(value);
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e6ed'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e0e6ed'
                    }
                }
            }
        }
    });
});