/**
 * Ra7oox Portfolio - i18n Translation Engine
 * Lightweight, Vanilla JavaScript Localization (French & Arabic)
 */

const i18n = {
  activeLang: 'fr',

  translations: {
    fr: {
      // Navbar Links
      "nav_home": "Accueil",
      "nav_about": "À propos",
      "nav_experience": "Expérience",
      "nav_skills": "Compétences",
      "nav_services": "Services",
      "nav_process": "Méthode",
      "nav_portfolio": "Portfolio",
      "nav_testimonials": "Témoignages",
      "nav_contact": "Contact",

      // Preloader
      "loading": "Chargement",

      // Hero Section
      "hero_hello": "Bonjour, je suis",
      "hero_description": "Développeur Full Stack passionné avec 3 ans d'expérience dans la création d'expériences digitales exceptionnelles. Spécialisé dans les technologies web modernes et la création de solutions centrées sur l'utilisateur qui font la différence.",
      "code_role": "Développeur Full Stack",
      "code_location": "Rabat, Maroc",
      "code_passion": "Créer des expériences exceptionnelles",
      "stat_projects": "Projets",
      "stat_clients": "Clients",
      "stat_awards": "Distinctions",
      "btn_view_work": "Voir Mes Projets",
      "btn_get_touch": "Contactez-moi",
      "scroll_down": "Faire défiler",

      // Experience Section
      "exp_tag": "Parcours Professionnel",
      "exp_title": "Mon Expérience",
      "exp_subtitle": "Un voyage à travers l'innovation et l'apprentissage",
      
      "exp_samtech_role": "Développeur Full Stack",
      "exp_samtech_duration": "4 Mois",
      "exp_samtech_desc": "Contribution active au développement de projets variés, incluant des plateformes e-commerce, des solutions web sur mesure et des applications éducatives.",
      "exp_samtech_det1": "Développement de fonctionnalités web complexes",
      "exp_samtech_det2": "Optimisation d'interfaces utilisateur (UI/UX)",
      
      "exp_snrt_role": "Stage de fin d'études",
      "exp_snrt_duration": "3 Mois",
      "exp_snrt_desc": "Participation active au développement de la plateforme Mplanner, une solution innovante de planification et de gestion des productions audiovisuelles pour la SNRT.",
      "exp_snrt_det1": "Conception et développement de modules de planification",
      "exp_snrt_det2": "Intégration de workflows pour la production audiovisuelle",

      // About Section
      "about_tag": "Faites Connaissance",
      "about_title": "À Propos de Moi",
      "about_subtitle": "Mon parcours en tant que développeur",
      "about_badge_years": "Années",
      "about_badge_exp": "d'Expérience",
      "about_role": "Développeur Full Stack",
      "about_desc1": "Bonjour ! Je suis Soufiane Arrahou, un développeur full-stack passionné basé à Rabat, au Maroc. Mon parcours dans le développement web a commencé il y a 3 ans, et depuis, je suis sur un chemin passionnant d'apprentissage continu et de croissance.",
      "about_desc2": "Je me spécialise dans la création d'applications web modernes, réactives et faciles à utiliser. Mon expertise s'étend à la fois aux technologies frontend et backend, me permettant de construire des solutions complètes de la conception au déploiement. Je suis particulièrement passionné par le code propre, le design innovant et la résolution de problèmes complexes.",
      "about_info_name": "Nom",
      "about_info_role": "Rôle",
      "about_info_location": "Localisation",
      "about_info_education": "Études",
      "about_info_loc_val": "Rabat, Maroc",
      "about_info_edu_val": "Informatique",
      "btn_work_together": "Travaillons Ensemble",

      // Skills Section
      "skills_tag": "Mon Expertise",
      "skills_title": "Compétences Techniques",
      "skills_subtitle": "Les technologies avec lesquelles je travaille",
      "skills_cat_front": "Développement Frontend",
      "skills_cat_back": "Développement Backend",
      "skills_cat_tools": "Outils & Autres",

      // Services Section
      "services_tag": "Ce que J'offre",
      "services_title": "Mes Services",
      "services_subtitle": "Des solutions complètes pour vos besoins numériques",
      "services_btn": "Commencer",
      
      "service_design_title": "Web Design",
      "service_design_desc": "Création de designs web magnifiques, modernes et réactifs qui captivent les utilisateurs et améliorent l'expérience utilisateur.",
      "service_design_f1": "Design Réactif",
      "service_design_f2": "Design UI/UX",
      "service_design_f3": "Maquettage fil de fer",
      "service_design_f4": "Prototypage",
      
      "service_dev_title": "Développement Web",
      "service_dev_desc": "Services complets de développement web full-stack, incluant le frontend, le backend, la modélisation de bases de données et l'intégration d'API.",
      "service_dev_f1": "Développement Frontend",
      "service_dev_f2": "Développement Backend",
      "service_dev_f3": "Conception de Base de Données",
      "service_dev_f4": "Développement d'API",
      
      "service_mob_title": "Optimisation Mobile",
      "service_mob_desc": "Garantir que votre site fonctionne parfaitement sur tous les appareils grâce à des techniques d'optimisation axées sur le mobile-first.",
      "service_mob_f1": "Design Mobile-First",
      "service_mob_f2": "Optimisation des Performances",
      "service_mob_f3": "Tests Multi-navigateurs",
      "service_mob_f4": "Applications Web Progressives (PWA)",
      
      "service_opt_title": "Optimisation de Site",
      "service_opt_desc": "Accélérez votre site et améliorez son référencement SEO grâce à des optimisations de performance et au respect des bonnes pratiques.",
      "service_opt_f1": "Optimisation de Vitesse",
      "service_opt_f2": "Amélioration SEO",
      "service_opt_f3": "Optimisation du Code",
      "service_opt_f4": "Renforcement de la Sécurité",
      
      "service_maint_title": "Maintenance & Support",
      "service_maint_desc": "Maintenance continue du site et support technique pour assurer un fonctionnement fluide, sécurisé et toujours à jour.",
      "service_maint_f1": "Mises à jour régulières",
      "service_maint_f2": "Correction de bugs",
      "service_maint_f3": "Surveillance de sécurité",
      "service_maint_f4": "Support Technique",

      // Process Section
      "process_tag": "Méthode de Travail",
      "process_title": "Mon Flux de Travail",
      "process_subtitle": "Une approche structurée pour livrer l'excellence",
      "process_step1_title": "Découverte",
      "process_step1_desc": "Recherche initiale et analyse approfondie des exigences pour comprendre les objectifs et les besoins des utilisateurs.",
      "process_step2_title": "Conception",
      "process_step2_desc": "Création d'expériences UI/UX intuitives et d'une architecture système solide et évolutive.",
      "process_step3_title": "Développement",
      "process_step3_desc": "Développement de code propre et robuste avec les dernières technologies et des tests rigoureux.",
      "process_step4_title": "Déploiement",
      "process_step4_desc": "Lancement du produit final avec un suivi continu et un support proactif.",

      // Portfolio Section
      "portfolio_tag": "Mon Travail",
      "portfolio_title": "Projets Phares",
      "portfolio_subtitle": "Projets récents dont je suis fier",
      "filter_all": "Tous les Projets",
      "filter_front": "Frontend",
      "filter_full": "Full Stack",
      "filter_design": "Design",
      "portfolio_zoom": "Agrandir",
      "portfolio_view": "Voir le projet",
      "portfolio_source": "Code source",
      
      "project_samtech_desc": "Système complet de gestion d'entreprise (ERP) permettant le suivi et l'automatisation des ventes, des achats, des stocks et des ressources.",
      "project_skillswap_desc": "Application mobile d'échange de compétences interactive permettant d'apprendre et de partager des savoirs avec agenda, chat, carte et communauté.",
      "project_ent_desc": "Plateforme numérique estudiantine basée sur une architecture microservices pour une gestion fluide des ressources académiques.",
      "project_biblio_desc": "Système moderne de gestion de bibliothèque avec authentification des utilisateurs et suivi des livres.",
      "project_ticket_desc": "Plateforme de réservation de billets d'événements avec disponibilité en temps réel et paiements sécurisés.",
      "project_portv1_desc": "Mon premier site web portfolio présentant mes premiers projets et compétences.",
      "project_ecom_desc": "Plateforme e-commerce moderne avec panier d'achat et intégration de paiement sécurisé.",
      "project_weather_desc": "Application météo en temps réel avec géolocalisation et prévisions détaillées.",
      "project_task_desc": "Outil collaboratif de gestion des tâches avec fonctionnalités d'équipe et système de notifications.",

      // Testimonials Section
      "test_tag": "Retours Clients",
      "test_title": "Ce que Disent les Clients",
      "test_subtitle": "Témoignages de clients satisfaits",
      "test1_text": "\"Soufiane a livré un site web exceptionnel pour notre entreprise. Son souci du détail et son expertise technique ont dépassé nos attentes. Hautement recommandé !\"",
      "test1_author": "Mohamed Alami",
      "test1_role": "CEO, TechStart",
      "test2_text": "\"Travailler avec Soufiane a été un plaisir. Il a parfaitement compris nos exigences et a livré un site moderne et réactif que nos clients adorent.\"",
      "test2_author": "Oussama Elmloudi",
      "test2_role": "Ami & Partenaire",
      "test3_text": "\"Excellent développeur ! La pédagogie de Soufiane m'a aidé à comprendre l'analyse de marché. Sa capacité à expliquer simplement des concepts complexes est remarquable.\"",
      "test3_author": "Youssef Abis",
      "test3_role": "Étudiant en Trading",

      // Contact Section
      "contact_tag": "Entrons en Contact",
      "contact_title": "Contactez-Moi",
      "contact_subtitle": "Discutons de votre prochain projet",
      "contact_h3": "Travaillons Ensemble",
      "contact_desc": "Je suis toujours ouvert à discuter de nouveaux projets, d'idées créatives ou d'opportunités pour faire partie de votre vision.",
      "contact_form_name": "Votre Nom",
      "contact_form_email": "Votre Email",
      "contact_form_subject": "Sujet",
      "contact_form_message": "Message",
      "placeholder_name": "Nom complet",
      "placeholder_email": "adresse@exemple.com",
      "placeholder_subject": "Demande de projet",
      "placeholder_message": "Parlez-moi de votre projet...",
      "btn_send_msg": "Envoyer le Message",

      // Footer
      "footer_tagline": "Développeur Full Stack & Passionné de Trading",
      "footer_rights": "Tous droits réservés.",
      "footer_quick": "Liens Rapides",
      "footer_services": "Services",
      "footer_info": "Infos de Contact",
      "footer_credits": "Conçu & Développé avec",
      "footer_by": "par Soufiane Arrahou",

      // Extra
      "email_copied": "E-mail copié dans le presse-papiers !",
      "val_all_fields": "Veuillez remplir tous les champs",
      "val_valid_email": "Veuillez entrer une adresse email valide",
      "msg_sending": "Envoi en cours...",
      "msg_sent_success": "Message envoyé avec succès ! Je vous répondrai bientôt.",
      "msg_sent_error": "Une erreur est survenue lors de l'envoi.",
      
      // Leave a Review
      "review_title": "Laissez un avis",
      "review_subtitle": "Votre avis compte énormément pour moi",
      "review_form_name": "Votre Nom complet",
      "review_form_role": "Votre Rôle / Entreprise",
      "review_form_rating": "Votre Note",
      "review_form_text": "Votre Témoignage",
      "review_btn_submit": "Soumettre l'avis",
      "review_success": "Merci infiniment pour votre avis !",
      "review_placeholder_name": "Ex: Jean Dupont",
      "review_placeholder_role": "Ex: CEO, TechStart",
      "review_placeholder_text": "Racontez votre expérience de collaboration avec moi..."
    },
    en: {
      // Navbar Links
      "nav_home": "Home",
      "nav_about": "About",
      "nav_experience": "Experience",
      "nav_skills": "Skills",
      "nav_services": "Services",
      "nav_process": "Process",
      "nav_portfolio": "Portfolio",
      "nav_testimonials": "Testimonials",
      "nav_contact": "Contact",

      // Preloader
      "loading": "Loading",

      // Hero Section
      "hero_hello": "Hello, I am",
      "hero_description": "Passionate Full Stack Developer with 3 years of experience in creating exceptional digital experiences. Specialized in modern web technologies and creating user-centric solutions that make a difference.",
      "code_role": "Full Stack Developer",
      "code_location": "Rabat, Morocco",
      "code_passion": "Creating amazing experiences",
      "stat_projects": "Projects Done",
      "stat_clients": "Happy Clients",
      "stat_awards": "Awards Won",
      "btn_view_work": "View My Work",
      "btn_get_touch": "Get in Touch",
      "scroll_down": "Scroll Down",

      // Experience Section
      "exp_tag": "Professional Journey",
      "exp_title": "My Experience",
      "exp_subtitle": "A journey through innovation and continuous learning",
      
      "exp_samtech_role": "Full Stack Developer",
      "exp_samtech_duration": "4 Months",
      "exp_samtech_desc": "Active contribution to the development of various projects, including e-commerce platforms, custom web solutions, and educational applications.",
      "exp_samtech_det1": "Development of complex web features",
      "exp_samtech_det2": "Optimization of user interfaces (UI/UX)",
      
      "exp_snrt_role": "Graduation Internship",
      "exp_snrt_duration": "3 Months",
      "exp_snrt_desc": "Active participation in the development of the Mplanner platform, an innovative planning and management solution for audiovisual productions at SNRT.",
      "exp_snrt_det1": "Design and development of planning modules",
      "exp_snrt_det2": "Integration of workflows for audiovisual production",

      // About Section
      "about_tag": "Get to Know Me",
      "about_title": "About Me",
      "about_subtitle": "My journey as a developer",
      "about_badge_years": "Years",
      "about_badge_exp": "of Experience",
      "about_role": "Full Stack Developer",
      "about_desc1": "Hello! I am Soufiane Arrahou, a passionate full-stack developer based in Rabat, Morocco. My journey in web development started 3 years ago, and since then, I have been on an exciting path of continuous learning and growth.",
      "about_desc2": "I specialize in building modern, responsive, and easy-to-use web applications. My expertise spans both frontend and backend technologies, allowing me to build complete solutions from conception to deployment. I am particularly passionate about clean code, innovative design, and solving complex problems.",
      "about_info_name": "Name",
      "about_info_role": "Role",
      "about_info_location": "Location",
      "about_info_education": "Education",
      "about_info_loc_val": "Rabat, Morocco",
      "about_info_edu_val": "Computer Science",
      "btn_work_together": "Let's Work Together",

      // Skills Section
      "skills_tag": "My Expertise",
      "skills_title": "Technical Skills",
      "skills_subtitle": "The technologies I work with",
      "skills_cat_front": "Frontend Development",
      "skills_cat_back": "Backend Development",
      "skills_cat_tools": "Tools & Others",

      // Services Section
      "services_tag": "What I Offer",
      "services_title": "My Services",
      "services_subtitle": "Complete solutions for your digital needs",
      "services_btn": "Get Started",
      
      "service_design_title": "Web Design",
      "service_design_desc": "Creating beautiful, modern, and responsive web designs that captivate users and enhance user experience.",
      "service_design_f1": "Responsive Design",
      "service_design_f2": "UI/UX Design",
      "service_design_f3": "Wireframing",
      "service_design_f4": "Prototyping",
      
      "service_dev_title": "Web Development",
      "service_dev_desc": "Full-stack web development services, including frontend, backend, database modeling, and API integration.",
      "service_dev_f1": "Frontend Development",
      "service_dev_f2": "Backend Development",
      "service_dev_f3": "Database Design",
      "service_dev_f4": "API Development",
      
      "service_mob_title": "Mobile Optimization",
      "service_mob_desc": "Ensuring your website works perfectly on all devices using mobile-first optimization techniques.",
      "service_mob_f1": "Mobile-First Design",
      "service_mob_f2": "Performance Tuning",
      "service_mob_f3": "Cross-Browser Testing",
      "service_mob_f4": "Progressive Web Apps (PWA)",
      
      "service_opt_title": "Site Optimization",
      "service_opt_desc": "Speed up your website and improve its SEO ranking through performance optimization and best practices.",
      "service_opt_f1": "Speed Optimization",
      "service_opt_f2": "SEO Improvement",
      "service_opt_f3": "Code Optimization",
      "service_opt_f4": "Security Hardening",
      
      "service_maint_title": "Maintenance & Support",
      "service_maint_desc": "Ongoing site maintenance and technical support to ensure smooth, secure, and up-to-date operations.",
      "service_maint_f1": "Regular Updates",
      "service_maint_f2": "Bug Fixing",
      "service_maint_f3": "Security Monitoring",
      "service_maint_f4": "Technical Support",

      // Process Section
      "process_tag": "How I Work",
      "process_title": "My Work Process",
      "process_subtitle": "A structured approach to delivering excellence",
      "process_step1_title": "Discovery",
      "process_step1_desc": "Initial research and in-depth analysis of requirements to understand user goals and needs.",
      "process_step2_title": "Design",
      "process_step2_desc": "Creating intuitive UI/UX experiences and a solid, scalable system architecture.",
      "process_step3_title": "Development",
      "process_step3_desc": "Developing clean and robust code with the latest technologies and rigorous testing.",
      "process_step4_title": "Deployment",
      "process_step4_desc": "Launching the final product with continuous monitoring and proactive support.",

      // Portfolio Section
      "portfolio_tag": "My Work",
      "portfolio_title": "Featured Projects",
      "portfolio_subtitle": "Recent projects I am proud of",
      "filter_all": "All Projects",
      "filter_front": "Frontend",
      "filter_full": "Full Stack",
      "filter_design": "Design",
      "portfolio_zoom": "Zoom In",
      "portfolio_view": "View Project",
      "portfolio_source": "Source Code",
      
      "project_samtech_desc": "Complete Enterprise Resource Planning (ERP) system for tracking and automating sales, purchases, inventory, and human resources.",
      "project_skillswap_desc": "Interactive mobile application for skill exchange, allowing users to learn and share knowledge with schedules, chats, maps, and community features.",
      "project_ent_desc": "Student digital platform built on microservices architecture for smooth academic resource management.",
      "project_biblio_desc": "Modern library management system with user authentication and book tracking.",
      "project_ticket_desc": "Event ticket booking platform with real-time availability and secure payments.",
      "project_portv1_desc": "My first personal portfolio website presenting my early projects and skills.",
      "project_ecom_desc": "Advanced e-commerce platform featuring a modern shopping cart and payment gateway integration.",
      "project_weather_desc": "Real-time weather forecast application with geolocation and detailed forecast metrics.",
      "project_task_desc": "Collaborative task scheduling tool with team features and smart notifications.",

      // Testimonials Section
      "test_tag": "Client Testimonials",
      "test_title": "What Clients Say",
      "test_subtitle": "Testimonials from satisfied clients",
      "test1_text": "\"Soufiane delivered an exceptional website for our company. His attention to detail and technical expertise exceeded our expectations. Highly recommended!\"",
      "test1_author": "Mohamed Alami",
      "test1_role": "CEO, TechStart",
      "test2_text": "\"Working with Soufiane was a pleasure. He perfectly understood our requirements and delivered a modern and responsive site that our clients love.\"",
      "test2_author": "Oussama Elmloudi",
      "test2_role": "Friend & Partner",
      "test3_text": "\"Excellent developer! Soufiane's teaching approach helped me understand market analysis. His ability to explain complex concepts simply is remarkable.\"",
      "test3_author": "Youssef Abis",
      "test3_role": "Trading Student",

      // Contact Section
      "contact_tag": "Get in Touch",
      "contact_title": "Contact Me",
      "contact_subtitle": "Let's discuss your next project",
      "contact_h3": "Let's Work Together",
      "contact_desc": "I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
      "contact_form_name": "Your Name",
      "contact_form_email": "Your Email",
      "contact_form_subject": "Subject",
      "contact_form_message": "Message",
      "placeholder_name": "Full Name",
      "placeholder_email": "name@example.com",
      "placeholder_subject": "Project Inquiry",
      "placeholder_message": "Tell me more about your project...",
      "btn_send_msg": "Send Message",

      // Footer
      "footer_tagline": "Full Stack Developer & Trading Enthusiast",
      "footer_rights": "All rights reserved.",
      "footer_quick": "Quick Links",
      "footer_services": "Services",
      "footer_info": "Contact Info",
      "footer_credits": "Designed & Developed with",
      "footer_by": "by Soufiane Arrahou",

      // Extra
      "email_copied": "Email copied to clipboard!",
      "val_all_fields": "Please fill in all fields",
      "val_valid_email": "Please enter a valid email address",
      "msg_sending": "Sending message...",
      "msg_sent_success": "Message sent successfully! I will reply to you soon.",
      "msg_sent_error": "An error occurred while trying to send the message.",
      
      // Leave a Review
      "review_title": "Leave a Review",
      "review_subtitle": "Your feedback is highly valuable to me",
      "review_form_name": "Your Full Name",
      "review_form_role": "Your Role / Company",
      "review_form_rating": "Your Rating",
      "review_form_text": "Your Review",
      "review_btn_submit": "Submit Review",
      "review_success": "Thank you so much for your review!",
      "review_placeholder_name": "e.g. John Doe",
      "review_placeholder_role": "e.g. CEO, TechStart",
      "review_placeholder_text": "Share details of your experience working with me..."
    },
    ar: {
      // Navbar Links
      "nav_home": "الرئيسية",
      "nav_about": "من أنا",
      "nav_experience": "الخبرة",
      "nav_skills": "المهارات",
      "nav_services": "الخدمات",
      "nav_process": "منهجية العمل",
      "nav_portfolio": "المشاريع",
      "nav_testimonials": "التوصيات",
      "nav_contact": "اتصل بي",

      // Preloader
      "loading": "جاري التحميل",

      // Hero Section
      "hero_hello": "مرحباً، أنا",
      "hero_description": "مطور ويب متكامل (Full Stack) شغوف بخبرة 3 سنوات في بناء تجارب رقمية استثنائية. متوافق مع أحدث تقنيات الويب، وأسعى لابتكار حلول برمجية تتمحور حول تلبية احتياجات المستخدم.",
      "code_role": "مطور ويب متكامل",
      "code_location": "الرباط، المغرب",
      "code_passion": "صنع تجارب رقمية رائعة",
      "stat_projects": "مشاريع منجزة",
      "stat_clients": "عملاء",
      "stat_awards": "جوائز",
      "btn_view_work": "عرض أعمالي",
      "btn_get_touch": "اتصل بي الآن",
      "scroll_down": "انزل للأسفل",

      // Experience Section
      "exp_tag": "المسار المهني",
      "exp_title": "خبراتي المهنية",
      "exp_subtitle": "رحلة حافلة بالابتكار والتعلم المستمر",
      
      "exp_samtech_role": "مطور ويب متكامل",
      "exp_samtech_duration": "4 أشهر",
      "exp_samtech_desc": "مساهمة نشطة في تطوير مشاريع متنوعة، تشمل منصات التجارة الإلكترونية، وحلول الويب المخصصة، والتطبيقات التعليمية.",
      "exp_samtech_det1": "برمجة وتطوير وظائف وميزات ويب معقدة",
      "exp_samtech_det2": "تحسين وتطوير واجهات المستخدم وتجربة الاستخدام (UI/UX)",
      
      "exp_snrt_role": "تدريب نهاية الدراسة",
      "exp_snrt_duration": "3 أشهر",
      "exp_snrt_desc": "المشاركة الفعالة في تطوير مشروع Mplanner، وهو عبارة عن منصة مبتكرة لتخطيط وإدارة الإنتاج السمعي البصري لفائدة الشركة الوطنية للإذاعة والتلفزة (SNRT).",
      "exp_snrt_det1": "تصميم وتطوير وحدات التخطيط والجدولة",
      "exp_snrt_det2": "دمج وتسهيل مسارات العمل الخاصة بالإنتاج التلفزيوني",

      // About Section
      "about_tag": "تعرف علي",
      "about_title": "نبذة عني",
      "about_subtitle": "رحلتي في عالم التطوير والبرمجة",
      "about_badge_years": "سنوات",
      "about_badge_exp": "من الخبرة",
      "about_role": "مطور ويب متكامل",
      "about_desc1": "مرحباً! أنا سفيان الراحو، مطور ويب متكامل شغوف أقيم بمدينة الرباط، المغرب. بدأت رحلتي في مجال تطوير الويب منذ 3 سنوات، ومنذ ذلك الحين وأنا في مسار رائع من التعلم المستمر والنمو المهني.",
      "about_desc2": "أنا متخصص في بناء تطبيقات ويب حديثة، متجاوبة، وسهلة الاستخدام. تغطي خبرتي كلاً من تقنيات الواجهة الأمامية والخلفية، مما يتيح لي بناء حلول برمجية متكاملة بدءاً من الفكرة وحتى النشر. أنا شغوف جداً بكتابة الأكواد النظيفة، والتصميم المبتكر، وحل المشكلات التقنية المعقدة.",
      "about_info_name": "الاسم",
      "about_info_role": "التخصص",
      "about_info_location": "الموقع",
      "about_info_education": "الدراسة",
      "about_info_loc_val": "الرباط، المغرب",
      "about_info_edu_val": "علوم الكمبيوتر",
      "btn_work_together": "لنعمل معاً",

      // Skills Section
      "skills_tag": "مجالات خبرتي",
      "skills_title": "المهارات التقنية",
      "skills_subtitle": "أحدث التقنيات البرمجية التي أعمل بها",
      "skills_cat_front": "تطوير الواجهة الأمامية",
      "skills_cat_back": "تطوير الواجهة الخلفية",
      "skills_cat_tools": "الأدوات وتقنيات أخرى",

      // Services Section
      "services_tag": "الخدمات التي أقدمها",
      "services_title": "خدماتي المتميزة",
      "services_subtitle": "حلول برمجية متكاملة لتلبية تطلعاتك الرقمية",
      "services_btn": "ابدأ الآن",
      
      "service_design_title": "تصميم مواقع الويب",
      "service_design_desc": "تصميم واجهات ويب ساحرة، حديثة، ومتجاوبة تجذب انتباه المستخدمين وتمنحهم تجربة استخدام استثنائية وسلسة.",
      "service_design_f1": "تصميم متجاوب بالكامل",
      "service_design_f2": "تصميم واجهات وتجربة مستخدم (UI/UX)",
      "service_design_f3": "هيكلة وتخطيط أولي (Wireframing)",
      "service_design_f4": "بناء نماذج أولية تفاعلية",
      
      "service_dev_title": "تطوير الويب المتكامل",
      "service_dev_desc": "خدمات تطوير ويب متكاملة تشمل برمجة وتصميم الواجهة الأمامية، الأنظمة الخلفية، قواعد البيانات وتكامل بروتوكولات الـ API.",
      "service_dev_f1": "تطوير واجهات أمامية تفاعلية",
      "service_dev_f2": "تطوير البنية البرمجية الخلفية",
      "service_dev_f3": "هيكلة وتصميم قواعد البيانات",
      "service_dev_f4": "برمجة وبناء الواجهات البرمجية (APIs)",
      
      "service_mob_title": "التهيئة والتوافق مع الهواتف",
      "service_mob_desc": "ضمان ظهور موقعك وأدائه بشكل مثالي على جميع الأجهزة الذكية من خلال أحدث استراتيجيات التصميم للهواتف أولاً.",
      "service_mob_f1": "استراتيجية التصميم للهواتف أولاً",
      "service_mob_f2": "تحسين سرعة الاستجابة والأداء",
      "service_mob_f3": "اختبار التوافق عبر مختلف المتصفحات",
      "service_mob_f4": "تطبيقات الويب التقدمية (PWA)",
      
      "service_opt_title": "تحسين أداء المواقع وسرعتها",
      "service_opt_desc": "تسريع موقعك الإلكتروني بشكل كبير وتحسين ترتيبه في محركات البحث (SEO) من خلال تطبيق أفضل المعايير التقنية العالمية.",
      "service_opt_f1": "تحسين سرعة تحميل الصفحات",
      "service_opt_f2": "تهيئة الموقع لمحركات البحث (SEO)",
      "service_opt_f3": "تنظيف وتحسين جودة الكود البرمجي",
      "service_opt_f4": "تعزيز أمن وحماية الموقع",
      
      "service_maint_title": "الصيانة والدعم الفني",
      "service_maint_desc": "صيانة مستمرة للموقع ودعم فني دوري لضمان استقرار أدائه، وحمايته من الثغرات، وإبقائه محدثاً بشكل مستمر.",
      "service_maint_f1": "تحديثات دورية للموقع والمنصات",
      "service_maint_f2": "تتبع وإصلاح الأخطاء البرمجية (Bugs)",
      "service_maint_f3": "مراقبة وفحص أمن الموقع دورياً",
      "service_maint_f4": "دعم فني واستشارات متواصلة",

      // Process Section
      "process_tag": "طريقة عملي",
      "process_title": "منهجية العمل الاحترافية",
      "process_subtitle": "خطوات مدروسة ومنظمة لتقديم أعمال فائقة الجودة",
      "process_step1_title": "التحليل والاكتشاف",
      "process_step1_desc": "بحث مبدئي ودراسة عميقة للمتطلبات لفهم أهداف المشروع بدقة وتحديد احتياجات الجمهور المستهدف.",
      "process_step2_title": "التخطيط والتصميم",
      "process_step2_desc": "ابتكار تجارب استخدام (UI/UX) بديهية، وتخطيط بنية هندسية مرنة وقابلة للتطوير المستقبلي.",
      "process_step3_title": "التطوير والبرمجة",
      "process_step3_desc": "كتابة أكواد برمجية نظيفة وقوية باستخدام أحدث التقنيات مع إخضاع الموقع لاختبارات أداء صارمة.",
      "process_step4_title": "النشر والتشغيل",
      "process_step4_desc": "إطلاق المنتج النهائي بنجاح مع تفعيل الرصد المستمر وضمان الدعم الاستباقي المستمر.",

      // Portfolio Section
      "portfolio_tag": "مشاريعي المنجزة",
      "portfolio_title": "معرض مشاريعي",
      "portfolio_subtitle": "باقة من أحدث المشاريع التي أفخر بتطويرها",
      "filter_all": "جميع المشاريع",
      "filter_front": "واجهات أمامية",
      "filter_full": "تطوير متكامل",
      "filter_design": "تصميم وتخطيط",
      "portfolio_zoom": "تكبير الصورة",
      "portfolio_view": "زيارة الموقع",
      "portfolio_source": "الكود المصدري",
      
      "project_samtech_desc": "نظام تخطيط موارد المؤسسات المتكامل (ERP) لتتبع وأتمتة العمليات التجارية كالمبيعات، المشتريات، المخازن والموارد البشرية.",
      "project_skillswap_desc": "تطبيق هاتف تفاعلي لتبادل المهارات والخبرات يسمح للمستخدمين بالتعلم والمشاركة عبر أجندة، محادثات، خرائط ومجتمع تفاعلي.",
      "project_ent_desc": "منصة تعليمية وجامعية للطلاب تعتمد على هندسة الخدمات المصغرة (Microservices) لتسهيل إدارة الموارد الأكاديمية بسلاسة.",
      "project_biblio_desc": "نظام حديث ومتكامل لإدارة المكتبات وتتبع استعارة الكتب مع ميزة توثيق المستخدمين.",
      "project_ticket_desc": "منصة لحجز تذاكر الفعاليات والمؤتمرات مع تتبع مباشر للحجوزات المتاحة وبوابة دفع آمنة.",
      "project_portv1_desc": "موقعي الشخصي الأول لعرض المهارات والمشاريع الأولية في مسيرتي المهنية.",
      "project_ecom_desc": "منصة تجارة إلكترونية متطورة تتميز بسلة تسوق حديثة وبوابة دفع متكاملة.",
      "project_weather_desc": "تطبيق لعرض أحوال الطقس في الوقت الفعلي مع ميزة تحديد الموقع الجغرافي وتوقعات تفصيلية.",
      "project_task_desc": "أداة تعاونية لإدارة وجدولة المهام مع ميزات العمل الجماعي ونظام إشعارات ذكي.",

      // Testimonials Section
      "test_tag": "آراء عملائي",
      "test_title": "ماذا يقول العملاء عني؟",
      "test_subtitle": "شهادات وتوصيات أعتز بها من عملاء سعدت بالعمل معهم",
      "test1_text": "\"قدم سفيان موقعاً إلكترونياً استثنائياً لشركتنا. اهتمامه البالغ بالتفاصيل وخبرته التقنية العالية فاقت كل توقعاتنا. أنصح بشدة بالتعامل معه!\"",
      "test1_author": "محمد العلمي",
      "test1_role": "المدير التنفيذي لشركة TechStart",
      "test2_text": "\"العمل مع سفيان كان متعة حقيقية. لقد فهم متطلباتنا بدقة وقام بتسليم موقع ويب حديث، متجاوب، ونال إعجاب عملائنا بشدة.\"",
      "test2_author": "أسامة الملودي",
      "test2_role": "صديق وشريك أعمال",
      "test3_text": "\"مطور رائع بحق! ساعدتني دروس سفيان التعليمية في فهم تحليل الأسواق المالية والتريدينغ. قدرته الفريدة على تبسيط المفاهيم المعقدة مذهلة.\"",
      "test3_author": "يوسف عبيس",
      "test3_role": "طالب في التداول المالي",

      // Contact Section
      "contact_tag": "تواصل معي",
      "contact_title": "دعنا نتحدث",
      "contact_subtitle": "لنناقش معاً تفاصيل مشروعك القادم ونحوله لواقع",
      "contact_h3": "لنعمل معاً الآن",
      "contact_desc": "أنا منفتح دائماً لمناقشة المشاريع الجديدة، الأفكار الإبداعية، أو أي فرص للتعاون والمساهمة في تحقيق رؤيتك الرقمية.",
      "contact_form_name": "اسمك الكامل",
      "contact_form_email": "بريدك الإلكتروني",
      "contact_form_subject": "الموضوع",
      "contact_form_message": "نص الرسالة",
      "placeholder_name": "جون دو",
      "placeholder_email": "name@example.com",
      "placeholder_subject": "استفسار بخصوص مشروع جديد",
      "placeholder_message": "حدثني أكثر عن تفاصيل مشروعك...",
      "btn_send_msg": "إرسال الرسالة الآن",

      // Footer
      "footer_tagline": "مطور ويب متكامل وشغوف بالتحليل المالي والتداول",
      "footer_rights": "جميع الحقوق محفوظة.",
      "footer_quick": "روابط سريعة",
      "footer_services": "خدماتنا",
      "footer_info": "بيانات الاتصال",
      "footer_credits": "صمم وصنع بكل",
      "footer_by": "بواسطة سفيان الراحو",

      // Extra
      "email_copied": "تم نسخ البريد الإلكتروني بنجاح!",
      "val_all_fields": "يرجى ملء جميع الحقول المطلوبة",
      "val_valid_email": "يرجى إدخال بريد إلكتروني صحيح",
      "msg_sending": "جاري إرسال الرسالة...",
      "msg_sent_success": "تم إرسال رسالتك بنجاح! سأتصل بك في أقرب وقت.",
      "msg_sent_error": "عذراً، حدث خطأ ما أثناء محاولة إرسال الرسالة.",
      
      // Leave a Review
      "review_title": "اترك تقييمك",
      "review_subtitle": "رأيك وتجربتك تهماني ويسعدني مشاركتك لها",
      "review_form_name": "الاسم الكامل",
      "review_form_role": "صفتك أو شركتك",
      "review_form_rating": "تقييمك",
      "review_form_text": "نص التقييم",
      "review_btn_submit": "إرسال التقييم الآن",
      "review_success": "شكرًا جزيلًا لتقييمك الرائع!",
      "review_placeholder_name": "مثال: أحمد العلمي",
      "review_placeholder_role": "مثال: مدير شركة TechStart",
      "review_placeholder_text": "حدثني عن تجربتك في العمل والتعاون معي..."
    }
  },

  setLanguage(lang) {
    this.activeLang = lang;
    localStorage.setItem('portfolio_lang', lang);

    // Set HTML dir and lang attributes
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.add('rtl-layout');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
      document.body.classList.remove('rtl-layout');
    }

    // Translate DOM elements featuring data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (this.translations[lang] && this.translations[lang][key]) {
        // Handle input placeholders or standard text content
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = this.translations[lang][key];
        } else {
          element.textContent = this.translations[lang][key];
        }
      }
    });

    // Translate DOM element titles safely (prevents icon text overwriting)
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      if (this.translations[lang] && this.translations[lang][key]) {
        element.title = this.translations[lang][key];
      }
    });

    // Update active state in switcher UI
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Dispatch a global custom event for index.js typing effects or sliders updates
    const event = new CustomEvent('languageChanged', { detail: { lang: lang } });
    window.dispatchEvent(event);
    console.log(`Language changed to: ${lang}`);
  },

  init() {
    const savedLang = localStorage.getItem('portfolio_lang') || 'fr';
    this.setLanguage(savedLang);
  }
};

// Initialize translation engine on DOM loading
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  i18n.init();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
  });
}
