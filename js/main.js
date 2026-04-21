"use strict";

// استخدام Intersection Observer لتحسين الأداء (Lazy Loading للأقسام)
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

/**
 * خوارزمية التحقق من ظهور العناصر لتشغيل الأنيميشن
 */
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // تحسين الأداء عبر إيقاف المراقبة بعد التفعيل
        }
    });
}, revealOptions);

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. تحديث السنة الحالية في الفوتر تلقائياً
    const yearElement = document.getElementById("current-year");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // 2. إدارة شاشة التحميل (Preloader)
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.remove(), 500);
            }
            // بدء تحميل البيانات بعد اختفاء شاشة التحميل لتحسين LCP
            initData();
        }, 600);
    });

    // 3. هيكل بيانات الخدمات (Data Structure: Array of Objects)
    const services = [
        { 
            id: 1, 
            title: "التصميم الهندسي", 
            desc: "نقدم تصاميم معمارية وإنشائية مبتكرة تلبي تطلعاتكم وتجمع بين الجمال والوظيفة.",
            icon: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
        },
        { 
            id: 2, 
            title: "المقاولات العامة", 
            desc: "تنفيذ كافة أعمال البناء والتشييد بأعلى معايير الجودة العالمية وبإشراف هندسي دقيق.",
            icon: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
        },
        { 
            id: 3, 
            title: "التصميم الداخلي", 
            desc: "نحول المساحات الداخلية إلى لوحات فنية تعكس ذوقكم الرفيع وتوفر أقصى درجات الراحة.",
            icon: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18"/></svg>`
        },
        { 
            id: 4, 
            title: "البنية التحتية", 
            desc: "خبرة واسعة في تنفيذ مشاريع الطرق والجسور وشبكات المياه والصرف الصحي.",
            icon: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
        }
    ];

    // 4. هيكل بيانات المشاريع (Data Structure: Array of Objects)
    const projects = [
        { id: 1, name: "برج باريس السكني", category: "residential", image: "img/project/proj1.jpg", label: "سكني" },
        { id: 2, name: "مول العاصمة التجاري", category: "commercial", image: "img/project/proj2.jpg", label: "تجاري" },
        { id: 3, name: "شركة السلام ", category: "infrastructure", image: "img/project/proj3.jpg", label: "بنية تحتية" },
        { id: 4, name: "مجمع الفلل الملكية", category: "residential", image: "img/project/proj4.jpg", label: "سكني" },
        { id: 5, name: "مستشفى الأمل التخصصي", category: "commercial", image: "img/project/proj5.jpg", label: "تجاري" },
        { id: 6, name: "محطة الطاقة الشمسية", category: "infrastructure", image: "img/project/proj6.jpg", label: "بنية تحتية" },
        { id: 7, name: "برج باريس السكني", category: "residential", image: "img/project/proj7.jpg", label: "سكني" },
        { id: 8, name: "مول العاصمة التجاري", category: "commercial", image: "img/project/proj8.jpg", label: "تجاري" },
        { id: 9, name: "مركز الابحاث البحرية", category: "infrastructure", image: "img/project/proj9.jpg", label: "بنية تحتية" },
        { id: 10, name: "برج باريس السكني", category: "residential", image: "img/project/proj10.jpg", label: "سكني" },
        { id: 11, name: "مستشفى الأمل التخصصي", category: "commercial", image: "img/project/proj11.jpg", label: "تجاري" },
        { id: 12, name: "محطة الطاقة الشمسية", category: "infrastructure", image: "img/project/proj12.jpg", label: "بنية تحتية" },
        { id: 13, name: "مجمع الفلل الملكية", category: "residential", image: "img/project/proj13.jpg", label: "سكني" },
        { id: 14, name: "مستشفى الأمل التخصصي", category: "commercial", image: "img/project/proj14.jpg", label: "تجاري" },
        { id: 15, name: "محطة الطاقة الشمسية", category: "infrastructure", image: "img/project/proj15.jpg", label: "بنية تحتية" },
    ];

    /**
     * وظيفة تطهير البيانات لمنع هجمات XSS (Security Measure)
     */
    function sanitize(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * خوارزمية عرض الخدمات ديناميكياً
     */
    function renderServices() {
        const container = document.getElementById("services-container");
        if (!container) return;
        
        container.innerHTML = services.map(service => `
            <div class="service-card reveal-up">
                <div class="service-icon">${service.icon}</div>
                <h3>${sanitize(service.title)}</h3>
                <p>${sanitize(service.desc)}</p>
            </div>
        `).join('');
        
        // تفعيل مراقبة العناصر الجديدة للأنيميشن
        container.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
    }

    /**
     * خوارزمية عرض المشاريع مع دعم الفلترة والبحث
     */
    function renderProjects(data) {
        const container = document.getElementById("projects-container");
        if (!container) return;

        if (data.length === 0) {
            container.innerHTML = `<p class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px;">لا توجد نتائج تطابق بحثك.</p>`;
            return;
        }

        container.innerHTML = data.map(project => `
            <div class="project-card reveal-up">
                <div class="project-img">
                    <img src="${project.image}" alt="${sanitize(project.name)}" loading="lazy">
                    <div class="project-overlay">
                        <span class="category">${sanitize(project.label)}</span>
                        <h3>${sanitize(project.name)}</h3>
                    </div>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
    }

    /**
     * خوارزمية البحث والفلترة (Optimization: Filter Algorithm)
     */
    function filterProjects() {
        const searchTerm = document.getElementById("project-search").value.toLowerCase();
        const category = document.getElementById("project-filter").value;
        const sortBy = document.getElementById("project-sort").value;

        let filtered = projects.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm);
            const matchesCategory = category === "all" || p.category === category;
            return matchesSearch && matchesCategory;
        });

        // خوارزمية الترتيب (Sorting Algorithm)
        if (sortBy === "name") {
            filtered.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
        } else {
            filtered.sort((a, b) => b.id - a.id); // الأحدث بناءً على ID
        }

        renderProjects(filtered);
    }

    // تهيئة البيانات الأولية
    function initData() {
        renderServices();
        renderProjects(projects);
        
        // ربط أحداث الفلترة والبحث
        const searchInput = document.getElementById("project-search");
        const filterSelect = document.getElementById("project-filter");
        const sortSelect = document.getElementById("project-sort");

        if (searchInput) searchInput.addEventListener("input", debounce(filterProjects, 300));
        if (filterSelect) filterSelect.addEventListener("change", filterProjects);
        if (sortSelect) sortSelect.addEventListener("change", filterProjects);
    }

    /**
     * خوارزمية Debounce لتحسين أداء البحث (Performance Optimization)
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 5. إدارة القائمة في الجوال (Hamburger Menu)
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // إغلاق القائمة عند الضغط على رابط
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // 6. تأثير شريط التنقل عند التمرير (Sticky Header)
    const header = document.getElementById("header");
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            header.classList.add("scrolled");
            backToTop.classList.add("show");
        } else {
            header.classList.remove("scrolled");
            backToTop.classList.remove("show");
        }
    });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 7. تبديل الوضع الليلي (Dark Mode)
    const themeToggle = document.getElementById("theme-toggle");
    const sunIcon = document.querySelector(".sun-icon");
    const moonIcon = document.querySelector(".moon-icon");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";
            
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            
            if (newTheme === "dark") {
                sunIcon.style.display = "none";
                moonIcon.style.display = "block";
            } else {
                sunIcon.style.display = "block";
                moonIcon.style.display = "none";
            }
        });

        // استعادة الوضع المفضل للمستخدم
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        if (savedTheme === "dark") {
            sunIcon.style.display = "none";
            moonIcon.style.display = "block";
        }
    }

    // 8. معالجة نموذج التواصل (Security: Validation)
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // محاكاة إرسال آمن
            const formData = new FormData(contactForm);
            const name = sanitize(formData.get("name"));
            const email = sanitize(formData.get("email"));
            
            alert(`شكراً لك يا ${name}، تم استلام رسالتك بنجاح وسنتواصل معك عبر ${email} قريباً.`);
            contactForm.reset();
        });
    }

    // تفعيل الأنيميشن للعناصر الثابتة في HTML
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));
});
