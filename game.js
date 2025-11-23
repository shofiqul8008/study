
        // Menu functionality
        const menuBtn = document.getElementById('menuBtn');
        const sidebar = document.getElementById('sidebar');
        const closeBtn = document.getElementById('closeBtn');
        const overlay = document.getElementById('overlay');
        const themeToggle = document.getElementById('themeToggle');
        
        // Password modal elements
        const passwordModal = document.getElementById('passwordModal');
        const passwordInput = document.getElementById('passwordInput');
        const passwordError = document.getElementById('passwordError');
        const modalSubtitle = document.getElementById('modalSubtitle');
        const cancelBtn = document.getElementById('cancelBtn');
        const submitBtn = document.getElementById('submitBtn');
        
        let currentQuestion = null;
        let currentPassword = null;
        let currentDownloadUrl = null;
        
        // Question download URLs
        const downloadUrls = {
            1: "https://drive.google.com/uc?export=download&id=1v4_xQfQA1_0uNo8dLKA5WFyjvWNTsDwc",
            2: "https://drive.google.com/uc?export=download&id=1ZuzAE3LOru9aDz0NcRaznVVcQGjiuBFg",
            3: "https://drive.google.com/uc?export=download&id=1jF4Gs-ykBPsU3waTH3i5do0Ytb22c60V",
            4: "https://drive.google.com/uc?export=download&id=1kWOvW4boflfUq-kCWmzc2sXSXBAr5Tq6",
            5: "https://drive.google.com/uc?export=download&id=1g4X5RiNoQwcooViNoPwDgRQjKd8Xiau7"
        };
        
        // VIEW URLS - ADD YOUR LINKS HERE
        // Replace the placeholder URLs with your actual website links
        const viewUrls = {
            1: "https://shofiqul8008.github.io/English-Grammar-test-1/", // Replace with your actual link for Question 1
            2: "https://example.com/question2", // Replace with your actual link for Question 2
            3: "https://example.com/question3", // Replace with your actual link for Question 3
            4: "https://shofiqul8008.github.io/English-verd-from/",  // Replace with your actual link for Question 4
            5: "https://shofiqul8008.github.io/English-grammar-advarb/"
        };
        
        // Open sidebar
        menuBtn.addEventListener('click', function() {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            menuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close sidebar
        function closeSidebar() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        closeBtn.addEventListener('click', closeSidebar);
        overlay.addEventListener('click', closeSidebar);
        
        // Theme toggle functionality
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        }
        
        // Password modal functionality
        document.querySelectorAll('.download-btn').forEach(button => {
            button.addEventListener('click', function() {
                currentQuestion = this.getAttribute('data-question');
                currentPassword = this.getAttribute('data-password');
                currentDownloadUrl = downloadUrls[currentQuestion];
                
                modalSubtitle.textContent = `To download Question ${currentQuestion}`;
                passwordInput.value = '';
                passwordError.classList.remove('show');
                passwordModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Focus on password input
                setTimeout(() => {
                    passwordInput.focus();
                }, 300);
            });
        });
        
        // View button functionality
        document.querySelectorAll('.view-btn').forEach(button => {
            button.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                const viewUrl = viewUrls[question];
                
                // Open the website in a new tab
                if (viewUrl && viewUrl !== "https://example.com/question" + question) {
                    window.open(viewUrl, '_blank');
                } else {
                    alert('Website link not configured for this question. Please contact the administrator.');
                }
            });
        });
        
        // Submit password
        submitBtn.addEventListener('click', function() {
            const enteredPassword = passwordInput.value.trim();
            
            if (enteredPassword === currentPassword) {
                // Correct password - proceed with download
                window.open(currentDownloadUrl, '_blank');
                closePasswordModal();
            } else {
                // Incorrect password - show error
                passwordError.classList.add('show');
                passwordInput.focus();
            }
        });
        
        // Cancel password entry
        cancelBtn.addEventListener('click', closePasswordModal);
        
        // Close modal when clicking outside
        passwordModal.addEventListener('click', function(e) {
            if (e.target === passwordModal) {
                closePasswordModal();
            }
        });
        
        // Submit password on Enter key
        passwordInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });
        
        function closePasswordModal() {
            passwordModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            passwordInput.value = '';
            passwordError.classList.remove('show');
        }
        
        // Enhanced search functionality
        function searchByNumber() {
            const searchInput = document.getElementById('searchInput');
            const searchTerm = searchInput.value.trim();
            const questions = document.querySelectorAll('.resource-card');
            const resultsCount = document.getElementById('resultsCount');
            const clearBtn = document.querySelector('.clear-search');
            
            let visibleCount = 0;
            let foundQuestion = null;
            
            // Reset all questions to visible first
            questions.forEach(question => {
                question.style.display = 'flex';
                question.classList.remove('highlight');
            });
            
            // If search term is empty, show all
            if (searchTerm === '') {
                resultsCount.textContent = 'Type to search questions';
                clearBtn.style.display = 'none';
                return;
            }
            
            // Search for the specific question number
            questions.forEach(question => {
                const questionNumber = question.getAttribute('data-number');
                
                if (questionNumber === searchTerm) {
                    foundQuestion = question;
                    visibleCount = 1;
                } else {
                    question.style.display = 'none';
                }
            });
            
            // Update results and highlight the found question
            if (foundQuestion) {
                resultsCount.textContent = `✓ Found Question ${searchTerm}`;
                foundQuestion.classList.add('highlight');
                clearBtn.style.display = 'block';
                
                // Scroll to the found question
                setTimeout(() => {
                    foundQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            } else {
                resultsCount.textContent = `✗ No question found with number "${searchTerm}"`;
                clearBtn.style.display = 'block';
            }
            
            // Show no results message if needed
            let noResultsMsg = document.getElementById('noResults');
            if (visibleCount === 0 && searchTerm !== '') {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.id = 'noResults';
                    noResultsMsg.className = 'no-results';
                    noResultsMsg.innerHTML = `<p><i class="fas fa-search"></i> Question number "${searchTerm}" not found.</p><p>Please try 1, 2, or 3.</p>`;
                    document.getElementById('questionsContainer').appendChild(noResultsMsg);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        }
        
        // Clear search function
        function clearSearch() {
            document.getElementById('searchInput').value = '';
            searchByNumber();
        }
        
        // Real-time search as user types
        document.getElementById('searchInput').addEventListener('input', function() {
            searchByNumber();
        });
        
        // Focus on search input when page loads
        window.addEventListener('load', function() {
            document.getElementById('searchInput').focus();
        });
        
        // NEW: Enhanced search with keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl+K or Cmd+K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }
            
            // Escape to clear search
            if (e.key === 'Escape') {
                clearSearch();
            }
        });