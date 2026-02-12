export type Language = 'el' | 'en';

export const translations = {
  el: {
    hero: {
      title: "Βρείτε Parking σε Πραγματικό Χρόνο στον Δρόμο",
      appStore: "App Store",
      googlePlay: "Google Play"
    },
    sections: {
      howItWorks: "Πώς Λειτουργεί",
      interactiveMap: "Διαδραστικός Χάρτης",
      features: "Βασικά Χαρακτηριστικά",
      pointsRewards: "Πόντοι & Ανταμοιβές",
      notifications: "Ειδοποιήσεις",
      settings: "Ρυθμίσεις",
      support: "Υποστήριξη"
    },
    map: {
      title: "Διαθεσιμότητα σε Πραγματικό Χρόνο",
      description: "Ο διαδραστικός χάρτης εμφανίζει διαθέσιμες θέσεις με χρωματικούς δείκτες:",
      smallSpots: "Μικρές θέσεις",
      mediumSpots: "Μεσαίες θέσεις",
      largeSpots: "Μεγάλες θέσεις"
    },
    points: {
      title: "Κερδίστε Ενώ Σταθμεύετε",
      description: "Μοιραστείτε τη θέση σας όταν φεύγετε και κερδίστε πόντους για δωρεάν κρατήσεις. Παρακολουθήστε την παγκόσμια κατάταξή σας.",
      pointPerRelease: "1 πόντος ανά απελευθέρωση θέσης",
      freeReservation: "Δωρεάν κράτηση κάθε 20 πόντους",
      globalRanking: "Παγκόσμια κατάταξη"
    },
    notifications: {
      title: "Μείνετε Ενημερωμένοι",
      description: "Λάβετε άμεσες ειδοποιήσεις για νέες θέσεις και πλοηγηθείτε απευθείας από τις ειδοποιήσεις.",
      instantAlerts: "Άμεσες ειδοποιήσεις διαθεσιμότητας",
      oneTapNav: "Πλοήγηση με ένα πάτημα",
      customPrefs: "Προσαρμοσμένες προτιμήσεις"
    },
    settings: {
      title: "Προσαρμόστε την Εμπειρία σας",
      description: "Προσαρμόστε τις ρυθμίσεις της εφαρμογής και παρακολουθήστε το ιστορικό στάθμευσης με λεπτομερή στατιστικά.",
      language: "Προτιμήσεις γλώσσας",
      notifications: "Διαχείριση ειδοποιήσεων",
      history: "Ιστορικό & στατιστικά"
    },
    support: {
      title: "Συχνές Ερωτήσεις",
      faq: [
        {
          question: "Η εφαρμογή λειτουργεί σε όλες τις πόλεις;",
          answer: "Ναι! Το T-Parking είναι διαθέσιμο σε πάνω από 100 πόλεις και συνεχώς επεκτείνεται."
        },
        {
          question: "Είναι ασφαλές να μοιράζομαι τη θέση μου;",
          answer: "Απόλυτα ασφαλές — η τοποθεσία σας προστατεύεται και η θέση μοιράζεται μόνο όταν την αφήνετε."
        },
        {
          question: "Ποιοι τύποι οχημάτων υποστηρίζονται;",
          answer: "Υποστηρίζονται όλα τα κοινά επιβατικά οχήματα."
        },
        {
          question: "Μπορώ να χρησιμοποιήσω την εφαρμογή χωρίς Internet;",
          answer: "Χρειάζεται σύνδεση στο Internet για live ενημέρωση θέσεων και πόντων."
        },
        {
          question: "Πώς επικοινωνώ με την υποστήριξη;",
          answer: "Στείλτε μας email στο devtaskhub@gmail.com"
        },
        {
          question: "Τι σημαίνουν τα χρώματα των θέσεων;",
          answer: "Κόκκινο = μικρή, Κίτρινο = μεσαία, Πράσινο = μεγάλη."
        },
        {
          question: "Πώς πηγαίνω σε μια θέση που βρήκα;",
          answer: "Πατήστε τη θέση στον χάρτη και μετά «Πλοήγηση». Θα ανοίξουν οδηγίες στην εφαρμογή χαρτών."
        },
        {
          question: "Πώς μοιράζομαι μία θέση στάθμευσης;",
          answer: "Επιλέξτε το μέγεθος της θέσης, πατήστε «Ξεπαρκάρω» και επιβεβαιώστε — η θέση μοιράζεται αυτόματα και κερδίζετε πόντους."
        }
      ]
    },
    cta: {
      title: "Ξεκινήστε Τώρα",
      subtitle: "Κατεβάστε την εφαρμογή και βρείτε parking σε πραγματικό χρόνο",
      downloadNow: "Κατεβάστε Τώρα",
      getStarted: "Ξεκινήστε",
      readyToStart: "Έτοιμοι να ξεκινήσετε;",
      joinCommunity: "Εγγραφείτε και γίνετε μέλος της κοινότητας μας",
      ctaTitle: "Μην Χάσετε Άλλο Χρόνο",
      ctaSubtitle: "Κατεβάστε την εφαρμογή τώρα και βρείτε parking σε δευτερόλεπτα"
    },
    testimonials: {
      title: "Τι Λένε οι Χρήστες μας",
      subtitle: "Εκατοντάδες οδηγοί εμπιστεύονται την T-Parking",
      user1: {
        name: "Μαρία Κ. — Αθήνα",
        location: "Αθήνα",
        text: "Ειλικρινά μου έχει λύσει τα χέρια. Παλιά έκανα κύκλους για ώρα μέχρι να βρω θέση· τώρα βρίσκω πολύ πιο γρήγορα και χωρίς άγχος.",
        image: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      user2: {
        name: "Νίκος Π. — Θεσσαλονίκη",
        location: "Θεσσαλονίκη",
        text: "Δεν το περίμενα ότι το σύστημα πόντων θα είναι τόσο χρήσιμο. Ήδη έχω κερδίσει δωρεάν κρατήσεις απλά χρησιμοποιώντας την εφαρμογή.",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      user3: {
        name: "Ελένη Δ. — Πάτρα",
        location: "Πάτρα",
        text: "Τα notifications όταν αδειάζει θέση είναι φοβερά. Έχω προλάβει parking που παλιά θα έχανα σίγουρα.",
        image: "https://randomuser.me/api/portraits/women/12.jpg"
      }
    },
    stats: {
      title: "Μας Εμπιστεύονται",
      items: [
        {
          number: "1000+",
          label: "Εγγεγραμμένοι Χρήστες"
        },
        {
          number: "100+",
          label: "Πόλεις"
        },
        {
          number: "65%",
          label: "Λιγότερος χρόνος αναζήτησης θέσης"
        },
        {
          number: "30%",
          label: "Λιγότερη κατανάλωση καυσίμου"
        }
      ]
    },
    footer: {
      quickLinks: "Γρήγοροι Σύνδεσμοι",
      legal: "Νομικά",
      contact: "Επικοινωνία",
      rights: "© 2025 T-Parking. Με επιφύλαξη παντός δικαιώματος.",
      home: "Αρχική",
      features: "Χαρακτηριστικά",
      plans: "Σχέδια",
      support: "Υποστήριξη",
      terms: "Όροι Χρήσης",
      privacy: {
        el: 'Πολιτική Απορρήτου',
        en: 'Privacy Policy'
      },
      cookies: {
        el: 'Cookies',
        en: 'Cookies'
      },
      email: "Email: support@t-parking.gr",
      phone: "Τηλέφωνο: +30 210 1234567"
    },
    features: {
      liveMap: {
        title: "Ζωντανός Χάρτης",
        description: "Δείτε διαθέσιμες θέσεις σε πραγματικό χρόνο με ενημερώσεις κάθε λεπτό"
      },
      instantReservations: {
        title: "Άμεσες Κρατήσεις",
        description: "Κρατήστε τη θέση σας με ένα πάτημα και πάρτε άμεση επιβεβαίωση"
      },
      shareEarn: {
        title: "Μοιραστείτε & Κερδίστε",
        description: "Κερδίστε πόντους όταν μοιράζεστε τη θέση σας με άλλους οδηγούς"
      },
      pointsSystem: {
        title: "Σύστημα Πόντων",
        description: "Συλλέξτε πόντους για δωρεάν κρατήσεις και προνομίες"
      },
      realTimeUpdates: {
        title: "Ενημερώσεις σε Πραγματικό Χρόνο",
        description: "Λάβετε άμεσες ειδοποιήσεις για νέες θέσεις και αλλαγές διαθεσιμότητας"
      },
      communityDriven: {
        title: "Κοινότητα",
        description: "Μέρος μιας μεγάλης κοινότητας οδηγών που βοηθούν ο ένας τον άλλο"
      }
    },
    steps: {
      openApp: {
        title: { el: 'Ανοίξτε την Εφαρμογή', en: 'Open the App' },
        description: { el: 'Κατεβάστε <span class="font-bold text-black">Δωρεάν</span> την εφαρμογή και δημιουργήστε λογαριασμό', en: 'Download the app for <span class="font-bold text-black">free</span> and create an account' },
      },
      findSpot: {
        title: { el: 'Περιηγηθείτε στον χάρτη', en: 'Browse the map' },
        description: { el: 'Χρησιμοποιήστε τον χάρτη για να βρείτε διαθέσιμες θέσεις κοντά σας', en: 'Use the map to find available spots near you' },
      },
      reserveOrShare: {
        title: { el: 'Βρίσκετε εύκολα parking!', en: 'You find parking easily!' },
        description: { el: 'Η εφαρμογή σε βοηθά να βρείτε θέση γρήγορα και εύκολα, χωρίς άγχος.', en: 'The app helps you find a spot quickly and easily, stress-free.' },
      },
    },
    smartSection: {
      title: 'Smart Parking Solution',
      elTitle: 'Η Έξυπνη Λύση για το Parking στην Πόλη',
      el: [
        'Η εφαρμογή προσφέρει άμεση πρόσβαση σε διαθέσιμες θέσεις στάθμευσης στον δρόμο, σε πραγματικό χρόνο.',
        'Μέσα από έναν διαδραστικό χάρτη, οι χρήστες μπορούν να δουν και να κρατήσουν θέση με ένα μόνο πάτημα.',
        'Το σύστημα πόντων επιβραβεύει τους οδηγούς που μοιράζονται τη θέση τους, ενισχύοντας την κοινότητα και διευκολύνοντας την εύρεση parking στις αστικές περιοχές.',
        'Επιπλέον, η εφαρμογή υπολογίζει τον χρόνο και τα χρήματα που εξοικονομεί κάθε χρήστης, προσφέροντας ξεκάθαρη εικόνα των καθημερινών οφελών.',
        'Ιδανική για καθημερινή χρήση, η εφαρμογή συνδυάζει ευκολία, αξιοπιστία και συνεργασία.'
      ],
      en: [
        'The app provides instant access to available on-street parking spots in real time.',
        'Through an interactive map, users can view and reserve parking spots with a single tap.',
        'The point-based system rewards drivers who share their spots, strengthening the community and making it easier to find parking in urban areas.',
        'Additionally, the app calculates the time and money each user saves, offering a clear picture of the daily benefits.',
        'Ideal for everyday use, the app combines convenience, reliability, and collaboration.'
      ]
    },
    terms: {
      title: {
        el: 'Όροι & Προϋποθέσεις – T-Parking',
        en: 'Terms & Conditions – T-Parking'
      },
      lastUpdated: {
        el: 'Τελευταία ενημέρωση: Ιούνιος 2024',
        en: 'Last updated: June 2024'
      },
      welcome: {
        el: 'Καλώς ήρθατε στο T-Parking, την έξυπνη εφαρμογή για εύρεση στάθμευσης σε πραγματικό χρόνο. Με τη χρήση της εφαρμογής, αποδέχεστε τους παρακάτω όρους χρήσης. Παρακαλούμε διαβάστε προσεκτικά.',
        en: 'Welcome to T-Parking, the smart app for real-time parking discovery. By using the app, you accept the following terms of use. Please read them carefully.'
      },
      acceptance: {
        title: {
          el: 'Αποδοχή Όρων',
          en: 'Acceptance of Terms'
        },
        content: {
          el: 'Με την πρόσβασή σας στο T-Parking, δηλώνετε ότι συμφωνείτε με τους παρόντες όρους. Εάν δεν συμφωνείτε, παρακαλούμε μην χρησιμοποιείτε την υπηρεσία.',
          en: 'By accessing T-Parking, you agree to these terms. If you do not agree, please do not use the service.'
        }
      },
      overview: {
        title: {
          el: '1. Τι προσφέρει η υπηρεσία',
          en: '1. What the service offers'
        },
        description: {
          el: 'Το T-Parking σας βοηθά να βρίσκετε, να κλείνετε και να μοιράζεστε θέσεις στάθμευσης εύκολα. Περιλαμβάνει:',
          en: 'T-Parking helps you find, reserve, and share parking spots easily. It includes:'
        },
        features: {
          el: [
            'Ζωντανό χάρτη',
            'Ειδοποιήσεις σε πραγματικό χρόνο',
            'Σύστημα πόντων & ανταμοιβών',
            'Δωρεάν, Premium & Platinum λειτουργίες',
            'Ιστορικό στάθμευσης και κοινοποιήσεων'
          ],
          en: [
            'Live map',
            'Real-time notifications',
            'Points & rewards system',
            'Free, Premium & Platinum features',
            'Parking and sharing history'
          ]
        }
      },
      registration: {
        title: {
          el: '2. Εγγραφή & Προσωπικός Λογαριασμός',
          en: '2. Registration & Personal Account'
        },
        content: {
          el: 'Απαιτείται δημιουργία λογαριασμού με έγκυρα στοιχεία. Είστε υπεύθυνοι για την ασφάλεια του λογαριασμού σας.',
          en: 'You are required to create an account with valid information. You are responsible for the security of your account.'
        }
      },
      acceptableUse: {
        title: {
          el: '3. Επιτρεπόμενη Χρήση',
          en: '3. Acceptable Use'
        },
        content: {
          el: 'Η χρήση της εφαρμογής επιτρέπεται μόνο για νόμιμους σκοπούς. Απαγορεύεται η παραπλανητική χρήση, παροχή ψευδών πληροφοριών ή παραβίαση δικαιωμάτων τρίτων.',
          en: 'The app may only be used for lawful purposes. Misleading use, providing false information, or violating third-party rights is strictly prohibited.'
        }
      },
      subscriptions: {
        title: {
          el: '4. Συνδρομές & Πληρωμές',
          en: '4. Subscriptions & Payments'
        },
        content: {
          el: 'Οι Premium και Platinum χρήστες αποκτούν πρόσβαση σε επιπλέον προνόμια (όπως προτεραιότητα στις κρατήσεις, δώρα, ειδοποιήσεις). Όροι πληρωμής/ακύρωσης περιγράφονται στη σελίδα τιμολόγησης. Η συνδρομή ακυρώνεται οποτεδήποτε.',
          en: 'Premium and Platinum users gain access to extra benefits (such as booking priority, rewards, notifications). Payment/cancellation terms are described on the pricing page. You can cancel your subscription at any time.'
        }
      },
      reservations: {
        title: {
          el: '5. Κρατήσεις & Σύστημα Πόντων',
          en: '5. Reservations & Points System'
        },
        content: {
          el: 'Οι Platinum χρήστες και όσοι διαθέτουν δωρεάν κράτηση μπορούν να δεσμεύσουν θέση. Για κάθε 30 επιβεβαιωμένες κοινοποιήσεις, κερδίζετε μία δωρεάν κράτηση. Οι πόντοι καθορίζουν στατιστικά, κατάταξη και προνόμια.',
          en: 'Platinum users and those with a free reservation can reserve a spot. For every 30 confirmed shares, you earn a free reservation. Points determine your stats, ranking, and privileges.'
        }
      },
      notifications: {
        title: {
          el: '6. Ειδοποιήσεις & Τοποθεσία',
          en: '6. Notifications & Location'
        },
        content: {
          el: 'Το T-Parking χρησιμοποιεί τα δεδομένα τοποθεσίας σας για να σας στέλνει ειδοποιήσεις σχετικά με διαθεσιμότητα. Μπορείτε να διαχειρίζεστε αυτές τις ρυθμίσεις από τη συσκευή σας.',
          en: 'T-Parking uses your location data to send you notifications about availability. You can manage these settings from your device.'
        }
      },
      history: {
        title: {
          el: '7. Ιστορικό Χρήσης',
          en: '7. Usage History'
        },
        content: {
          el: 'Καταγράφεται το ιστορικό των κρατήσεων και κοινοποιήσεων. Μπορείτε να το διαγράψετε όποτε το επιθυμείτε.',
          en: 'Your reservation and sharing history is recorded. You can delete it whenever you wish.'
        }
      },
      privacy: {
        title: {
          el: 'Πολιτική Απορρήτου',
          en: 'Privacy Policy'
        },
        intro: {
          el: 'Η προστασία των προσωπικών σας δεδομένων είναι προτεραιότητα για το T-Parking. Αυτή η πολιτική εξηγεί πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τις πληροφορίες σας.',
          en: 'Protecting your personal data is a priority for T-Parking. This policy explains how we collect, use, and protect your information.'
        },
        collectTitle: {
          el: 'Πληροφορίες που Συλλέγουμε',
          en: 'Information We Collect'
        },
        collect: {
          el: [
            'Στοιχεία λογαριασμού (όνομα, email, τηλέφωνο)',
            'Δεδομένα τοποθεσίας',
            'Ιστορικό στάθμευσης',
            'Στατιστικά χρήσης',
            'Πληροφορίες συσκευής'
          ],
          en: [
            'Account information (name, email, phone)',
            'Location data',
            'Parking history',
            'Usage statistics',
            'Device information'
          ]
        },
        usageTitle: {
          el: 'Πώς Χρησιμοποιούμε τις Πληροφορίες',
          en: 'How We Use Information'
        },
        usage: {
          el: [
            'Παροχή υπηρεσιών στάθμευσης',
            'Βελτίωση της εφαρμογής',
            'Αποστολή ειδοποιήσεων',
            'Ανάλυση χρήσης',
            'Εξατομικοποίηση εμπειρίας'
          ],
          en: [
            'Providing parking services',
            'Improving the app',
            'Sending notifications',
            'Usage analysis',
            'Personalizing experience'
          ]
        },
        shareTitle: {
          el: 'Κοινή Χρήση Πληροφοριών',
          en: 'Information Sharing'
        },
        share: {
          el: [
            'Μόνο με τη συγκατάθεσή σας',
            'Με παρόχους υπηρεσιών',
            'Για νομικές υποχρεώσεις',
            'Για την ασφάλεια των χρηστών'
          ],
          en: [
            'Only with your consent',
            'With service providers',
            'For legal obligations',
            'For user safety'
          ]
        },
        securityTitle: {
          el: 'Ασφάλεια Δεδομένων',
          en: 'Data Security'
        },
        security: {
          el: 'Χρησιμοποιούμε κρυπτογράφηση και άλλα μέτρα ασφαλείας για την προστασία των δεδομένων σας. Ωστόσο, καμία μέθοδος μετάδοσης στο διαδίκτυο δεν είναι 100% ασφαλής.',
          en: 'We use encryption and other security measures to protect your data. However, no method of transmission over the internet is 100% secure.'
        },
        rightsTitle: {
          el: 'Δικαιώματα Χρηστών',
          en: 'User Rights'
        },
        rights: {
          el: [
            'Πρόσβαση στα δεδομένα σας',
            'Διόρθωση ανακριβών πληροφοριών',
            'Διαγραφή δεδομένων',
            'Εξαγωγή δεδομένων',
            'Αντίρρηση στην επεξεργασία'
          ],
          en: [
            'Access your data',
            'Correct inaccurate information',
            'Delete your data',
            'Export your data',
            'Object to processing'
          ]
        },
        rightsContact: {
          el: 'Για να ασκήσετε τα δικαιώματά σας, επικοινωνήστε στο privacy@t-parking.gr',
          en: 'To exercise your rights, contact privacy@t-parking.gr'
        },
        retentionTitle: {
          el: 'Διάρκεια Διατήρησης',
          en: 'Data Retention'
        },
        retention: {
          el: 'Διατηρούμε τα δεδομένα σας μόνο για όσο χρόνο είναι απαραίτητο για τους σκοπούς που συλλέχθηκαν, εκτός αν απαιτείται διατήρηση για νομικούς λόγους.',
          en: 'We retain your data only for as long as necessary for the purposes collected, unless retention is required for legal reasons.'
        },
        changesTitle: {
          el: 'Αλλαγές στην Πολιτική',
          en: 'Policy Changes'
        },
        changes: {
          el: 'Μπορούμε να ενημερώσουμε αυτή την πολιτική. Οι σημαντικές αλλαγές θα ανακοινωθούν μέσω της εφαρμογής.',
          en: 'We may update this policy. Significant changes will be announced through the app.'
        },
        contactTitle: {
          el: 'Επικοινωνία',
          en: 'Contact'
        },
        contact: {
          el: 'Για ερωτήσεις σχετικά με την πολιτική απορρήτου, επικοινωνήστε στο privacy@t-parking.gr',
          en: 'For questions about this privacy policy, contact privacy@t-parking.gr'
        }
      },
      liability: {
        title: {
          el: '9. Περιορισμός Ευθύνης',
          en: '9. Limitation of Liability'
        },
        content: {
          el: 'Το T-Parking παρέχεται "ως έχει". Ο πάροχος δεν ευθύνεται για ζημιές ή απώλειες που προκύπτουν από τη χρήση της υπηρεσίας (π.χ. κρατήσεις, ειδοποιήσεις, καθυστερήσεις).',
          en: 'T-Parking is provided "as is." The provider is not liable for any damages or losses arising from the use of the service (e.g. reservations, notifications, delays).'
        }
      },
      modifications: {
        title: {
          el: '10. Τροποποιήσεις Όρων',
          en: '10. Modifications of Terms'
        },
        content: {
          el: 'Οι όροι χρήσης ενδέχεται να αλλάξουν. Οι αλλαγές θα ανακοινώνονται μέσα από την εφαρμογή.',
          en: 'The terms of use may change. Changes will be announced through the app.'
        }
      },
      termination: {
        title: {
          el: '11. Τερματισμός Πρόσβασης',
          en: '11. Termination of Access'
        },
        content: {
          el: 'Σε περίπτωση παραβίασης των όρων, η πρόσβασή σας μπορεί να διακοπεί ή να περιοριστεί χωρίς προειδοποίηση.',
          en: 'In case of violation of the terms, your access may be suspended or restricted without notice.'
        }
      },
      support: {
        title: {
          el: '12. Υποστήριξη',
          en: '12. Support'
        },
        content: {
          el: 'Για απορίες ή τεχνική βοήθεια, επικοινωνήστε στο: support@t-parking.gr',
          en: 'For questions or technical support, contact: support@t-parking.gr'
        }
      },
      googleSignIn: {
        title: {
          el: '13. Είσοδος μέσω Google',
          en: '13. Google Sign-in'
        },
        content: {
          el: 'Αν επιλέξετε να συνδεθείτε μέσω Google, αποδέχεστε αυτόματα και τους όρους χρήσης της Google, εκτός από τους παρόντες.',
          en: "If you choose to sign in via Google, you automatically accept Google's terms of use in addition to these terms."
        }
      },
      privacyProtection: {
        title: {
          el: '8. Προστασία Προσωπικών Δεδομένων',
          en: '8. Personal Data Protection'
        },
        content: {
          el: 'Η επεξεργασία προσωπικών δεδομένων γίνεται σύμφωνα με την Πολιτική Απορρήτου. Χρησιμοποιώντας την εφαρμογή, συναινείτε στη συλλογή και χρήση των στοιχείων σας.',
          en: 'Personal data is processed in accordance with the Privacy Policy. By using the app, you consent to the collection and use of your information.'
        }
      }
    },
    cookies: {
      title: {
        el: 'Πολιτική Cookies',
        en: 'Cookies Policy'
      },
      intro: {
        el: 'Η ιστοσελίδα μας χρησιμοποιεί cookies για να βελτιώσει την εμπειρία χρήστη και να συλλέξει ανώνυμα στατιστικά στοιχεία.',
        en: 'Our website uses cookies to improve user experience and collect anonymous statistics.'
      },
      whatAreCookiesTitle: {
        el: 'Τι είναι τα Cookies;',
        en: 'What are Cookies?'
      },
      whatAreCookies: {
        el: 'Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στον υπολογιστή ή στη συσκευή σας όταν επισκέπτεστε μια ιστοσελίδα. Χρησιμοποιούνται για να βελτιώσουν την εμπειρία χρήστη, να αποθηκεύσουν προτιμήσεις και να συλλέξουν ανώνυμα στατιστικά στοιχεία.',
        en: 'Cookies are small text files stored on your computer or device when you visit a website. They are used to improve user experience, store preferences, and collect anonymous statistics.'
      },
      usageTitle: {
        el: 'Πώς χρησιμοποιούμε τα Cookies;',
        en: 'How do we use Cookies?'
      },
      usage: {
        el: [
          'Λειτουργικότητα: Για να θυμόμαστε τις προτιμήσεις σας και να βελτιώσουμε την πλοήγηση.',
          'Ανάλυση: Για να συλλέγουμε ανώνυμα δεδομένα σχετικά με τη χρήση της ιστοσελίδας μέσω εργαλείων όπως το Google Analytics.',
          'Διαφήμιση: Για να προσαρμόζουμε διαφημίσεις σύμφωνα με τα ενδιαφέροντά σας (αν εφαρμόζεται).'
        ],
        en: [
          'Functionality: To remember your preferences and improve navigation.',
          'Analytics: To collect anonymous data about website usage via tools like Google Analytics.',
          'Advertising: To tailor ads according to your interests (if applicable).'
        ]
      },
      typesTitle: {
        el: 'Τύποι Cookies που χρησιμοποιούμε',
        en: 'Types of Cookies we use'
      },
      types: {
        el: [
          'Απαραίτητα Cookies: Βασικά για τη λειτουργία της ιστοσελίδας και την ασφάλειά της. Δεν μπορούν να απενεργοποιηθούν.',
          'Λειτουργικά Cookies: Βοηθούν στην αποθήκευση επιλογών και προτιμήσεων (π.χ. γλώσσα).',
          'Cookies Ανάλυσης: Συλλέγουν πληροφορίες για το πώς οι επισκέπτες χρησιμοποιούν την ιστοσελίδα ώστε να τη βελτιώνουμε.',
          'Διαφημιστικά Cookies: Χρησιμοποιούνται για στόχευση διαφημίσεων βάσει της συμπεριφοράς σας.'
        ],
        en: [
          'Necessary Cookies: Essential for the operation and security of the website. Cannot be disabled.',
          'Functional Cookies: Help store choices and preferences (e.g. language).',
          'Analytics Cookies: Collect information on how visitors use the website to help us improve it.',
          'Advertising Cookies: Used for ad targeting based on your behavior.'
        ]
      },
      managementTitle: {
        el: 'Διαχείριση Cookies',
        en: 'Managing Cookies'
      },
      management: {
        el: 'Μπορείτε να διαχειριστείτε ή να απενεργοποιήσετε τα cookies μέσω των ρυθμίσεων του browser σας. Λάβετε υπόψη ότι η απενεργοποίηση ορισμένων cookies μπορεί να επηρεάσει τη λειτουργικότητα της ιστοσελίδας.',
        en: 'You can manage or disable cookies through your browser settings. Note that disabling some cookies may affect the functionality of the website.'
      },
      consentTitle: {
        el: 'Συγκατάθεση',
        en: 'Consent'
      },
      consent: {
        el: 'Συνεχίζοντας να χρησιμοποιείτε την ιστοσελίδα μας χωρίς να αλλάξετε τις ρυθμίσεις cookies, συμφωνείτε με τη χρήση τους σύμφωνα με την παρούσα πολιτική.',
        en: 'By continuing to use our website without changing your cookie settings, you agree to their use according to this policy.'
      }
    },
    privacyPolicy: {
      title: {
        el: 'Πολιτική Απορρήτου - T-Parking',
        en: 'Privacy Policy - T-Parking'
      },
      lastUpdated: {
        el: 'Τελευταία Ενημέρωση: 7 Δεκεμβρίου 2025',
        en: 'Last Updated: December 7, 2025'
      },
      introduction: {
        el: 'Καλώς ήρθατε στο T-Parking. Η παρούσα Πολιτική Απορρήτου περιγράφει τον τρόπο με τον οποίο συλλέγουμε, χρησιμοποιούμε, αποθηκεύουμε και προστατεύουμε τα προσωπικά σας δεδομένα κατά τη χρήση της εφαρμογής μας. Παρακαλούμε διαβάστε προσεκτικά αυτή την πολιτική απορρήτου πριν από τη χρήση της εφαρμογής. Η παρούσα πολιτική απορρήτου συντάχθηκε σύμφωνα με τον Κανονισμό (ΕΕ) 2016/679 για την Προστασία των Προσωπικών Δεδομένων (GDPR) και το Ελληνικό νόμο 4624/2019.',
        en: 'Welcome to T-Parking. This Privacy Policy describes how we collect, use, store, and protect your personal data when using our application. Please read this privacy policy carefully before using the application. This privacy policy was drafted in accordance with Regulation (EU) 2016/679 on the Protection of Personal Data (GDPR) and Greek Law 4624/2019.'
      },
      dataController: {
        title: {
          el: '2. Διαχειριστής Δεδομένων (Data Controller)',
          en: '2. Data Controller'
        },
        controller: {
          el: 'Διαχειριστής Δεδομένων:',
          en: 'Data Controller:'
        },
        company: {
          el: 'T-Parking',
          en: 'T-Parking'
        },
        email: {
          el: 'Email:',
          en: 'Email:'
        },
        emailValue: {
          el: 'devtaskhub@gmail.com',
          en: 'devtaskhub@gmail.com'
        },
        support: {
          el: 'Υποστήριξη:',
          en: 'Support:'
        },
        contact: {
          el: 'Για οποιαδήποτε ερώτηση, αίτημα άσκησης δικαιωμάτων ή καταγγελία σχετικά με την επεξεργασία των προσωπικών σας δεδομένων, μπορείτε να επικοινωνήσετε μαζί μας στο παραπάνω email. Έχετε επίσης το δικαίωμα να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ) στη διεύθυνση: www.dpa.gr ή dpa@dpa.gr',
          en: 'For any questions, requests to exercise rights, or complaints regarding the processing of your personal data, you can contact us at the above email. You also have the right to file a complaint with the Hellenic Data Protection Authority (HDPA) at: www.dpa.gr or dpa@dpa.gr'
        }
      },
      personalData: {
        title: {
          el: '3. Προσωπικά Δεδομένα που Συλλέγονται (Άρθρο 13 GDPR)',
          en: '3. Personal Data Collected (Article 13 GDPR)'
        },
        intro: {
          el: 'Συλλέγουμε και επεξεργαζόμαστε τα ακόλουθα προσωπικά δεδομένα σας:',
          en: 'We collect and process the following personal data:'
        },
        registrationTitle: {
          el: '3.1 Δεδομένα Εγγραφής και Λογαριασμού',
          en: '3.1 Registration and Account Data'
        },
        registration: {
          el: [
            'Ονοματεπώνυμο (πλήρες όνομα)',
            'Διεύθυνση Email',
            'Κωδικός πρόσβασης (αποθηκευμένος με κρυπτογράφηση)'
          ],
          en: [
            'Full name',
            'Email address',
            'Password (stored encrypted)'
          ]
        },
        locationTitle: {
          el: '3.2 Δεδομένα Τοποθεσίας (GPS)',
          en: '3.2 Location Data (GPS)'
        },
        location: {
          el: [
            'Συντεταγμένες GPS (latitude, longitude) σε πραγματικό χρόνο όταν η εφαρμογή είναι ενεργή',
            'Χρονική σήμανση των δεδομένων τοποθεσίας',
            'Δεδομένα θέσης στάθμευσης που μοιράζεστε ή κάνετε reserve'
          ],
          en: [
            'GPS coordinates (latitude, longitude) in real-time when the app is active',
            'Timestamp of location data',
            'Parking location data that you share or reserve'
          ]
        },
        locationNote: {
          el: 'Σημείωση: Τα δεδομένα τοποθεσίας δεν αποθηκεύονται μακροπρόθεσμα και διαγράφονται άμεσα μετά τη χρήση τους, εκτός εάν είναι απαραίτητα για την παροχή της υπηρεσίας (π.χ. ενεργή κράτηση θέσης).',
          en: 'Note: Location data is not stored long-term and is deleted immediately after use, unless necessary for service provision (e.g., active spot reservation).'
        },
        usageTitle: {
          el: '3.3 Δεδομένα Χρήσης',
          en: '3.3 Usage Data'
        },
        usage: {
          el: [
            'Ιστορικό κοινοποίησης θέσεων (parking spots που έχετε μοιραστεί)',
            'Κρατήσεις θέσεων (reservations)',
            'Πόντοι και βαθμολογία (points, scores, rankings)',
            'Στατιστικά χρήσης (χρόνος εξοικονόμησης, χρήματα εξοικονόμησης)',
            'Ιστορικό κινήσεων'
          ],
          en: [
            'Parking spot sharing history (spots you have shared)',
            'Spot reservations',
            'Points and scores (points, scores, rankings)',
            'Usage statistics (time saved, money saved)',
            'Movement history'
          ]
        },
        deviceTitle: {
          el: '3.4 Δεδομένα Συσκευής',
          en: '3.4 Device Data'
        },
        device: {
          el: [
            'Τύπος συσκευής (κινητό, tablet)',
            'Λειτουργικό σύστημα (iOS, Android)',
            'Αναγνωριστικό συσκευής (device identifier)',
            'Έκδοση εφαρμογής'
          ],
          en: [
            'Device type (mobile, tablet)',
            'Operating system (iOS, Android)',
            'Device identifier',
            'App version'
          ]
        },
        cookiesTitle: {
          el: '3.5 Δεδομένα Cookies και Analytics',
          en: '3.5 Cookies and Analytics Data'
        },
        cookies: {
          el: [
            'Cookies για την αποθήκευση προτιμήσεων (γλώσσα, ρυθμίσεις)',
            'Analytics data για ανάλυση χρήσης (προαιρετικά, με συναίνεση)'
          ],
          en: [
            'Cookies for storing preferences (language, settings)',
            'Analytics data for usage analysis (optional, with consent)'
          ]
        },
        notificationsTitle: {
          el: '3.6 Δεδομένα Ειδοποιήσεων',
          en: '3.6 Notification Data'
        },
        notifications: {
          el: [
            'Push notification tokens για αποστολή ειδοποιήσεων',
            'Προτιμήσεις ειδοποιήσεων (ενεργές/απενεργές)'
          ],
          en: [
            'Push notification tokens for sending notifications',
            'Notification preferences (active/inactive)'
          ]
        },
        contactsTitle: {
          el: '3.7 Δεδομένα Επαφών/Φίλων (εάν υπάρχει λειτουργικότητα)',
          en: '3.7 Contacts/Friends Data (if functionality exists)'
        },
        contacts: {
          el: [
            'Λίστα φίλων/επαφών (εάν χρησιμοποιείτε τη λειτουργικότητα προτεραιότητας φίλων)'
          ],
          en: [
            'Friends/contacts list (if you use the friend priority functionality)'
          ]
        },
        importantNotes: {
          el: [
            'Δεν συλλέγουμε ή επεξεργαζόμαστε "ειδικές κατηγορίες" προσωπικών δεδομένων όπως ορίζονται στο Άρθρο 9 GDPR (δεδομένα που αποκαλύπτουν φυλετική ή εθνοτική καταγωγή, πολιτικές απόψεις, θρησκευτικές ή φιλοσοφικές πεποιθήσεις, δεδομένα υγείας, βιομετρικά δεδομένα, κ.ά.)',
            'Δεν συλλέγουμε ή επεξεργαζόμαστε δεδομένα πληρωμών - η εφαρμογή είναι 100% δωρεάν και δεν διαθέτει premium, platinum ή άλλα subscriptions με πληρωμή'
          ],
          en: [
            'We do not collect or process "special categories" of personal data as defined in Article 9 GDPR (data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, health data, biometric data, etc.)',
            'We do not collect or process payment data - the app is 100% free and does not have premium, platinum, or other paid subscriptions'
          ]
        }
      },
      legalBasis: {
        title: {
          el: '4. Νομική Βάση Επεξεργασίας (Άρθρο 6 GDPR)',
          en: '4. Legal Basis for Processing (Article 6 GDPR)'
        },
        intro: {
          el: 'Η επεξεργασία των προσωπικών σας δεδομένων βασίζεται στις ακόλουθες νομικές βάσεις:',
          en: 'The processing of your personal data is based on the following legal bases:'
        },
        contractTitle: {
          el: '4.1 Εκτέλεση Συμβολαίου (Contract Performance)',
          en: '4.1 Contract Performance'
        },
        contract: {
          el: [
            'Παροχή βασικών υπηρεσιών της εφαρμογής (εύρεση θέσεων, κρατήσεις, πλοήγηση)',
            'Διαχείριση λογαριασμού (εγγραφή, είσοδος, διαχείριση προφίλ)',
            'Επεξεργασία κρατήσεων και συστήματος πόντων'
          ],
          en: [
            'Providing basic app services (finding spots, reservations, navigation)',
            'Account management (registration, login, profile management)',
            'Processing reservations and points system'
          ]
        },
        consentTitle: {
          el: '4.2 Συναίνεση (Consent)',
          en: '4.2 Consent'
        },
        consent: {
          el: [
            'Marketing communications (εάν συναινείτε)',
            'Analytics data (προαιρετικά, με συναίνεση)',
            'Push notifications (με συναίνεση)'
          ],
          en: [
            'Marketing communications (if you consent)',
            'Analytics data (optional, with consent)',
            'Push notifications (with consent)'
          ]
        },
        legitimateTitle: {
          el: '4.3 Νόμιμο Συμφέρον (Legitimate Interest)',
          en: '4.3 Legitimate Interest'
        },
        legitimate: {
          el: [
            'Βελτίωση της εφαρμογής (ανάλυση χρήσης, στατιστικά)',
            'Ασφάλεια και πρόληψη απάτης (detection και prevention fraud)',
            'Τεχνική συντήρηση και ανάπτυξη νέων λειτουργιών'
          ],
          en: [
            'Improving the app (usage analysis, statistics)',
            'Security and fraud prevention (fraud detection and prevention)',
            'Technical maintenance and development of new features'
          ]
        },
        legalTitle: {
          el: '4.4 Νομική Υποχρέωση (Legal Obligation)',
          en: '4.4 Legal Obligation'
        },
        legal: {
          el: [
            'Συμμόρφωση με νόμους και κανονισμούς (περιλαμβανομένου του GDPR)',
            'Διατήρηση δεδομένων για λογιστικούς/φορολογικούς σκοπούς (εάν απαιτείται)'
          ],
          en: [
            'Compliance with laws and regulations (including GDPR)',
            'Data retention for accounting/tax purposes (if required)'
          ]
        }
      },
      processingPurpose: {
        title: {
          el: '5. Σκοπός Επεξεργασίας',
          en: '5. Purpose of Processing'
        },
        intro: {
          el: 'Τα προσωπικά σας δεδομένα επεξεργάζονται για τους ακόλουθους σκοπούς:',
          en: 'Your personal data is processed for the following purposes:'
        },
        servicesTitle: {
          el: '5.1 Παροχή και Βελτίωση Υπηρεσιών',
          en: '5.1 Service Provision and Improvement'
        },
        services: {
          el: [
            'Εντοπισμός και εμφάνιση διαθέσιμων θέσεων στάθμευσης σε πραγματικό χρόνο',
            'Παροχή πλοήγησης προς τις θέσεις στάθμευσης (μέσω Google Maps)',
            'Επεξεργασία κρατήσεων θέσεων',
            'Διαχείριση συστήματος πόντων και επιβραβεύσεων'
          ],
          en: [
            'Identifying and displaying available parking spots in real-time',
            'Providing navigation to parking spots (via Google Maps)',
            'Processing spot reservations',
            'Managing points system and rewards'
          ]
        },
        communicationTitle: {
          el: '5.2 Επικοινωνία με Χρήστες',
          en: '5.2 User Communication'
        },
        communication: {
          el: [
            'Αποστολή ειδοποιήσεων για κοντινές διαθέσιμες θέσεις',
            'Ενημέρωση για αλλαγές στους όρους ή τις πολιτικές μας',
            'Απάντηση σε αιτήματα υποστήριξης'
          ],
          en: [
            'Sending notifications for nearby available spots',
            'Notifying about changes to our terms or policies',
            'Responding to support requests'
          ]
        },
        analysisTitle: {
          el: '5.3 Ανάλυση και Βελτίωση',
          en: '5.3 Analysis and Improvement'
        },
        analysis: {
          el: [
            'Ανάλυση χρήσης για βελτίωση της εφαρμογής',
            'Ανάπτυξη νέων λειτουργιών',
            'Παροχή στατιστικών και αναφορών'
          ],
          en: [
            'Usage analysis to improve the app',
            'Development of new features',
            'Providing statistics and reports'
          ]
        },
        securityTitle: {
          el: '5.4 Ασφάλεια και Πρόληψη Απάτης',
          en: '5.4 Security and Fraud Prevention'
        },
        security: {
          el: [
            'Ανίχνευση και πρόληψη αθέμιτης χρήσης',
            'Προστασία της ασφάλειας των χρηστών',
            'Διασφάλιση της ακεραιότητας της εφαρμογής'
          ],
          en: [
            'Detecting and preventing misuse',
            'Protecting user security',
            'Ensuring app integrity'
          ]
        },
        complianceTitle: {
          el: '5.5 Συμμόρφωση με Νομικές Υποχρεώσεις',
          en: '5.5 Compliance with Legal Obligations'
        },
        compliance: {
          el: [
            'Συμμόρφωση με το GDPR και άλλους εφαρμοστέους νόμους',
            'Ανταπόκριση σε νομικές απαιτήσεις και διαταγές'
          ],
          en: [
            'Compliance with GDPR and other applicable laws',
            'Responding to legal requirements and orders'
          ]
        },
        realTimeTitle: {
          el: '5.6 Παροχή Υπηρεσιών σε Πραγματικό Χρόνο',
          en: '5.6 Real-Time Service Provision'
        },
        realTime: {
          el: [
            'Όλες οι ενημερώσεις για διαθέσιμες θέσεις στάθμευσης παρέχονται αμέσως σε πραγματικό χρόνο χωρίς καθυστερήσεις',
            'Όλα τα features είναι 100% δωρεάν και διαθέσιμα σε όλους τους χρήστες'
          ],
          en: [
            'All updates on available parking spots are provided immediately in real-time without delays',
            'All features are 100% free and available to all users'
          ]
        }
      },
      userRights: {
        title: {
          el: '6. Δικαιώματα Χρήστη (Άρθρα 15-22 GDPR)',
          en: '6. User Rights (Articles 15-22 GDPR)'
        },
        intro: {
          el: 'Έχετε τα ακόλουθα δικαιώματα σχετικά με τα προσωπικά σας δεδομένα:',
          en: 'You have the following rights regarding your personal data:'
        },
        accessTitle: {
          el: '6.1 Δικαίωμα Πρόσβασης (Right of Access - Άρθρο 15)',
          en: '6.1 Right of Access (Article 15)'
        },
        access: {
          el: 'Μπορείτε να ζητήσετε αντίγραφο των προσωπικών σας δεδομένων που διατηρούμε.',
          en: 'You can request a copy of the personal data we hold about you.'
        },
        rectificationTitle: {
          el: '6.2 Δικαίωμα Διόρθωσης (Right to Rectification - Άρθρο 16)',
          en: '6.2 Right to Rectification (Article 16)'
        },
        rectification: {
          el: 'Μπορείτε να ζητήσετε διόρθωση ανακριβών ή ελλιπών δεδομένων.',
          en: 'You can request correction of inaccurate or incomplete data.'
        },
        erasureTitle: {
          el: '6.3 Δικαίωμα Διαγραφής / "Δικαίωμα στη Λήθη" (Right to Erasure - Άρθρο 17)',
          en: '6.3 Right to Erasure / "Right to be Forgotten" (Article 17)'
        },
        erasure: {
          el: 'Μπορείτε να ζητήσετε τη διαγραφή των προσωπικών σας δεδομένων, εφόσον:',
          en: 'You can request deletion of your personal data, provided that:'
        },
        erasureConditions: {
          el: [
            'Τα δεδομένα δεν είναι πλέον απαραίτητα για τους αρχικούς σκοπούς',
            'Ανακαλείτε τη συναίνεσή σας και δεν υπάρχει άλλη νομική βάση',
            'Τα δεδομένα έχουν επεξεργαστεί παράνομα'
          ],
          en: [
            'The data is no longer necessary for the original purposes',
            'You withdraw your consent and there is no other legal basis',
            'The data has been processed unlawfully'
          ]
        },
        restrictionTitle: {
          el: '6.4 Δικαίωμα Περιορισμού Επεξεργασίας (Right to Restriction - Άρθρο 18)',
          en: '6.4 Right to Restriction of Processing (Article 18)'
        },
        restriction: {
          el: 'Μπορείτε να ζητήσετε περιορισμό της επεξεργασίας των δεδομένων σας.',
          en: 'You can request restriction of processing of your data.'
        },
        portabilityTitle: {
          el: '6.5 Δικαίωμα Φορητότητας Δεδομένων (Right to Data Portability - Άρθρο 20)',
          en: '6.5 Right to Data Portability (Article 20)'
        },
        portability: {
          el: 'Μπορείτε να λάβετε τα δεδομένα σας σε δομημένη, ευρέως χρησιμοποιούμενη μορφή.',
          en: 'You can receive your data in a structured, commonly used format.'
        },
        objectTitle: {
          el: '6.6 Δικαίωμα Εναντίωσης (Right to Object - Άρθρο 21)',
          en: '6.6 Right to Object (Article 21)'
        },
        object: {
          el: 'Μπορείτε να αντιταχθείτε στην επεξεργασία των δεδομένων σας για σκοπούς νόμιμου συμφέροντος.',
          en: 'You can object to the processing of your data for legitimate interest purposes.'
        },
        withdrawTitle: {
          el: '6.7 Δικαίωμα Ανάκλησης Συναίνεσης (Right to Withdraw Consent - Άρθρο 7)',
          en: '6.7 Right to Withdraw Consent (Article 7)'
        },
        withdraw: {
          el: 'Μπορείτε να ανακαλέσετε τη συναίνεσή σας οποιαδήποτε στιγμή, χωρίς να επηρεάζεται η νομιμότητα της προηγούμενης επεξεργασίας.',
          en: 'You can withdraw your consent at any time, without affecting the lawfulness of prior processing.'
        },
        howToExerciseTitle: {
          el: '6.8 Πώς να Ασκηθείτε τα Δικαιώματά σας',
          en: '6.8 How to Exercise Your Rights'
        },
        howToExercise: {
          el: 'Για να ασκήσετε οποιοδήποτε από τα παραπάνω δικαιώματα, επικοινωνήστε μαζί μας στο: devtaskhub@gmail.com. Θα απαντήσουμε στο αίτημά σας εντός 30 ημερών (ή 90 ημερών σε περίπλοκες περιπτώσεις, με προηγούμενη ειδοποίηση).',
          en: 'To exercise any of the above rights, contact us at: devtaskhub@gmail.com. We will respond to your request within 30 days (or 90 days in complex cases, with prior notice).'
        }
      },
      dataRetention: {
        title: {
          el: '7. Διατήρηση Δεδομένων',
          en: '7. Data Retention'
        },
        intro: {
          el: 'Διατηρούμε τα προσωπικά σας δεδομένα μόνο για όσο χρόνο είναι απαραίτητος για τους σκοπούς που συλλέχθηκαν ή όπως απαιτείται από το νόμο.',
          en: 'We retain your personal data only for as long as necessary for the purposes collected or as required by law.'
        },
        policyTitle: {
          el: '7.1 Πολιτική Διατήρησης',
          en: '7.1 Retention Policy'
        },
        accountData: {
          el: 'Δεδομένα Λογαριασμού: Διατηρούνται για όσο διάστημα είναι ενεργός ο λογαριασμός σας. Μετά τη διαγραφή του λογαριασμού, τα δεδομένα διαγράφονται εντός 30 ημερών (εκτός εάν απαιτείται διατήρηση από το νόμο)',
          en: 'Account Data: Retained for as long as your account is active. After account deletion, data is deleted within 30 days (unless retention is required by law)'
        },
        historyData: {
          el: 'Ιστορικό Κοινοποίησης/Κρατήσεων: Διατηρείται για 6 μήνες μετά την τελευταία δραστηριότητα',
          en: 'Sharing/Reservation History: Retained for 6 months after last activity'
        },
        locationData: {
          el: 'Δεδομένα Τοποθεσίας (GPS): Διαγράφονται άμεσα μετά τη χρήση. Δεδομένα ενεργών κρατήσεων διατηρούνται για όσο διαρκεί η κράτηση (μέχρι 2 ώρες) και διαγράφονται μετά τη λήξη. Όλες οι ενημερώσεις παρέχονται σε πραγματικό χρόνο - δεν υπάρχουν καθυστερήσεις',
          en: 'Location Data (GPS): Deleted immediately after use. Active reservation data is retained for the duration of the reservation (up to 2 hours) and deleted after expiration. All updates are provided in real-time - there are no delays'
        },
        analyticsData: {
          el: 'Analytics Data: Διατηρούνται για 24 μήνες',
          en: 'Analytics Data: Retained for 24 months'
        },
        paymentData: {
          el: 'Δεδομένα Πληρωμών: Δεν συλλέγονται - η εφαρμογή είναι 100% δωρεάν',
          en: 'Payment Data: Not collected - the app is 100% free'
        },
        cookiesData: {
          el: 'Cookies: Session cookies διαγράφονται με το κλείσιμο του browser. Persistent cookies διαγράφονται μετά από 12 μήνες',
          en: 'Cookies: Session cookies are deleted when the browser closes. Persistent cookies are deleted after 12 months'
        },
        contactsData: {
          el: 'Δεδομένα Επαφών/Φίλων: Διατηρούνται για όσο ο λογαριασμός σας είναι ενεργός',
          en: 'Contacts/Friends Data: Retained for as long as your account is active'
        },
        afterDeletionTitle: {
          el: '7.2 Διαγραφή μετά τη Διαγραφή Λογαριασμού',
          en: '7.2 Deletion After Account Deletion'
        },
        afterDeletion: {
          el: 'Μετά τη διαγραφή του λογαριασμού σας: Όλα τα προσωπικά δεδομένα διαγράφονται εντός 30 ημερών. Τα anonymized/aggregated δεδομένα μπορεί να διατηρηθούν για στατιστικούς σκοπούς (χωρίς προσωπική ταυτοποίηση).',
          en: 'After deletion of your account: All personal data is deleted within 30 days. Anonymized/aggregated data may be retained for statistical purposes (without personal identification).'
        }
      },
      thirdParties: {
        title: {
          el: '8. Κοινοποίηση σε Τρίτους (Άρθρο 13 GDPR)',
          en: '8. Disclosure to Third Parties (Article 13 GDPR)'
        },
        intro: {
          el: 'Κοινοποιούμε τα προσωπικά σας δεδομένα στους ακόλουθους τρίτους για τους σκοπούς που αναφέρονται παρακάτω:',
          en: 'We disclose your personal data to the following third parties for the purposes stated below:'
        },
        supabaseTitle: {
          el: '8.1 Supabase (Database & Authentication)',
          en: '8.1 Supabase (Database & Authentication)'
        },
        supabase: {
          el: [
            'Σκοπός: Αποθήκευση δεδομένων, διαχείριση authentication, hosting backend services',
            'Νομική Βάση: Εκτέλεση Συμβολαίου',
            'Δεδομένα: Όλα τα προσωπικά δεδομένα που συλλέγουμε',
            'Τοποθεσία: ΕΕ/EEA (με δυνατότητα backup servers εκτός ΕΕ)',
            'Data Processing Agreement (DPA): Ναι'
          ],
          en: [
            'Purpose: Data storage, authentication management, hosting backend services',
            'Legal Basis: Contract Performance',
            'Data: All personal data we collect',
            'Location: EU/EEA (with possible backup servers outside EU)',
            'Data Processing Agreement (DPA): Yes'
          ]
        },
        googleMapsTitle: {
          el: '8.2 Google Maps API',
          en: '8.2 Google Maps API'
        },
        googleMaps: {
          el: [
            'Σκοπός: Εμφάνιση χάρτη, πλοήγηση, υπολογισμός αποστάσεων',
            'Νομική Βάση: Νόμιμο Συμφέρον',
            'Δεδομένα: Συντεταγμένες GPS, τοποθεσία χρήστη',
            'Τοποθεσία: Μπορεί να είναι εκτός ΕΕ',
            'Data Processing Agreement (DPA): Ναι',
            'Προστασία: Standard Contractual Clauses (SCCs)'
          ],
          en: [
            'Purpose: Map display, navigation, distance calculation',
            'Legal Basis: Legitimate Interest',
            'Data: GPS coordinates, user location',
            'Location: May be outside EU',
            'Data Processing Agreement (DPA): Yes',
            'Protection: Standard Contractual Clauses (SCCs)'
          ]
        },
        cloudHostingTitle: {
          el: '8.3 Cloud Hosting Providers (εάν χρησιμοποιούνται)',
          en: '8.3 Cloud Hosting Providers (if used)'
        },
        cloudHosting: {
          el: [
            'Σκοπός: Hosting, backup, infrastructure',
            'Νομική Βάση: Εκτέλεση Συμβολαίου',
            'Data Processing Agreement (DPA): Ναι'
          ],
          en: [
            'Purpose: Hosting, backup, infrastructure',
            'Legal Basis: Contract Performance',
            'Data Processing Agreement (DPA): Yes'
          ]
        },
        analyticsTitle: {
          el: '8.4 Analytics Services (προαιρετικά, με συναίνεση)',
          en: '8.4 Analytics Services (optional, with consent)'
        },
        analytics: {
          el: [
            'Σκοπός: Ανάλυση χρήσης για βελτίωση της εφαρμογής',
            'Νομική Βάση: Συναίνεση',
            'Δεδομένα: Aggregated/anonymized usage data',
            'Data Processing Agreement (DPA): Ναι'
          ],
          en: [
            'Purpose: Usage analysis to improve the app',
            'Legal Basis: Consent',
            'Data: Aggregated/anonymized usage data',
            'Data Processing Agreement (DPA): Yes'
          ]
        },
        important: {
          el: [
            'Όλοι οι τρίτοι είναι GDPR-compliant και έχουν υπογράψει Data Processing Agreements (DPAs)',
            'Δεν πουλάμε προσωπικά δεδομένα σε τρίτους για marketing purposes',
            'Δεν χρησιμοποιούμε Payment Processors (Stripe, Google Play, Apple App Store) - η εφαρμογή είναι 100% δωρεάν και δεν διαθέτει subscriptions με πληρωμή'
          ],
          en: [
            'All third parties are GDPR-compliant and have signed Data Processing Agreements (DPAs)',
            'We do not sell personal data to third parties for marketing purposes',
            'We do not use Payment Processors (Stripe, Google Play, Apple App Store) - the app is 100% free and does not have paid subscriptions'
          ]
        }
      },
      dataTransfer: {
        title: {
          el: '9. Μεταφορά Δεδομένων εκτός ΕΕ',
          en: '9. Data Transfer Outside the EU'
        },
        intro: {
          el: 'Ορισμένα από τα προσωπικά σας δεδομένα μπορεί να μεταφέρονται και να επεξεργάζονται εκτός της Ευρωπαϊκής Ένωσης (π.χ. Supabase backup servers, Google services).',
          en: 'Some of your personal data may be transferred and processed outside the European Union (e.g., Supabase backup servers, Google services).'
        },
        safeguards: {
          el: [
            'Adequacy Decisions: Οι χώρες έχουν επαρκές επίπεδο προστασίας (Adequacy Decision από την ΕΕ)',
            'Standard Contractual Clauses (SCCs): Χρησιμοποιούμε Standard Contractual Clauses που έχουν εγκριθεί από την Ευρωπαϊκή Επιτροπή',
            'Άλλα κατάλληλα μέτρα προστασίας: Σύμφωνα με το GDPR'
          ],
          en: [
            'Adequacy Decisions: Countries have adequate protection level (Adequacy Decision from EU)',
            'Standard Contractual Clauses (SCCs): We use Standard Contractual Clauses approved by the European Commission',
            'Other appropriate protection measures: In accordance with GDPR'
          ]
        },
        processors: {
          el: 'Όλοι οι processors εκτός ΕΕ έχουν υπογράψει Data Processing Agreements (DPAs) που διασφαλίζουν την προστασία των δεδομένων σας.',
          en: 'All processors outside the EU have signed Data Processing Agreements (DPAs) that ensure the protection of your data.'
        }
      },
      securityMeasures: {
        title: {
          el: '10. Μέτρα Ασφάλειας (Άρθρο 32 GDPR)',
          en: '10. Security Measures (Article 32 GDPR)'
        },
        intro: {
          el: 'Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των προσωπικών σας δεδομένων:',
          en: 'We implement appropriate technical and organizational measures to protect your personal data:'
        },
        encryptionTitle: {
          el: '10.1 Κρυπτογράφηση (Encryption)',
          en: '10.1 Encryption'
        },
        encryption: {
          el: [
            'Κρυπτογράφηση κατά τη μεταφορά: Όλες οι επικοινωνίες γίνονται μέσω TLS/SSL',
            'Κρυπτογράφηση κατά την αποθήκευση: Τα ευαίσθητα δεδομένα (passwords, tokens) είναι κρυπτογραφημένα'
          ],
          en: [
            'Encryption in transit: All communications are via TLS/SSL',
            'Encryption at rest: Sensitive data (passwords, tokens) is encrypted'
          ]
        },
        rlsTitle: {
          el: '10.2 Row-Level Security (RLS)',
          en: '10.2 Row-Level Security (RLS)'
        },
        rls: {
          el: [
            'Κάθε χρήστης έχει πρόσβαση μόνο στα δικά του δεδομένα',
            'RLS policies στο Supabase database για διασφάλιση απομόνωσης δεδομένων'
          ],
          en: [
            'Each user has access only to their own data',
            'RLS policies in Supabase database to ensure data isolation'
          ]
        },
        authTitle: {
          el: '10.3 Authentication & Authorization',
          en: '10.3 Authentication & Authorization'
        },
        auth: {
          el: [
            'Ασφαλείς μηχανισμοί ελέγχου πρόσβασης',
            'Token-based authentication με secure token management'
          ],
          en: [
            'Secure access control mechanisms',
            'Token-based authentication with secure token management'
          ]
        },
        auditsTitle: {
          el: '10.4 Regular Security Audits',
          en: '10.4 Regular Security Audits'
        },
        audits: {
          el: [
            'Τακτικοί security checks και audits',
            'Monitoring για ανίχνευση ασυνήθιστων δραστηριοτήτων'
          ],
          en: [
            'Regular security checks and audits',
            'Monitoring to detect unusual activities'
          ]
        },
        accessControlsTitle: {
          el: '10.5 Access Controls',
          en: '10.5 Access Controls'
        },
        accessControls: {
          el: [
            'Περιορισμένη πρόσβαση μόνο σε εξουσιοδοτημένο προσωπικό',
            'Logging όλων των accesses σε ευαίσθητα δεδομένα'
          ],
          en: [
            'Limited access only to authorized personnel',
            'Logging all accesses to sensitive data'
          ]
        },
        backupTitle: {
          el: '10.6 Backup & Recovery',
          en: '10.6 Backup & Recovery'
        },
        backup: {
          el: [
            'Τακτικά backups με κρυπτογραφημένα δεδομένα',
            'Disaster recovery plans'
          ],
          en: [
            'Regular backups with encrypted data',
            'Disaster recovery plans'
          ]
        },
        incidentTitle: {
          el: '10.7 Incident Response Plan',
          en: '10.7 Incident Response Plan'
        },
        incident: {
          el: [
            'Διαδικασίες διαχείρισης data breaches',
            'Notification procedures σύμφωνα με το GDPR'
          ],
          en: [
            'Data breach management procedures',
            'Notification procedures in accordance with GDPR'
          ]
        }
      },
      cookies: {
        title: {
          el: '11. Cookies & Analytics',
          en: '11. Cookies & Analytics'
        },
        intro: {
          el: 'Η εφαρμογή χρησιμοποιεί cookies και παρόμοιες τεχνολογίες για:',
          en: 'The app uses cookies and similar technologies for:'
        },
        typesTitle: {
          el: '11.1 Τύποι Cookies',
          en: '11.1 Types of Cookies'
        },
        necessaryCookies: {
          el: [
            'Session management',
            'Authentication',
            'Αποθήκευση προτιμήσεων (γλώσσα, ρυθμίσεις)'
          ],
          en: [
            'Session management',
            'Authentication',
            'Storing preferences (language, settings)'
          ]
        },
        analyticsCookies: {
          el: [
            'Ανάλυση χρήσης',
            'Βελτίωση της εφαρμογής'
          ],
          en: [
            'Usage analysis',
            'App improvement'
          ]
        },
        managementTitle: {
          el: '11.2 Διαχείριση Cookies',
          en: '11.2 Cookie Management'
        },
        management: {
          el: [
            'Ρυθμίσεις Εφαρμογής: Μπορείτε να απενεργοποιήσετε analytics από τις ρυθμίσεις της εφαρμογής',
            'Browser Settings: Μπορείτε να διαχειριστείτε cookies από τις ρυθμίσεις του browser σας',
            'Σημείωση: Η απενεργοποίηση ορισμένων cookies μπορεί να επηρεάσει τη λειτουργικότητα της εφαρμογής'
          ],
          en: [
            'App Settings: You can disable analytics from the app settings',
            'Browser Settings: You can manage cookies from your browser settings',
            'Note: Disabling some cookies may affect app functionality'
          ]
        }
      },
      notifications: {
        title: {
          el: '12. Ειδοποιήσεις & Τοποθεσία',
          en: '12. Notifications & Location'
        },
        locationUsageTitle: {
          el: '12.1 Χρήση Δεδομένων Τοποθεσίας (GPS)',
          en: '12.1 Use of Location Data (GPS)'
        },
        locationUsage: {
          el: [
            'Εντοπισμός διαθέσιμων θέσεων στάθμευσης κοντά σας (με άμεση ενημέρωση)',
            'Αποστολή ειδοποιήσεων για κοντινές διαθέσιμες θέσεις (σε πραγματικό χρόνο)',
            'Εμφάνιση της τοποθεσίας σας στον χάρτη',
            'Πλοήγηση προς τις θέσεις στάθμευσης'
          ],
          en: [
            'Identifying available parking spots near you (with immediate updates)',
            'Sending notifications for nearby available spots (in real-time)',
            'Displaying your location on the map',
            'Navigation to parking spots'
          ]
        },
        locationRetentionTitle: {
          el: '12.2 Διατήρηση Δεδομένων Τοποθεσίας',
          en: '12.2 Location Data Retention'
        },
        locationRetention: {
          el: [
            'Real-time data: Δεν αποθηκεύεται μακροπρόθεσμα, διαγράφεται άμεσα μετά τη χρήση',
            'Active reservations: Δεδομένα τοποθεσίας για ενεργές κρατήσεις διατηρούνται μόνο για τη διάρκεια της κράτησης (μέχρι 2 ώρες)'
          ],
          en: [
            'Real-time data: Not stored long-term, deleted immediately after use',
            'Active reservations: Location data for active reservations is retained only for the duration of the reservation (up to 2 hours)'
          ]
        },
        disableLocationTitle: {
          el: '12.3 Απενεργοποίηση Πρόσβασης Τοποθεσίας',
          en: '12.3 Disabling Location Access'
        },
        disableLocation: {
          el: 'Μπορείτε να απενεργοποιήσετε την πρόσβαση τοποθεσίας από τις ρυθμίσεις της συσκευής σας, αλλά αυτό μπορεί να περιορίσει τη λειτουργικότητα της εφαρμογής (π.χ. δεν θα λάβετε ειδοποιήσεις για κοντινές θέσεις).',
          en: 'You can disable location access from your device settings, but this may limit app functionality (e.g., you will not receive notifications for nearby spots).'
        }
      },
      dataBreaches: {
        title: {
          el: '13. Παραβιάσεις Δεδομένων (Data Breaches - Άρθρα 33-34 GDPR)',
          en: '13. Data Breaches (Articles 33-34 GDPR)'
        },
        intro: {
          el: 'Σε περίπτωση παραβίασης προσωπικών δεδομένων που μπορεί να δημιουργήσει υψηλό κίνδυνο για τα δικαιώματα και τις ελευθερίες των φυσικών προσώπων:',
          en: 'In case of a personal data breach that may pose a high risk to the rights and freedoms of natural persons:'
        },
        authorityTitle: {
          el: '13.1 Ειδοποίηση Αρχής (Άρθρο 33)',
          en: '13.1 Notification to Authority (Article 33)'
        },
        authority: {
          el: 'Θα ενημερώσουμε την Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ) εντός 72 ωρών από τη στιγμή που γνωρίζουμε την παραβίαση',
          en: 'We will notify the Hellenic Data Protection Authority (HDPA) within 72 hours of becoming aware of the breach'
        },
        userTitle: {
          el: '13.2 Ειδοποίηση Χρηστών (Άρθρο 34)',
          en: '13.2 User Notification (Article 34)'
        },
        user: {
          el: [
            'Εάν ο κίνδυνος είναι υψηλός, θα σας ενημερώσουμε χωρίς αδικαιολόγητη καθυστέρηση',
            'Θα σας ενημερώσουμε για:',
            'Τη φύση της παραβίασης',
            'Τα δεδομένα που επηρεάστηκαν',
            'Τα μέτρα που έχουμε λάβει',
            'Συστάσεις για την προστασία σας'
          ],
          en: [
            'If the risk is high, we will notify you without undue delay',
            'We will inform you about:',
            'The nature of the breach',
            'The data affected',
            'The measures we have taken',
            'Recommendations for your protection'
          ]
        }
      },
      consent: {
        title: {
          el: '14. Συνθήκες Συναίνεσης (Άρθρο 7 GDPR)',
          en: '14. Consent Conditions (Article 7 GDPR)'
        },
        characteristicsTitle: {
          el: '14.1 Χαρακτηριστικά Συναίνεσης',
          en: '14.1 Consent Characteristics'
        },
        characteristics: {
          el: [
            'Ελεύθερη (Freely given): Δεν υπάρχει πίεση ή υποχρέωση',
            'Συγκεκριμένη (Specific): Για συγκεκριμένους σκοπούς',
            'Ενημερωμένη (Informed): Έχετε πρόσβαση σε όλες τις πληροφορίες',
            'Σαφής (Unambiguous): Δίνεται μέσω explicit checkbox κατά την εγγραφή'
          ],
          en: [
            'Freely given: No pressure or obligation',
            'Specific: For specific purposes',
            'Informed: You have access to all information',
            'Unambiguous: Given through explicit checkbox during registration'
          ]
        },
        withdrawTitle: {
          el: '14.2 Ανάκληση Συναίνεσης',
          en: '14.2 Withdrawal of Consent'
        },
        withdraw: {
          el: [
            'Μπορείτε να ανακαλέσετε τη συναίνεσή σας οποιαδήποτε στιγμή',
            'Η ανάκληση δεν επηρεάζει τη νομιμότητα της προηγούμενης επεξεργασίας',
            'Μπορείτε να διαχειριστείτε τις προτιμήσεις συναίνεσης από τις ρυθμίσεις του λογαριασμού σας'
          ],
          en: [
            'You can withdraw your consent at any time',
            'Withdrawal does not affect the lawfulness of prior processing',
            'You can manage consent preferences from your account settings'
          ]
        },
        refusalTitle: {
          el: '14.3 Άρνηση Συναίνεσης',
          en: '14.3 Refusal of Consent'
        },
        refusal: {
          el: 'Η άρνηση συναίνεσης για analytics και marketing δεν επηρεάζει την πρόσβαση στις βασικές υπηρεσίες της εφαρμογής',
          en: 'Refusing consent for analytics and marketing does not affect access to the basic services of the app'
        }
      },
      privacyByDesign: {
        title: {
          el: '15. Προστασία Δεδομένων από Σχεδιασμό και Προεπιλογή (Άρθρο 25 GDPR)',
          en: '15. Data Protection by Design and by Default (Article 25 GDPR)'
        },
        intro: {
          el: 'Εφαρμόζουμε τις αρχές "Privacy by Design" και "Privacy by Default":',
          en: 'We apply the principles of "Privacy by Design" and "Privacy by Default":'
        },
        designTitle: {
          el: '15.1 Privacy by Design',
          en: '15.1 Privacy by Design'
        },
        design: {
          el: [
            'Συλλέγουμε μόνο τα απαραίτητα δεδομένα για κάθε λειτουργία',
            'Εφαρμόζουμε data minimization',
            'Κρυπτογράφηση ενεργή από προεπιλογή',
            'Τακτικές privacy impact assessments για νέες λειτουργίες'
          ],
          en: [
            'We collect only necessary data for each function',
            'We apply data minimization',
            'Encryption active by default',
            'Regular privacy impact assessments for new features'
          ]
        },
        defaultTitle: {
          el: '15.2 Privacy by Default',
          en: '15.2 Privacy by Default'
        },
        default: {
          el: [
            'Οι ρυθμίσεις απορρήτου είναι πιο προστατευτικές από προεπιλογή',
            'Τα δεδομένα τοποθεσίας δεν αποθηκεύονται μακροπρόθεσμα από προεπιλογή',
            'Analytics είναι προαιρετικά και απαιτούν συναίνεση'
          ],
          en: [
            'Privacy settings are more protective by default',
            'Location data is not stored long-term by default',
            'Analytics is optional and requires consent'
          ]
        }
      },
      processingRecords: {
        title: {
          el: '16. Καταγραφές Επεξεργασίας (Άρθρο 30 GDPR)',
          en: '16. Processing Records (Article 30 GDPR)'
        },
        intro: {
          el: 'Διατηρούμε καταγραφές όλων των δραστηριοτήτων επεξεργασίας προσωπικών δεδομένων, όπως απαιτείται από το Άρθρο 30 GDPR. Οι καταγραφές περιλαμβάνουν:',
          en: 'We maintain records of all personal data processing activities, as required by Article 30 GDPR. The records include:'
        },
        records: {
          el: [
            'Σκοπός και νομική βάση επεξεργασίας',
            'Κατηγορίες δεδομένων και υποκειμένων',
            'Κατηγορίες παραληπτών',
            'Μεταφορές δεδομένων εκτός ΕΕ',
            'Περιόδους διατήρησης',
            'Μέτρα ασφάλειας'
          ],
          en: [
            'Purpose and legal basis of processing',
            'Categories of data and subjects',
            'Categories of recipients',
            'Data transfers outside the EU',
            'Retention periods',
            'Security measures'
          ]
        },
        authority: {
          el: 'Οι καταγραφές είναι διαθέσιμες για έλεγχο από την Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ).',
          en: 'The records are available for inspection by the Hellenic Data Protection Authority (HDPA).'
        }
      },
      automatedDecisionMaking: {
        title: {
          el: '17. Αυτοματοποιημένη Λήψη Αποφάσεων & Profiling (Άρθρο 22 GDPR)',
          en: '17. Automated Decision-Making & Profiling (Article 22 GDPR)'
        },
        intro: {
          el: 'Δεν χρησιμοποιούμε αυτοματοποιημένη λήψη αποφάσεων ή profiling που παράγει νομικά αποτελέσματα ή επηρεάζει σημαντικά τα δικαιώματα ή τις ελευθερίες σας.',
          en: 'We do not use automated decision-making or profiling that produces legal effects or significantly affects your rights or freedoms.'
        },
        pointsSystem: {
          el: 'Το σύστημα πόντων και rankings είναι καθαρά υπολογιστικό και δεν επηρεάζει νομικά δικαιώματα ή ελευθερίες.',
          en: 'The points system and rankings are purely computational and do not affect legal rights or freedoms.'
        },
        future: {
          el: 'Εάν εφαρμόσουμε τέτοιες τεχνολογίες στο μέλλον, θα σας ενημερώσουμε και θα σας δώσουμε το δικαίωμα να ζητήσετε ανθρώπινη παρέμβαση.',
          en: 'If we implement such technologies in the future, we will notify you and give you the right to request human intervention.'
        }
      },
      childrenData: {
        title: {
          el: '18. Δεδομένα Παιδιών (Άρθρο 8 GDPR)',
          en: '18. Children\'s Data (Article 8 GDPR)'
        },
        ageRestriction: {
          el: 'Η εφαρμογή T-Parking προορίζεται για χρήστες άνω των 18 ετών.',
          en: 'The T-Parking app is intended for users over 18 years of age.'
        },
        noCollection: {
          el: 'Δεν συλλέγουμε σκόπιμα δεδομένα από παιδιά κάτω των 18 ετών χωρίς συναίνεση γονέα ή κηδεμόνα.',
          en: 'We do not knowingly collect data from children under 18 years of age without parental or guardian consent.'
        },
        deletion: {
          el: 'Εάν ανακαλύψουμε ότι έχουμε συλλέξει δεδομένα από παιδί κάτω των 18 ετών χωρίς κατάλληλη συναίνεση, θα διαγράψουμε άμεσα τα δεδομένα.',
          en: 'If we discover that we have collected data from a child under 18 years of age without proper consent, we will immediately delete the data.'
        },
        parentContact: {
          el: 'Εάν είστε γονέας ή κηδεμόνας και πιστεύετε ότι το παιδί σας μας έχει παράσχει προσωπικά δεδομένα, επικοινωνήστε μαζί μας στο: devtaskhub@gmail.com',
          en: 'If you are a parent or guardian and believe your child has provided us with personal data, contact us at: devtaskhub@gmail.com'
        }
      },
      specialCategories: {
        title: {
          el: '19. Ειδικές Κατηγορίες Δεδομένων (Άρθρο 9 GDPR)',
          en: '19. Special Categories of Data (Article 9 GDPR)'
        },
        intro: {
          el: 'Δεν συλλέγουμε ή επεξεργαζόμαστε "ειδικές κατηγορίες" προσωπικών δεδομένων όπως ορίζονται στο Άρθρο 9 GDPR, συμπεριλαμβανομένων:',
          en: 'We do not collect or process "special categories" of personal data as defined in Article 9 GDPR, including:'
        },
        categories: {
          el: [
            'Δεδομένων που αποκαλύπτουν φυλετική ή εθνοτική καταγωγή',
            'Πολιτικών απόψεων',
            'Θρησκευτικών ή φιλοσοφικών πεποιθήσεων',
            'Συνδικαλιστικής συμμετοχής',
            'Γενετικών δεδομένων',
            'Βιομετρικών δεδομένων',
            'Δεδομένων υγείας',
            'Δεδομένων που αφορούν σεξουαλική ζωή ή σεξουαλικό προσανατολισμό'
          ],
          en: [
            'Data revealing racial or ethnic origin',
            'Political opinions',
            'Religious or philosophical beliefs',
            'Trade union membership',
            'Genetic data',
            'Biometric data',
            'Health data',
            'Data concerning sexual life or sexual orientation'
          ]
        }
      },
      modifications: {
        title: {
          el: '20. Τροποποιήσεις Πολιτικής Απορρήτου',
          en: '20. Privacy Policy Modifications'
        },
        intro: {
          el: 'Μπορούμε να τροποποιήσουμε αυτή την Πολιτική Απορρήτου οποιαδήποτε στιγμή.',
          en: 'We may modify this Privacy Policy at any time.'
        },
        notificationTitle: {
          el: '20.1 Ειδοποίηση Αλλαγών',
          en: '20.1 Change Notification'
        },
        notification: {
          el: [
            'Οι σημαντικές αλλαγές θα ανακοινωθούν μέσω της εφαρμογής ή email',
            'Η ημερομηνία "Τελευταία Ενημέρωση" θα ενημερώνεται στην κορυφή αυτής της σελίδας'
          ],
          en: [
            'Significant changes will be announced through the app or email',
            'The "Last Updated" date will be updated at the top of this page'
          ]
        },
        continuedUseTitle: {
          el: '20.2 Συνεχής Χρήση',
          en: '20.2 Continued Use'
        },
        continuedUse: {
          el: [
            'Η συνεχής χρήση της εφαρμογής μετά από τροποποιήσεις συνεπάγεται αποδοχή των νέων όρων',
            'Σας συνιστούμε να ελέγχετε τακτικά αυτή τη σελίδα για ενημερώσεις'
          ],
          en: [
            'Continued use of the app after modifications implies acceptance of the new terms',
            'We recommend that you check this page regularly for updates'
          ]
        }
      },
      jurisdiction: {
        title: {
          el: '21. Δικαιοδοσία & Εφαρμοστέο Δίκαιο',
          en: '21. Jurisdiction & Applicable Law'
        },
        intro: {
          el: 'Αυτή η Πολιτική Απορρήτου διέπεται από:',
          en: 'This Privacy Policy is governed by:'
        },
        laws: {
          el: [
            'Ελληνικό Δίκαιο: Οι όροι διέπονται από το ελληνικό δίκαιο',
            'GDPR: Ο Κανονισμός (ΕΕ) 2016/679 για την Προστασία των Προσωπικών Δεδομένων',
            'Ελληνικός Νόμος 4624/2019: Για την εφαρμογή του GDPR στην Ελλάδα'
          ],
          en: [
            'Greek Law: The terms are governed by Greek law',
            'GDPR: Regulation (EU) 2016/679 on the Protection of Personal Data',
            'Greek Law 4624/2019: For the implementation of GDPR in Greece'
          ]
        },
        disputes: {
          el: 'Οποιαδήποτε διαφωνία που προκύπτει από ή σχετίζεται με αυτή την Πολιτική Απορρήτου θα επιλυθεί από τα αρμόδια δικαστήρια της Ελλάδας.',
          en: 'Any dispute arising from or related to this Privacy Policy will be resolved by the competent courts of Greece.'
        },
        adr: {
          el: 'Για καταναλωτικές διαφορές, έχετε το δικαίωμα να καταφύγετε σε εναλλακτικές διαδικασίες επίλυσης διαφορών (ADR) σύμφωνα με το ελληνικό δίκαιο.',
          en: 'For consumer disputes, you have the right to resort to alternative dispute resolution (ADR) procedures in accordance with Greek law.'
        },
        authority: {
          el: 'Η Ελληνική Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ) είναι η αρμόδια εποπτική αρχή για θέματα προστασίας δεδομένων.',
          en: 'The Hellenic Data Protection Authority (HDPA) is the competent supervisory authority for data protection matters.'
        }
      },
      contact: {
        title: {
          el: '22. Επικοινωνία',
          en: '22. Contact'
        },
        intro: {
          el: 'Για οποιαδήποτε ερώτηση, αίτημα ή ανησυχία σχετικά με αυτή την Πολιτική Απορρήτου ή την επεξεργασία των προσωπικών σας δεδομένων, επικοινωνήστε μαζί μας:',
          en: 'For any questions, requests, or concerns regarding this Privacy Policy or the processing of your personal data, please contact us:'
        },
        email: {
          el: 'Email:',
          en: 'Email:'
        },
        emailValue: {
          el: 'devtaskhub@gmail.com',
          en: 'devtaskhub@gmail.com'
        },
        support: {
          el: 'Υποστήριξη:',
          en: 'Support:'
        },
        response: {
          el: 'Θα απαντήσουμε στο αίτημά σας εντός 30 ημερών (ή 90 ημερών σε περίπλοκες περιπτώσεις, με προηγούμενη ειδοποίηση).',
          en: 'We will respond to your request within 30 days (or 90 days in complex cases, with prior notice).'
        },
        lastUpdate: {
          el: 'Τελευταία Ενημέρωση: 7 Δεκεμβρίου 2025',
          en: 'Last Updated: December 7, 2025'
        },
        copyright: {
          el: '© 2025 T-Parking. Όλα τα δικαιώματα διατηρούνται.',
          en: '© 2025 T-Parking. All rights reserved.'
        }
      }
    },
    termsConditions: {
      title: {
        el: 'Όροι και Προϋποθέσεις Χρήσης - T-Parking',
        en: 'Terms and Conditions of Use - T-Parking'
      },
      lastUpdated: {
        el: 'Τελευταία Ενημέρωση: 7 Δεκεμβρίου 2025',
        en: 'Last Updated: December 7, 2025'
      },
      introduction: {
        el: 'Καλώς ήρθατε στο T-Parking. Οι παρακάτω Όροι και Προϋποθέσεις Χρήσης διέπουν τη χρήση της εφαρμογής T-Parking και των υπηρεσιών μας. Παρακαλούμε διαβάστε προσεκτικά αυτούς τους όρους πριν από τη χρήση της εφαρμογής. Με τη χρήση της εφαρμογής, αποδέχεστε αυτούς τους όρους και συναινείτε ρητά στην επεξεργασία των προσωπικών σας δεδομένων σύμφωνα με τον Κανονισμό (ΕΕ) 2016/679 για την Προστασία των Προσωπικών Δεδομένων (GDPR). Αν δεν συμφωνείτε με οποιοδήποτε μέρος αυτών των όρων, παρακαλούμε μην χρησιμοποιείτε την εφαρμογή.',
        en: 'Welcome to T-Parking. The following Terms and Conditions of Use govern the use of the T-Parking application and our services. Please read these terms carefully before using the application. By using the application, you accept these terms and explicitly consent to the processing of your personal data in accordance with Regulation (EU) 2016/679 on the Protection of Personal Data (GDPR). If you do not agree with any part of these terms, please do not use the application.'
      },
      acceptance: {
        title: {
          el: '2. Αποδοχή Όρων & Συναίνεση',
          en: '2. Acceptance of Terms & Consent'
        },
        acceptanceTitle: {
          el: '2.1 Αποδοχή Όρων',
          en: '2.1 Acceptance of Terms'
        },
        acceptanceContent: {
          el: 'Με την εγγραφή, είσοδο ή χρήση της εφαρμογής T-Parking, αποδέχεστε αυτούς τους Όρους και Προϋποθέσεις Χρήσης και συμφωνείτε να τους τηρείτε.',
          en: 'By registering, logging in, or using the T-Parking application, you accept these Terms and Conditions of Use and agree to abide by them.'
        },
        consentTitle: {
          el: '2.2 Συναίνεση Επεξεργασίας Δεδομένων',
          en: '2.2 Consent for Data Processing'
        },
        consentContent: {
          el: 'Με τη χρήση της εφαρμογής, συναινείτε ρητά στην επεξεργασία των προσωπικών σας δεδομένων σύμφωνα με την Πολιτική Απορρήτου μας (δείτε /privacy-policy).',
          en: 'By using the application, you explicitly consent to the processing of your personal data in accordance with our Privacy Policy (see /privacy-policy).'
        },
        consentCharacteristics: {
          el: [
            'Ελεύθερη: Δεν υπάρχει πίεση ή υποχρέωση',
            'Συγκεκριμένη: Για συγκεκριμένους σκοπούς',
            'Ενημερωμένη: Έχετε πρόσβαση σε όλες τις πληροφορίες',
            'Σαφής: Δίνεται μέσω explicit checkbox κατά την εγγραφή'
          ],
          en: [
            'Free: No pressure or obligation',
            'Specific: For specific purposes',
            'Informed: You have access to all information',
            'Unambiguous: Given through explicit checkbox during registration'
          ]
        },
        withdrawTitle: {
          el: '2.3 Ανάκληση Συναίνεσης',
          en: '2.3 Withdrawal of Consent'
        },
        withdrawContent: {
          el: 'Μπορείτε να ανακαλέσετε τη συναίνεσή σας οποιαδήποτε στιγμή, χωρίς να επηρεάζεται η νομιμότητα της προηγούμενης επεξεργασίας.',
          en: 'You can withdraw your consent at any time, without affecting the lawfulness of prior processing.'
        }
      },
      serviceDescription: {
        title: {
          el: '3. Περιγραφή Υπηρεσίας',
          en: '3. Service Description'
        },
        whatIsTitle: {
          el: '3.1 Τι είναι το T-Parking',
          en: '3.1 What is T-Parking'
        },
        whatIsContent: {
          el: 'Το T-Parking είναι μια mobile εφαρμογή που επιτρέπει στους χρήστες να:',
          en: 'T-Parking is a mobile application that allows users to:'
        },
        features: {
          el: [
            'Βρίσκουν διαθέσιμες θέσεις στάθμευσης σε πραγματικό χρόνο',
            'Κρατούν θέσεις στάθμευσης (reservations)',
            'Μοιράζονται θέσεις στάθμευσης όταν ξεπαρκάρουν',
            'Πλοηγούνται προς θέσεις στάθμευσης (μέσω Google Maps)',
            'Κερδίζουν πόντους και επιβραβεύσεις',
            'Λαμβάνουν ειδοποιήσεις για κοντινές διαθέσιμες θέσεις'
          ],
          en: [
            'Find available parking spots in real-time',
            'Reserve parking spots (reservations)',
            'Share parking spots when they leave',
            'Navigate to parking spots (via Google Maps)',
            'Earn points and rewards',
            'Receive notifications for nearby available spots'
          ]
        },
        functionalityTitle: {
          el: '3.2 Λειτουργικότητα',
          en: '3.2 Functionality'
        },
        functionalityContent: {
          el: 'Η εφαρμογή λειτουργεί σε πραγματικό χρόνο (real-time) χωρίς καθυστερήσεις και χρησιμοποιεί δεδομένα τοποθεσίας (GPS) για την παροχή των υπηρεσιών της. Όλα τα features είναι 100% δωρεάν και διαθέσιμα σε όλους τους χρήστες.',
          en: 'The app operates in real-time without delays and uses location data (GPS) to provide its services. All features are 100% free and available to all users.'
        },
        characteristicsTitle: {
          el: '3.3 Χαρακτηριστικά',
          en: '3.3 Features'
        },
        characteristics: {
          el: [
            'Σύστημα Πόντων: Κερδίζετε πόντους κάθε φορά που μοιράζεστε μια θέση στάθμευσης',
            'Κρατήσεις: 1 δωρεάν κράτηση ανά 20 επιβεβαιωμένα ξεπαρκαρίσματα',
            'Ειδοποιήσεις: Push notifications για κοντινές διαθέσιμες θέσεις',
            'Ιστορικό & Στατιστικά: Προβολή ιστορικού, πόντων, rankings, εξοικονόμησης χρόνου/χρημάτων',
            'Πλοήγηση: Ενσωματωμένη πλοήγηση μέσω Google Maps'
          ],
          en: [
            'Points System: You earn points every time you share a parking spot',
            'Reservations: 1 free reservation per 20 confirmed departures',
            'Notifications: Push notifications for nearby available spots',
            'History & Statistics: View history, points, rankings, time/money savings',
            'Navigation: Integrated navigation via Google Maps'
          ]
        }
      },
      registration: {
        title: {
          el: '4. Εγγραφή & Λογαριασμός',
          en: '4. Registration & Account'
        },
        requirementsTitle: {
          el: '4.1 Απαιτήσεις Εγγραφής',
          en: '4.1 Registration Requirements'
        },
        requirementsIntro: {
          el: 'Για να χρησιμοποιήσετε το T-Parking, πρέπει να:',
          en: 'To use T-Parking, you must:'
        },
        requirements: {
          el: [
            'Έχετε συμπληρώσει το 18ο έτος της ηλικίας σας',
            'Δημιουργήσετε λογαριασμό με ακριβή και ενημερωμένα στοιχεία',
            'Παράσχετε έγκυρη διεύθυνση email',
            'Δημιουργήσετε ασφαλές password (τουλάχιστον 6 χαρακτήρες)'
          ],
          en: [
            'Be at least 18 years of age',
            'Create an account with accurate and up-to-date information',
            'Provide a valid email address',
            'Create a secure password (at least 6 characters)'
          ]
        },
        responsibilityTitle: {
          el: '4.2 Ευθύνη Χρήστη',
          en: '4.2 User Responsibility'
        },
        responsibilityContent: {
          el: 'Είστε υπεύθυνος για:',
          en: 'You are responsible for:'
        },
        responsibility: {
          el: [
            'Τη διασφάλιση της ασφάλειας του λογαριασμού σας, συμπεριλαμβανομένου του password σας',
            'Όλη τη δραστηριότητα που γίνεται μέσω του λογαριασμού σας',
            'Τη διατήρηση ενημερωμένων και ακριβών πληροφοριών στο προφίλ σας'
          ],
          en: [
            'Ensuring the security of your account, including your password',
            'All activity that occurs through your account',
            'Maintaining up-to-date and accurate information in your profile'
          ]
        },
        securityTitle: {
          el: '4.3 Ασφάλεια Λογαριασμού',
          en: '4.3 Account Security'
        },
        securityContent: {
          el: 'Εάν υποψιάζεστε ότι ο λογαριασμός σας έχει παραβιαστεί, ειδοποιήστε μας άμεσα στο: devtaskhub@gmail.com',
          en: 'If you suspect that your account has been compromised, notify us immediately at: devtaskhub@gmail.com'
        },
        securityDisclaimer: {
          el: 'Εμείς δεν φέρουμε ευθύνη για ζημίες που προκύπτουν από μη εξουσιοδοτημένη χρήση του λογαριασμού σας.',
          en: 'We are not responsible for damages arising from unauthorized use of your account.'
        }
      },
      useOfService: {
        title: {
          el: '5. Χρήση Υπηρεσίας',
          en: '5. Use of Service'
        },
        lawfulUseTitle: {
          el: '5.1 Νόμιμη Χρήση',
          en: '5.1 Lawful Use'
        },
        lawfulUseContent: {
          el: 'Η χρήση της εφαρμογής επιτρέπεται μόνο για νόμιμους σκοπούς.',
          en: 'Use of the application is permitted only for lawful purposes.'
        },
        prohibitedTitle: {
          el: '5.2 Απαγορευμένες Δραστηριότητες',
          en: '5.2 Prohibited Activities'
        },
        prohibitedIntro: {
          el: 'Απαγορεύεται αυστηρά:',
          en: 'The following are strictly prohibited:'
        },
        falseInformationTitle: {
          el: 'Παροχή Ψευδών ή Παραπλανητικών Πληροφοριών:',
          en: 'Providing False or Misleading Information:'
        },
        falseInformation: {
          el: [
            'Δημιουργία ψευδών θέσεων στάθμευσης',
            'Παροχή παραπλανητικών πληροφοριών σχετικά με τη διαθεσιμότητα θέσεων',
            'Χρήση ψευδών στοιχείων κατά την εγγραφή'
          ],
          en: [
            'Creating fake parking spots',
            'Providing misleading information about spot availability',
            'Using false information during registration'
          ]
        },
        abuseTitle: {
          el: 'Κατάχρηση Υπηρεσίας:',
          en: 'Service Abuse:'
        },
        abuse: {
          el: [
            'Χρήση της εφαρμογής για παράνομες δραστηριότητες',
            'Κατάχρηση του συστήματος πόντων ή κρατήσεων',
            'Προσπάθεια χειραγώγησης των rankings ή στατιστικών'
          ],
          en: [
            'Using the app for illegal activities',
            'Abusing the points system or reservations',
            'Attempting to manipulate rankings or statistics'
          ]
        },
        thirdPartyRightsTitle: {
          el: 'Παραβίαση Δικαιωμάτων Τρίτων:',
          en: 'Violation of Third-Party Rights:'
        },
        thirdPartyRights: {
          el: [
            'Παραβίαση πνευματικών δικαιωμάτων',
            'Παραβίαση δικαιωμάτων ιδιωτικής ζωής',
            'Χρήση της εφαρμογής για παρενοχλήσεις ή εκφοβισμούς'
          ],
          en: [
            'Violation of intellectual property rights',
            'Violation of privacy rights',
            'Using the app for harassment or intimidation'
          ]
        },
        technicalInterferenceTitle: {
          el: 'Τεχνικές Επεμβάσεις:',
          en: 'Technical Interference:'
        },
        technicalInterference: {
          el: [
            'Hacking, reverse engineering, ή προσπάθεια να παρακάμψετε τα security measures',
            'Προσπάθεια πρόσβασης σε δεδομένα άλλων χρηστών',
            'Χρήση bots, scripts, ή automated tools για χειραγώγηση της εφαρμογής'
          ],
          en: [
            'Hacking, reverse engineering, or attempting to bypass security measures',
            'Attempting to access other users\' data',
            'Using bots, scripts, or automated tools to manipulate the app'
          ]
        },
        otherProhibitedTitle: {
          el: 'Άλλες Απαγορευμένες Δραστηριότητες:',
          en: 'Other Prohibited Activities:'
        },
        otherProhibited: {
          el: [
            'Χρήση της εφαρμογής με τρόπο που μπορεί να βλάψει την εφαρμογή, τους χρήστες της, ή τρίτους',
            'Καταστροφή, διαταραχή ή παρεμπόδιση της λειτουργίας της εφαρμογής',
            'Πωλήσεις, μεταβίβαση, ή ενοικίαση του λογαριασμού σας σε τρίτους'
          ],
          en: [
            'Using the app in a way that may harm the app, its users, or third parties',
            'Destroying, disrupting, or interfering with the app\'s functionality',
            'Selling, transferring, or renting your account to third parties'
          ]
        },
        consequencesTitle: {
          el: '5.3 Συνεπείς',
          en: '5.3 Consequences'
        },
        consequences: {
          el: [
            'Τερματισμός ή αναστολή του λογαριασμού σας',
            'Νομικές ενέργειες (εάν χρειάζεται)',
            'Αποζημιώσεις για ζημίες που προκύπτουν'
          ],
          en: [
            'Termination or suspension of your account',
            'Legal action (if necessary)',
            'Compensation for damages incurred'
          ]
        }
      },
      reservations: {
        title: {
          el: '6. Κρατήσεις & Πόντοι',
          en: '6. Reservations & Points'
        },
        reservationsTitle: {
          el: '6.1 Σύστημα Κρατήσεων',
          en: '6.1 Reservation System'
        },
        reservations: {
          el: [
            'Όλοι οι χρήστες μπορούν να κάνουν κράτηση θέσης εάν έχουν διαθέσιμη δωρεάν κράτηση',
            '1 δωρεάν κράτηση προμηθεύεται για κάθε 20 επιβεβαιωμένα ξεπαρκαρίσματα',
            'Κάθε κράτηση έχει διάρκεια έως 2 ώρες',
            'Μετά τη λήξη, η θέση γίνεται διαθέσιμη για άλλους χρήστες',
            'Όλα τα features είναι 100% δωρεάν - δεν υπάρχουν premium ή platinum subscriptions με πληρωμή'
          ],
          en: [
            'All users can reserve a spot if they have an available free reservation',
            '1 free reservation is provided for every 20 confirmed departures',
            'Each reservation has a duration of up to 2 hours',
            'After expiration, the spot becomes available for other users',
            'All features are 100% free - there are no premium or platinum paid subscriptions'
          ]
        },
        pointsTitle: {
          el: '6.2 Σύστημα Πόντων',
          en: '6.2 Points System'
        },
        pointsIntro: {
          el: '+1 πόντος για κάθε θέση που μοιράζεστε (Unpark). Οι πόντοι χρησιμοποιούνται για:',
          en: '+1 point for each spot you share (Unpark). Points are used for:'
        },
        points: {
          el: [
            'Υπολογισμό rankings',
            'Στατιστικά',
            'Επιβραβεύσεις (δωρεάν κρατήσεις)'
          ],
          en: [
            'Ranking calculations',
            'Statistics',
            'Rewards (free reservations)'
          ]
        },
        rewardsTitle: {
          el: '6.3 Επιβραβεύσεις',
          en: '6.3 Rewards'
        },
        rewards: {
          el: [
            '1 δωρεάν κράτηση = 20 επιβεβαιωμένα ξεπαρκαρίσματα',
            'Οι επιβραβεύσεις είναι ατομικές και δεν μπορούν να μεταφερθούν'
          ],
          en: [
            '1 free reservation = 20 confirmed departures',
            'Rewards are individual and cannot be transferred'
          ]
        },
        availabilityTitle: {
          el: '6.4 Διαθεσιμότητα Κρατήσεων',
          en: '6.4 Reservation Availability'
        },
        availability: {
          el: [
            'Οι κρατήσεις είναι subject to availability',
            'Δεν εγγυόμαστε ότι μια θέση θα είναι διαθέσιμη όταν φτάσετε',
            'Δεν φέρουμε ευθύνη για αλλαγές στην κατάσταση μιας θέσης (π.χ. εάν κάποιος άλλος έχει πάρει τη θέση)'
          ],
          en: [
            'Reservations are subject to availability',
            'We do not guarantee that a spot will be available when you arrive',
            'We are not responsible for changes in the status of a spot (e.g., if someone else has taken the spot)'
          ]
        }
      },
      personalData: {
        title: {
          el: '7. Προσωπικά Δεδομένα (Σύνοψη - Για πλήρη λεπτομέρειες δείτε Privacy Policy)',
          en: '7. Personal Data (Summary - For full details see Privacy Policy)'
        },
        collectionTitle: {
          el: '7.1 Συλλογή Δεδομένων',
          en: '7.1 Data Collection'
        },
        collectionContent: {
          el: 'Συλλέγουμε τα ακόλουθα προσωπικά δεδομένα (για λεπτομέρειες, δείτε την Πολιτική Απορρήτου):',
          en: 'We collect the following personal data (for details, see the Privacy Policy):'
        },
        collection: {
          el: [
            'Ονοματεπώνυμο, Email, Password',
            'Δεδομένα τοποθεσίας (GPS) σε πραγματικό χρόνο',
            'Δεδομένα χρήσης (ιστορικό, κρατήσεις, πόντοι)',
            'Δεδομένα συσκευής',
            'Cookies και analytics data (με συναίνεση)'
          ],
          en: [
            'Full name, Email, Password',
            'Location data (GPS) in real-time',
            'Usage data (history, reservations, points)',
            'Device data',
            'Cookies and analytics data (with consent)'
          ]
        },
        legalBasisTitle: {
          el: '7.2 Νομική Βάση (GDPR Article 6)',
          en: '7.2 Legal Basis (GDPR Article 6)'
        },
        legalBasis: {
          el: [
            'Εκτέλεση Συμβολαίου: Παροχή βασικών υπηρεσιών',
            'Συναίνεση: Marketing, analytics (προαιρετικά)',
            'Νόμιμο Συμφέρον: Βελτίωση εφαρμογής, ασφάλεια',
            'Νομική Υποχρέωση: Συμμόρφωση με νόμους'
          ],
          en: [
            'Contract Performance: Providing basic services',
            'Consent: Marketing, analytics (optional)',
            'Legitimate Interest: App improvement, security',
            'Legal Obligation: Compliance with laws'
          ]
        },
        purposeTitle: {
          el: '7.3 Σκοπός Επεξεργασίας',
          en: '7.3 Purpose of Processing'
        },
        purpose: {
          el: [
            'Παροχή και βελτίωση υπηρεσιών',
            'Επεξεργασία κρατήσεων και πόντων',
            'Αποστολή ειδοποιήσεων',
            'Ανάλυση και βελτίωση',
            'Ασφάλεια και πρόληψη απάτης'
          ],
          en: [
            'Service provision and improvement',
            'Processing reservations and points',
            'Sending notifications',
            'Analysis and improvement',
            'Security and fraud prevention'
          ]
        },
        policyTitle: {
          el: '7.4 Πολιτική Απορρήτου',
          en: '7.4 Privacy Policy'
        },
        policyContent: {
          el: 'Για πλήρεις λεπτομέρειες σχετικά με την επεξεργασία προσωπικών δεδομένων, δείτε την Πολιτική Απορρήτου μας στο /privacy-policy.',
          en: 'For full details regarding the processing of personal data, see our Privacy Policy at /privacy-policy.'
        }
      },
      userRights: {
        title: {
          el: '8. Δικαιώματα Χρήστη (GDPR Articles 15-22)',
          en: '8. User Rights (GDPR Articles 15-22)'
        },
        intro: {
          el: 'Έχετε τα ακόλουθα δικαιώματα σχετικά με τα προσωπικά σας δεδομένα:',
          en: 'You have the following rights regarding your personal data:'
        },
        rights: {
          el: [
            'Δικαίωμα Πρόσβασης (Right of Access)',
            'Δικαίωμα Διόρθωσης (Right to Rectification)',
            'Δικαίωμα Διαγραφής / "Δικαίωμα στη Λήθη" (Right to Erasure)',
            'Δικαίωμα Περιορισμού Επεξεργασίας (Right to Restriction)',
            'Δικαίωμα Φορητότητας Δεδομένων (Right to Data Portability)',
            'Δικαίωμα Εναντίωσης (Right to Object)',
            'Δικαίωμα Ανάκλησης Συναίνεσης (Right to Withdraw Consent)'
          ],
          en: [
            'Right of Access',
            'Right to Rectification',
            'Right to Erasure / "Right to be Forgotten"',
            'Right to Restriction of Processing',
            'Right to Data Portability',
            'Right to Object',
            'Right to Withdraw Consent'
          ]
        },
        contact: {
          el: 'Για να ασκήσετε οποιοδήποτε από αυτά τα δικαιώματα, επικοινωνήστε μαζί μας στο: devtaskhub@gmail.com',
          en: 'To exercise any of these rights, contact us at: devtaskhub@gmail.com'
        }
      },
      dataRetention: {
        title: {
          el: '9. Διατήρηση Δεδομένων',
          en: '9. Data Retention'
        },
        policyTitle: {
          el: '9.1 Πολιτική Διατήρησης',
          en: '9.1 Retention Policy'
        },
        policy: {
          el: [
            'Δεδομένα Λογαριασμού: Διατηρούνται για όσο ο λογαριασμός είναι ενεργός',
            'Ιστορικό Κοινοποίησης/Κρατήσεων: 6 μήνες',
            'Δεδομένα Τοποθεσίας: Διαγράφονται άμεσα μετά τη χρήση (εκτός ενεργών κρατήσεων)',
            'Analytics Data: 24 μήνες'
          ],
          en: [
            'Account Data: Retained for as long as the account is active',
            'Sharing/Reservation History: 6 months',
            'Location Data: Deleted immediately after use (except active reservations)',
            'Analytics Data: 24 months'
          ]
        },
        deletionTitle: {
          el: '9.2 Διαγραφή μετά τη Διαγραφή Λογαριασμού',
          en: '9.2 Deletion After Account Deletion'
        },
        deletion: {
          el: 'Μετά τη διαγραφή του λογαριασμού, όλα τα προσωπικά δεδομένα διαγράφονται εντός 30 ημερών (εκτός εάν απαιτείται διατήρηση από το νόμο).',
          en: 'After deletion of the account, all personal data is deleted within 30 days (unless retention is required by law).'
        }
      },
      thirdParties: {
        title: {
          el: '10. Κοινοποίηση σε Τρίτους',
          en: '10. Disclosure to Third Parties'
        },
        intro: {
          el: 'Κοινοποιούμε τα προσωπικά σας δεδομένα στους ακόλουθους τρίτους (όλοι GDPR-compliant με DPAs):',
          en: 'We disclose your personal data to the following third parties (all GDPR-compliant with DPAs):'
        },
        parties: {
          el: [
            'Supabase: Database & Authentication',
            'Google Maps API: Πλοήγηση και χάρτες',
            'Cloud Hosting Providers: Hosting & backup',
            'Analytics Services: Ανάλυση χρήσης (με συναίνεση)'
          ],
          en: [
            'Supabase: Database & Authentication',
            'Google Maps API: Navigation and maps',
            'Cloud Hosting Providers: Hosting & backup',
            'Analytics Services: Usage analysis (with consent)'
          ]
        },
        details: {
          el: 'Για λεπτομέρειες, δείτε την Πολιτική Απορρήτου μας.',
          en: 'For details, see our Privacy Policy.'
        }
      },
      securityMeasures: {
        title: {
          el: '11. Μέτρα Ασφάλειας (GDPR Article 32)',
          en: '11. Security Measures (GDPR Article 32)'
        },
        intro: {
          el: 'Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα:',
          en: 'We implement appropriate technical and organizational measures:'
        },
        measures: {
          el: [
            'Κρυπτογράφηση (TLS/SSL)',
            'Row-Level Security (RLS)',
            'Authentication & Authorization',
            'Regular Security Audits',
            'Access Controls',
            'Backup & Recovery',
            'Incident Response Plan'
          ],
          en: [
            'Encryption (TLS/SSL)',
            'Row-Level Security (RLS)',
            'Authentication & Authorization',
            'Regular Security Audits',
            'Access Controls',
            'Backup & Recovery',
            'Incident Response Plan'
          ]
        },
        details: {
          el: 'Για λεπτομέρειες, δείτε την Πολιτική Απορρήτου μας.',
          en: 'For details, see our Privacy Policy.'
        }
      },
      cookies: {
        title: {
          el: '12. Cookies & Analytics',
          en: '12. Cookies & Analytics'
        },
        intro: {
          el: 'Η εφαρμογή χρησιμοποιεί cookies για:',
          en: 'The app uses cookies for:'
        },
        uses: {
          el: [
            'Session management',
            'Authentication',
            'Αποθήκευση προτιμήσεων',
            'Analytics (με συναίνεση)'
          ],
          en: [
            'Session management',
            'Authentication',
            'Storing preferences',
            'Analytics (with consent)'
          ]
        },
        management: {
          el: 'Μπορείτε να διαχειριστείτε τα cookies από τις ρυθμίσεις της εφαρμογής ή του browser σας.',
          en: 'You can manage cookies from the app settings or your browser settings.'
        }
      },
      notifications: {
        title: {
          el: '13. Ειδοποιήσεις & Τοποθεσία',
          en: '13. Notifications & Location'
        },
        gpsTitle: {
          el: '13.1 Χρήση GPS',
          en: '13.1 Use of GPS'
        },
        gpsContent: {
          el: 'Η εφαρμογή χρησιμοποιεί δεδομένα τοποθεσίας (GPS) σε πραγματικό χρόνο για:',
          en: 'The app uses location data (GPS) in real-time for:'
        },
        gps: {
          el: [
            'Εντοπισμό διαθέσιμων θέσεων κοντά σας',
            'Αποστολή ειδοποιήσεων',
            'Πλοήγηση'
          ],
          en: [
            'Identifying available spots near you',
            'Sending notifications',
            'Navigation'
          ]
        },
        retentionTitle: {
          el: '13.2 Διατήρηση Δεδομένων Τοποθεσίας',
          en: '13.2 Location Data Retention'
        },
        retention: {
          el: [
            'Real-time data: Διαγράφεται άμεσα μετά τη χρήση',
            'Active reservations: Διατηρείται μόνο για τη διάρκεια της κράτησης'
          ],
          en: [
            'Real-time data: Deleted immediately after use',
            'Active reservations: Retained only for the duration of the reservation'
          ]
        }
      },
      dataBreaches: {
        title: {
          el: '14. Παραβιάσεις Δεδομένων (GDPR Articles 33-34)',
          en: '14. Data Breaches (GDPR Articles 33-34)'
        },
        intro: {
          el: 'Σε περίπτωση παραβίασης δεδομένων:',
          en: 'In case of a data breach:'
        },
        notification: {
          el: [
            'Ειδοποίηση Αρχής εντός 72 ωρών',
            'Ειδοποίηση χρηστών χωρίς αδικαιολόγητη καθυστέρηση (εάν ο κίνδυνος είναι υψηλός)'
          ],
          en: [
            'Notification to Authority within 72 hours',
            'Notification to users without undue delay (if the risk is high)'
          ]
        }
      },
      dataTransfer: {
        title: {
          el: '15. Μεταφορά Δεδομένων εκτός ΕΕ',
          en: '15. Data Transfer Outside the EU'
        },
        intro: {
          el: 'Ορισμένα από τα προσωπικά σας δεδομένα μπορεί να μεταφέρονται και να επεξεργάζονται εκτός της Ευρωπαϊκής Ένωσης (π.χ. Supabase backup servers, Google services).',
          en: 'Some of your personal data may be transferred and processed outside the European Union (e.g., Supabase backup servers, Google services).'
        },
        safeguards: {
          el: [
            'Adequacy Decisions: Οι χώρες έχουν επαρκές επίπεδο προστασίας (Adequacy Decision από την ΕΕ)',
            'Standard Contractual Clauses (SCCs): Χρησιμοποιούμε Standard Contractual Clauses που έχουν εγκριθεί από την Ευρωπαϊκή Επιτροπή',
            'Άλλα κατάλληλα μέτρα προστασίας: Σύμφωνα με το GDPR'
          ],
          en: [
            'Adequacy Decisions: Countries have adequate protection level (Adequacy Decision from EU)',
            'Standard Contractual Clauses (SCCs): We use Standard Contractual Clauses approved by the European Commission',
            'Other appropriate protection measures: In accordance with GDPR'
          ]
        }
      },
      contactData: {
        title: {
          el: '16. Επικοινωνία & Data Controller',
          en: '16. Contact & Data Controller'
        },
        controller: {
          el: 'Data Controller:',
          en: 'Data Controller:'
        },
        company: {
          el: 'T-Parking',
          en: 'T-Parking'
        },
        email: {
          el: 'Email:',
          en: 'Email:'
        },
        emailValue: {
          el: 'devtaskhub@gmail.com',
          en: 'devtaskhub@gmail.com'
        },
        support: {
          el: 'Υποστήριξη:',
          en: 'Support:'
        },
        authority: {
          el: 'Αρχή Προστασίας Δεδομένων:',
          en: 'Data Protection Authority:'
        },
        authorityValue: {
          el: 'www.dpa.gr | dpa@dpa.gr',
          en: 'www.dpa.gr | dpa@dpa.gr'
        }
      },
      liability: {
        title: {
          el: '17. Περιορισμός Ευθύνης',
          en: '17. Limitation of Liability'
        },
        asIsTitle: {
          el: '17.1 "As Is" Provision',
          en: '17.1 "As Is" Provision'
        },
        asIsContent: {
          el: 'Το T-Parking παρέχεται "ως έχει" (as is). Δεν εγγυόμαστε:',
          en: 'T-Parking is provided "as is." We do not guarantee:'
        },
        guarantees: {
          el: [
            'Ότι η εφαρμογή θα λειτουργεί αδιάλειπτα ή χωρίς σφάλματα',
            'Ότι οι θέσεις στάθμευσης θα είναι διαθέσιμες όταν φτάσετε',
            'Ότι οι ειδοποιήσεις θα παραδοθούν εγκαίρως ή πάντα',
            'Ότι δεν θα υπάρξουν technical issues ή downtime'
          ],
          en: [
            'That the app will operate continuously or without errors',
            'That parking spots will be available when you arrive',
            'That notifications will be delivered on time or always',
            'That there will be no technical issues or downtime'
          ]
        },
        limitationTitle: {
          el: '17.2 Περιορισμός Ευθύνης',
          en: '17.2 Limitation of Liability'
        },
        limitationContent: {
          el: 'Δεν φέρουμε ευθύνη για:',
          en: 'We are not responsible for:'
        },
        limitations: {
          el: [
            'Ζημίες, απώλειες, ή διαφορές που προκύπτουν από τη χρήση ή την αδυναμία χρήσης της εφαρμογής',
            'Κρατήσεις που δεν είναι διαθέσιμες όταν φτάσετε',
            'Ειδοποιήσεις που δεν παραδίδονται',
            'Σφάλματα στην εφαρμογή',
            'Απώλεια δεδομένων',
            'Παραβιάσεις ασφάλειας από τρίτους',
            'Προβλήματα με third-party services (Google Maps, Supabase, κ.ά.)',
            'Αναμενόμενα ή μη αναμενόμενα downtime'
          ],
          en: [
            'Damages, losses, or differences arising from use or inability to use the app',
            'Reservations that are not available when you arrive',
            'Notifications that are not delivered',
            'Errors in the app',
            'Data loss',
            'Security breaches by third parties',
            'Problems with third-party services (Google Maps, Supabase, etc.)',
            'Expected or unexpected downtime'
          ]
        },
        maximumTitle: {
          el: '17.3 Μέγιστη Ευθύνη',
          en: '17.3 Maximum Liability'
        },
        maximum: {
          el: 'Σημείωση: Η εφαρμογή είναι 100% δωρεάν - δεν υπάρχουν premium, platinum ή άλλα subscriptions με πληρωμή. Όλα τα features είναι διαθέσιμα δωρεάν σε όλους τους χρήστες. Κατά συνέπεια, η μέγιστη ευθύνη μας είναι €0.',
          en: 'Note: The app is 100% free - there are no premium, platinum, or other paid subscriptions. All features are available for free to all users. Consequently, our maximum liability is €0.'
        }
      },
      modifications: {
        title: {
          el: '18. Τροποποιήσεις Όρων',
          en: '18. Modifications of Terms'
        },
        rightTitle: {
          el: '18.1 Δικαίωμα Τροποποίησης',
          en: '18.1 Right to Modify'
        },
        rightContent: {
          el: 'Μπορούμε να τροποποιήσουμε αυτούς τους Όρους και Προϋποθέσεις Χρήσης οποιαδήποτε στιγμή.',
          en: 'We may modify these Terms and Conditions of Use at any time.'
        },
        notificationTitle: {
          el: '18.2 Ειδοποίηση Αλλαγών',
          en: '18.2 Change Notification'
        },
        notification: {
          el: [
            'Οι σημαντικές αλλαγές θα ανακοινωθούν μέσω της εφαρμογής ή email',
            'Η ημερομηνία "Τελευταία Ενημέρωση" θα ενημερώνεται στην κορυφή αυτής της σελίδας'
          ],
          en: [
            'Significant changes will be announced through the app or email',
            'The "Last Updated" date will be updated at the top of this page'
          ]
        },
        continuedUseTitle: {
          el: '18.3 Συνεχής Χρήση',
          en: '18.3 Continued Use'
        },
        continuedUse: {
          el: [
            'Η συνεχής χρήση της εφαρμογής μετά από τροποποιήσεις συνεπάγεται αποδοχή των νέων όρων',
            'Σας συνιστούμε να ελέγχετε τακτικά αυτή τη σελίδα για ενημερώσεις'
          ],
          en: [
            'Continued use of the app after modifications implies acceptance of the new terms',
            'We recommend that you check this page regularly for updates'
          ]
        }
      },
      termination: {
        title: {
          el: '19. Τερματισμός',
          en: '19. Termination'
        },
        byUsTitle: {
          el: '19.1 Τερματισμός από Εμάς',
          en: '19.1 Termination by Us'
        },
        byUsContent: {
          el: 'Διατηρούμε το δικαίωμα να τερματίσουμε ή να αναστείλουμε την πρόσβασή σας στην εφαρμογή χωρίς προειδοποίηση σε περίπτωση:',
          en: 'We reserve the right to terminate or suspend your access to the app without notice in case of:'
        },
        byUsReasons: {
          el: [
            'Παραβίασης αυτών των όρων',
            'Παράνομης χρήσης',
            'Κατάχρησης της υπηρεσίας',
            'Αίτημα διαγραφής λογαριασμού από εσάς'
          ],
          en: [
            'Violation of these terms',
            'Illegal use',
            'Service abuse',
            'Account deletion request from you'
          ]
        },
        byYouTitle: {
          el: '19.2 Τερματισμός από Εσάς',
          en: '19.2 Termination by You'
        },
        byYouContent: {
          el: 'Μπορείτε να τερματίσετε τη χρήση της εφαρμογής οποιαδήποτε στιγμή διαγράφοντας τον λογαριασμό σας.',
          en: 'You can terminate the use of the app at any time by deleting your account.'
        },
        afterTitle: {
          el: '19.3 Μετά τον Τερματισμό',
          en: '19.3 After Termination'
        },
        after: {
          el: [
            'Τα δεδομένα σας θα διαγραφούν σύμφωνα με την πολιτική διατήρησης (30 ημέρες)',
            'Δεν θα έχετε πρόσβαση στις υπηρεσίες της εφαρμογής',
            'Οι κρατήσεις και οι πόντοι σας δεν θα είναι διαθέσιμοι'
          ],
          en: [
            'Your data will be deleted according to the retention policy (30 days)',
            'You will not have access to the app services',
            'Your reservations and points will not be available'
          ]
        }
      },
      childrenData: {
        title: {
          el: '20. Δεδομένα Παιδιών (Άρθρο 8 GDPR)',
          en: '20. Children\'s Data (Article 8 GDPR)'
        },
        ageRestriction: {
          el: 'Η εφαρμογή T-Parking προορίζεται για χρήστες άνω των 18 ετών.',
          en: 'The T-Parking app is intended for users over 18 years of age.'
        },
        noChildren: {
          el: 'Δεν επιτρέπουμε την εγγραφή ή χρήση της εφαρμογής από χρήστες κάτω των 18 ετών.',
          en: 'We do not allow registration or use of the app by users under 18 years of age.'
        },
        termination: {
          el: 'Εάν ανακαλύψουμε ότι ένας χρήστης είναι κάτω των 18 ετών, θα τερματίσουμε άμεσα τον λογαριασμό του και θα διαγράψουμε όλα τα δεδομένα του.',
          en: 'If we discover that a user is under 18 years of age, we will immediately terminate their account and delete all their data.'
        },
        parentContact: {
          el: 'Εάν είστε γονέας ή κηδεμόνας και πιστεύετε ότι το παιδί σας έχει δημιουργήσει λογαριασμό, επικοινωνήστε μαζί μας στο: devtaskhub@gmail.com',
          en: 'If you are a parent or guardian and believe your child has created an account, contact us at: devtaskhub@gmail.com'
        }
      },
      specialCategories: {
        title: {
          el: '21. Ειδικές Κατηγορίες Δεδομένων (Άρθρο 9 GDPR)',
          en: '21. Special Categories of Data (Article 9 GDPR)'
        },
        content: {
          el: 'Δεν συλλέγουμε ή επεξεργαζόμαστε "ειδικές κατηγορίες" προσωπικών δεδομένων όπως ορίζονται στο Άρθρο 9 GDPR.',
          en: 'We do not collect or process "special categories" of personal data as defined in Article 9 GDPR.'
        }
      },
      automatedDecision: {
        title: {
          el: '22. Αυτοματοποιημένη Λήψη Αποφάσεων (Άρθρο 22 GDPR)',
          en: '22. Automated Decision-Making (Article 22 GDPR)'
        },
        content: {
          el: 'Δεν χρησιμοποιούμε αυτοματοποιημένη λήψη αποφάσεων ή profiling που παράγει νομικά αποτελέσματα ή επηρεάζει σημαντικά τα δικαιώματα ή τις ελευθερίες σας. Το σύστημα πόντων και rankings είναι καθαρά υπολογιστικό.',
          en: 'We do not use automated decision-making or profiling that produces legal effects or significantly affects your rights or freedoms. The points system and rankings are purely computational.'
        }
      },
      privacyByDesign: {
        title: {
          el: '23. Προστασία Δεδομένων από Σχεδιασμό (Άρθρο 25 GDPR)',
          en: '23. Data Protection by Design (Article 25 GDPR)'
        },
        intro: {
          el: 'Εφαρμόζουμε "Privacy by Design" και "Privacy by Default":',
          en: 'We apply "Privacy by Design" and "Privacy by Default":'
        },
        measures: {
          el: [
            'Συλλέγουμε μόνο τα απαραίτητα δεδομένα',
            'Κρυπτογράφηση ενεργή από προεπιλογή',
            'Προστατευτικές ρυθμίσεις από προεπιλογή'
          ],
          en: [
            'We collect only necessary data',
            'Encryption active by default',
            'Protective settings by default'
          ]
        }
      },
      processingRecords: {
        title: {
          el: '24. Καταγραφές Επεξεργασίας (Άρθρο 30 GDPR)',
          en: '24. Processing Records (Article 30 GDPR)'
        },
        content: {
          el: 'Διατηρούμε καταγραφές όλων των δραστηριοτήτων επεξεργασίας προσωπικών δεδομένων, διαθέσιμες για έλεγχο από την ΑΠΔΠΧ.',
          en: 'We maintain records of all personal data processing activities, available for inspection by the HDPA.'
        }
      },
      jurisdiction: {
        title: {
          el: '25. Δικαιοδοσία & Εφαρμοστέο Δίκαιο',
          en: '25. Jurisdiction & Applicable Law'
        },
        applicableTitle: {
          el: '25.1 Εφαρμοστέο Δίκαιο',
          en: '25.1 Applicable Law'
        },
        applicableIntro: {
          el: 'Αυτοί οι Όροι και Προϋποθέσεις Χρήσης διέπονται από:',
          en: 'These Terms and Conditions of Use are governed by:'
        },
        applicableLaws: {
          el: [
            'Ελληνικό Δίκαιο',
            'GDPR: Κανονισμός (ΕΕ) 2016/679',
            'Ελληνικός Νόμος 4624/2019'
          ],
          en: [
            'Greek Law',
            'GDPR: Regulation (EU) 2016/679',
            'Greek Law 4624/2019'
          ]
        },
        jurisdictionTitle: {
          el: '25.2 Δικαιοδοσία',
          en: '25.2 Jurisdiction'
        },
        jurisdictionContent: {
          el: 'Οποιαδήποτε διαφωνία που προκύπτει από ή σχετίζεται με αυτούς τους όρους θα επιλυθεί από τα αρμόδια δικαστήρια της Ελλάδας.',
          en: 'Any dispute arising from or related to these terms will be resolved by the competent courts of Greece.'
        },
        adrTitle: {
          el: '25.3 Εναλλακτική Επίλυση Διαφορών (ADR)',
          en: '25.3 Alternative Dispute Resolution (ADR)'
        },
        adrContent: {
          el: 'Για καταναλωτικές διαφορές, έχετε το δικαίωμα να καταφύγετε σε εναλλακτικές διαδικασίες επίλυσης διαφορών (ADR) σύμφωνα με το ελληνικό δίκαιο.',
          en: 'For consumer disputes, you have the right to resort to alternative dispute resolution (ADR) procedures in accordance with Greek law.'
        },
        authorityTitle: {
          el: '25.4 Εποπτική Αρχή',
          en: '25.4 Supervisory Authority'
        },
        authorityContent: {
          el: 'Η Ελληνική Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ) είναι η αρμόδια εποπτική αρχή για θέματα προστασίας δεδομένων.',
          en: 'The Hellenic Data Protection Authority (HDPA) is the competent supervisory authority for data protection matters.'
        }
      },
      severability: {
        title: {
          el: '26. Αναποτελεσματικότητα Ρήτρων',
          en: '26. Severability'
        },
        content: {
          el: 'Εάν οποιαδήποτε ρήτρα αυτών των όρων κριθεί άκυρη, παράνομη ή μη εφαρμόσιμη, οι υπόλοιπες ρήτρες παραμένουν σε ισχύ.',
          en: 'If any clause of these terms is found to be invalid, illegal, or unenforceable, the remaining clauses remain in effect.'
        }
      },
      disclaimer: {
        title: {
          el: '27. Αποποίηση Εγγυήσεων',
          en: '27. Disclaimer of Warranties'
        },
        intro: {
          el: 'Δεν παρέχουμε καμία εγγύηση, ρητή ή σιωπηρή, σχετικά με:',
          en: 'We provide no warranty, express or implied, regarding:'
        },
        warranties: {
          el: [
            'Τη διαθεσιμότητα ή την αδιάλειπτη λειτουργία της εφαρμογής',
            'Την ακρίβεια ή την πληρότητα των πληροφοριών',
            'Την απουσία σφαλμάτων ή bugs',
            'Τη συμβατότητα με συγκεκριμένες συσκευές ή λειτουργικά συστήματα'
          ],
          en: [
            'The availability or uninterrupted operation of the app',
            'The accuracy or completeness of information',
            'The absence of errors or bugs',
            'Compatibility with specific devices or operating systems'
          ]
        }
      },
      contact: {
        title: {
          el: '28. Επικοινωνία',
          en: '28. Contact'
        },
        intro: {
          el: 'Για οποιαδήποτε ερώτηση, αίτημα ή ανησυχία σχετικά με αυτούς τους Όρους και Προϋποθέσεις Χρήσης, επικοινωνήστε μαζί μας:',
          en: 'For any questions, requests, or concerns regarding these Terms and Conditions of Use, please contact us:'
        },
        email: {
          el: 'Email:',
          en: 'Email:'
        },
        emailValue: {
          el: 'devtaskhub@gmail.com',
          en: 'devtaskhub@gmail.com'
        },
        support: {
          el: 'Υποστήριξη:',
          en: 'Support:'
        },
        response: {
          el: 'Θα απαντήσουμε στο αίτημά σας εντός 30 ημερών (ή 90 ημερών σε περίπλοκες περιπτώσεις, με προηγούμενη ειδοποίηση).',
          en: 'We will respond to your request within 30 days (or 90 days in complex cases, with prior notice).'
        }
      },
      entireAgreement: {
        title: {
          el: '29. Ολική Συμφωνία',
          en: '29. Entire Agreement'
        },
        content: {
          el: 'Αυτοί οι Όροι και Προϋποθέσεις Χρήσης, μαζί με την Πολιτική Απορρήτου μας, αποτελούν την ολική συμφωνία μεταξύ εσάς και του T-Parking σχετικά με τη χρήση της εφαρμογής.',
          en: 'These Terms and Conditions of Use, together with our Privacy Policy, constitute the entire agreement between you and T-Parking regarding the use of the application.'
        }
      },
      lastUpdate: {
        el: 'Τελευταία Ενημέρωση: 7 Δεκεμβρίου 2025',
        en: 'Last Updated: December 7, 2025'
      },
      copyright: {
        el: '© 2025 T-Parking. Όλα τα δικαιώματα διατηρούνται.',
        en: '© 2025 T-Parking. All rights reserved.'
      }
    }
  },
  en: {
    hero: {
      title: "Find & Share Parking Spots Instantly",
      subtitle: "Your Smart Parking Solution",
      appStore: "App Store",
      googlePlay: "Google Play"
    },
    sections: {
      howItWorks: "How It Works",
      interactiveMap: "Interactive Map",
      features: "Key Features",
      pointsRewards: "Points & Rewards",
      notifications: "Notifications",
      settings: "Settings",
      support: "Support"
    },
    map: {
      title: "Real-time Spot Availability",
      description: "Our interactive map shows available parking spots with color-coded indicators:",
      smallSpots: "Small spots",
      mediumSpots: "Medium spots",
      largeSpots: "Large spots"
    },
    points: {
      title: "Earn While You Park",
      description: "Share your spot when leaving and earn points for free reservations. Track your global ranking and compete with other users.",
      pointPerRelease: "1 point per spot release",
      freeReservation: "Free reservation every 20 points",
      globalRanking: "Global leaderboard ranking"
    },
    notifications: {
      title: "Stay Updated",
      description: "Get instant notifications for new spots and navigate directly from alerts. Never miss a parking opportunity.",
      instantAlerts: "Instant spot availability alerts",
      oneTapNav: "One-tap navigation to spots",
      customPrefs: "Custom notification preferences"
    },
    settings: {
      title: "Customize Your Experience",
      description: "Personalize your app settings and track your parking history with detailed statistics.",
      language: "Language preferences",
      notifications: "Notification management",
      history: "Parking history & statistics"
    },
    support: {
      title: "Frequently Asked Questions",
      faq: [
        {
          question: "Does the app work in all cities?",
          answer: "Yes! T-Parking is available in over 100 cities and expanding continuously."
        },
        {
          question: "Is it safe to share my spot?",
          answer: "Absolutely safe — your location is protected and the spot is shared only when you leave."
        },
        {
          question: "What types of vehicles are supported?",
          answer: "All common passenger vehicles are supported."
        },
        {
          question: "Can I use the app without Internet?",
          answer: "Internet connection is required for real-time updates and points synchronization."
        },
        {
          question: "How do I contact support?",
          answer: "Email us at devtaskhub@gmail.com"
        },
        {
          question: "What do the spot colors mean?",
          answer: "Red = small, Yellow = medium, Green = large."
        },
        {
          question: "How do I navigate to a spot I found?",
          answer: "Tap the spot on the map and then \"Navigate\". Directions will open in the maps app."
        },
        {
          question: "How do I share a parking spot?",
          answer: "Select the spot size, tap \"Unpark\" and confirm — the spot is shared automatically and you earn points."
        }
      ]
    },
    cta: {
      title: "Get Started Now",
      subtitle: "Download the app and find parking in real-time",
      downloadNow: "Download Now",
      getStarted: "Get Started",
      readyToStart: "Ready to Start?",
      joinCommunity: "Sign up and join our community",
      ctaTitle: "Don't Waste Another Minute",
      ctaSubtitle: "Download the app now and find parking in seconds"
    },
    testimonials: {
      title: "What Our Users Say",
      subtitle: "Hundreds of drivers trust T-Parking",
      user1: {
        name: "Maria K.",
        location: "Athens",
        text: "The best parking app! It has saved me so many hours of searching for a spot.",
        image: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      user2: {
        name: "Nikos P.",
        location: "Thessaloniki",
        text: "The points system is excellent. I've already earned many free reservations!",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      user3: {
        name: "Eleni D.",
        location: "Patras",
        text: "Real-time notifications are a game changer. Never miss a spot again!",
        image: "https://randomuser.me/api/portraits/women/12.jpg"
      }
    },
    stats: {
      title: "Trusted By Many",
      items: [
        {
          number: "1,000+",
          label: "Registered Users"
        },
        {
          number: "100+",
          label: "Cities"
        },
        {
          number: "65%",
          label: "Less Search Time for Parking"
        },
        {
          number: "30%",
          label: "Less Fuel Consumption"
        }
      ]
    },
    footer: {
      quickLinks: "Quick Links",
      legal: "Legal",
      contact: "Contact",
      rights: "© 2025 T-Parking. All rights reserved.",
      home: "Home",
      features: "Features",
      plans: "Plans",
      support: "Support",
      terms: "Terms of Use",
      privacy: {
        el: 'Πολιτική Απορρήτου',
        en: 'Privacy Policy'
      },
      cookies: {
        el: 'Cookies',
        en: 'Cookies'
      },
      email: "Email: support@t-parking.gr",
      phone: "Phone: +30 210 1234567"
    },
    features: {
      liveMap: {
        title: "Live Map View",
        description: "See available spots in real-time with minute-by-minute updates"
      },
      instantReservations: {
        title: "Instant Reservations",
        description: "Reserve your spot with one tap and get instant confirmation"
      },
      shareEarn: {
        title: "Share & Earn",
        description: "Earn points when you share your spot with other drivers"
      },
      pointsSystem: {
        title: "Points System",
        description: "Collect points for free reservations and premium benefits"
      },
      realTimeUpdates: {
        title: "Real-time Updates",
        description: "Get instant notifications for new spots and availability changes"
      },
      communityDriven: {
        title: "Community Driven",
        description: "Part of a large community of drivers helping each other"
      }
    },
    steps: {
      openApp: {
        title: "Open the App",
        description: "Download the app and create your account"
      },
      findSpot: {
        title: "Find a Spot",
        description: "Use the map to find available spots near you"
      },
      reserveOrShare: {
        title: "Reserve or Share",
        description: "Book a seat with one tap or share yours when you leave, earning points every time."
      }
    },
    smartSection: {
      title: 'Smart Parking Solution',
      elTitle: 'Η Έξυπνη Λύση για το Parking στην Πόλη',
      el: [
        'Η εφαρμογή προσφέρει άμεση πρόσβαση σε διαθέσιμες θέσεις στάθμευσης στον δρόμο, σε πραγματικό χρόνο.',
        'Μέσα από έναν διαδραστικό χάρτη, οι χρήστες μπορούν να δουν και να κρατήσουν θέση με ένα μόνο πάτημα.',
        'Το σύστημα πόντων επιβραβεύει τους οδηγούς που μοιράζονται τη θέση τους, ενισχύοντας την κοινότητα και διευκολύνοντας την εύρεση parking στις αστικές περιοχές.',
        'Επιπλέον, η εφαρμογή υπολογίζει τον χρόνο και τα χρήματα που εξοικονομεί κάθε χρήστης, προσφέροντας ξεκάθαρη εικόνα των καθημερινών οφελών.',
        'Ιδανική για καθημερινή χρήση, η εφαρμογή συνδυάζει ευκολία, αξιοπιστία και συνεργασία.'
      ],
      en: [
        'The app provides instant access to available on-street parking spots in real time.',
        'Through an interactive map, users can view and reserve parking spots with a single tap.',
        'The point-based system rewards drivers who share their spots, strengthening the community and making it easier to find parking in urban areas.',
        'Additionally, the app calculates the time and money each user saves, offering a clear picture of the daily benefits.',
        'Ideal for everyday use, the app combines convenience, reliability, and collaboration.'
      ]
    },
    terms: {
      title: {
        el: 'Όροι & Προϋποθέσεις – T-Parking',
        en: 'Terms & Conditions – T-Parking'
      },
      lastUpdated: {
        el: 'Τελευταία ενημέρωση: Ιούνιος 2024',
        en: 'Last updated: June 2024'
      },
      welcome: {
        el: 'Καλώς ήρθατε στο T-Parking, την έξυπνη εφαρμογή για εύρεση στάθμευσης σε πραγματικό χρόνο. Με τη χρήση της εφαρμογής, αποδέχεστε τους παρακάτω όρους χρήσης. Παρακαλούμε διαβάστε προσεκτικά.',
        en: 'Welcome to T-Parking, the smart app for real-time parking discovery. By using the app, you accept the following terms of use. Please read them carefully.'
      },
      acceptance: {
        title: {
          el: 'Αποδοχή Όρων',
          en: 'Acceptance of Terms'
        },
        content: {
          el: 'Με την πρόσβασή σας στο T-Parking, δηλώνετε ότι συμφωνείτε με τους παρόντες όρους. Εάν δεν συμφωνείτε, παρακαλούμε μην χρησιμοποιείτε την υπηρεσία.',
          en: 'By accessing T-Parking, you agree to these terms. If you do not agree, please do not use the service.'
        }
      },
      overview: {
        title: {
          el: '1. Τι προσφέρει η υπηρεσία',
          en: '1. What the service offers'
        },
        description: {
          el: 'Το T-Parking σας βοηθά να βρίσκετε, να κλείνετε και να μοιράζεστε θέσεις στάθμευσης εύκολα. Περιλαμβάνει:',
          en: 'T-Parking helps you find, reserve, and share parking spots easily. It includes:'
        },
        features: {
          el: [
            'Ζωντανό χάρτη',
            'Ειδοποιήσεις σε πραγματικό χρόνο',
            'Σύστημα πόντων & ανταμοιβών',
            'Δωρεάν, Premium & Platinum λειτουργίες',
            'Ιστορικό στάθμευσης και κοινοποιήσεων'
          ],
          en: [
            'Live map',
            'Real-time notifications',
            'Points & rewards system',
            'Free, Premium & Platinum features',
            'Parking and sharing history'
          ]
        }
      },
      registration: {
        title: {
          el: '2. Εγγραφή & Προσωπικός Λογαριασμός',
          en: '2. Registration & Personal Account'
        },
        content: {
          el: 'Απαιτείται δημιουργία λογαριασμού με έγκυρα στοιχεία. Είστε υπεύθυνοι για την ασφάλεια του λογαριασμού σας.',
          en: 'You are required to create an account with valid information. You are responsible for the security of your account.'
        }
      },
      acceptableUse: {
        title: {
          el: '3. Επιτρεπόμενη Χρήση',
          en: '3. Acceptable Use'
        },
        content: {
          el: 'Η χρήση της εφαρμογής επιτρέπεται μόνο για νόμιμους σκοπούς. Απαγορεύεται η παραπλανητική χρήση, παροχή ψευδών πληροφοριών ή παραβίαση δικαιωμάτων τρίτων.',
          en: 'The app may only be used for lawful purposes. Misleading use, providing false information, or violating third-party rights is strictly prohibited.'
        }
      },
      subscriptions: {
        title: {
          el: '4. Συνδρομές & Πληρωμές',
          en: '4. Subscriptions & Payments'
        },
        content: {
          el: 'Οι Premium και Platinum χρήστες αποκτούν πρόσβαση σε επιπλέον προνόμια (όπως προτεραιότητα στις κρατήσεις, δώρα, ειδοποιήσεις). Όροι πληρωμής/ακύρωσης περιγράφονται στη σελίδα τιμολόγησης. Η συνδρομή ακυρώνεται οποτεδήποτε.',
          en: 'Premium and Platinum users gain access to extra benefits (such as booking priority, rewards, notifications). Payment/cancellation terms are described on the pricing page. You can cancel your subscription at any time.'
        }
      },
      reservations: {
        title: {
          el: '5. Κρατήσεις & Σύστημα Πόντων',
          en: '5. Reservations & Points System'
        },
        content: {
          el: 'Οι Platinum χρήστες και όσοι διαθέτουν δωρεάν κράτηση μπορούν να δεσμεύσουν θέση. Για κάθε 30 επιβεβαιωμένες κοινοποιήσεις, κερδίζετε μία δωρεάν κράτηση. Οι πόντοι καθορίζουν στατιστικά, κατάταξη και προνόμια.',
          en: 'Platinum users and those with a free reservation can reserve a spot. For every 30 confirmed shares, you earn a free reservation. Points determine your stats, ranking, and privileges.'
        }
      },
      notifications: {
        title: {
          el: '6. Ειδοποιήσεις & Τοποθεσία',
          en: '6. Notifications & Location'
        },
        content: {
          el: 'Το T-Parking χρησιμοποιεί τα δεδομένα τοποθεσίας σας για να σας στέλνει ειδοποιήσεις σχετικά με διαθεσιμότητα. Μπορείτε να διαχειρίζεστε αυτές τις ρυθμίσεις από τη συσκευή σας.',
          en: 'T-Parking uses your location data to send you notifications about availability. You can manage these settings from your device.'
        }
      },
      history: {
        title: {
          el: '7. Ιστορικό Χρήσης',
          en: '7. Usage History'
        },
        content: {
          el: 'Καταγράφεται το ιστορικό των κρατήσεων και κοινοποιήσεων. Μπορείτε να το διαγράψετε όποτε το επιθυμείτε.',
          en: 'Your reservation and sharing history is recorded. You can delete it whenever you wish.'
        }
      },
      privacy: {
        title: {
          el: 'Πολιτική Απορρήτου',
          en: 'Privacy Policy'
        },
        intro: {
          el: 'Η προστασία των προσωπικών σας δεδομένων είναι προτεραιότητα για το T-Parking. Αυτή η πολιτική εξηγεί πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τις πληροφορίες σας.',
          en: 'Protecting your personal data is a priority for T-Parking. This policy explains how we collect, use, and protect your information.'
        },
        collectTitle: {
          el: 'Πληροφορίες που Συλλέγουμε',
          en: 'Information We Collect'
        },
        collect: {
          el: [
            'Στοιχεία λογαριασμού (όνομα, email, τηλέφωνο)',
            'Δεδομένα τοποθεσίας',
            'Ιστορικό στάθμευσης',
            'Στατιστικά χρήσης',
            'Πληροφορίες συσκευής'
          ],
          en: [
            'Account information (name, email, phone)',
            'Location data',
            'Parking history',
            'Usage statistics',
            'Device information'
          ]
        },
        usageTitle: {
          el: 'Πώς Χρησιμοποιούμε τις Πληροφορίες',
          en: 'How We Use Information'
        },
        usage: {
          el: [
            'Παροχή υπηρεσιών στάθμευσης',
            'Βελτίωση της εφαρμογής',
            'Αποστολή ειδοποιήσεων',
            'Ανάλυση χρήσης',
            'Εξατομικοποίηση εμπειρίας'
          ],
          en: [
            'Providing parking services',
            'Improving the app',
            'Sending notifications',
            'Usage analysis',
            'Personalizing experience'
          ]
        },
        shareTitle: {
          el: 'Κοινή Χρήση Πληροφοριών',
          en: 'Information Sharing'
        },
        share: {
          el: [
            'Μόνο με τη συγκατάθεσή σας',
            'Με παρόχους υπηρεσιών',
            'Για νομικές υποχρεώσεις',
            'Για την ασφάλεια των χρηστών'
          ],
          en: [
            'Only with your consent',
            'With service providers',
            'For legal obligations',
            'For user safety'
          ]
        },
        securityTitle: {
          el: 'Ασφάλεια Δεδομένων',
          en: 'Data Security'
        },
        security: {
          el: 'Χρησιμοποιούμε κρυπτογράφηση και άλλα μέτρα ασφαλείας για την προστασία των δεδομένων σας. Ωστόσο, καμία μέθοδος μετάδοσης στο διαδίκτυο δεν είναι 100% ασφαλής.',
          en: 'We use encryption and other security measures to protect your data. However, no method of transmission over the internet is 100% secure.'
        },
        rightsTitle: {
          el: 'Δικαιώματα Χρηστών',
          en: 'User Rights'
        },
        rights: {
          el: [
            'Πρόσβαση στα δεδομένα σας',
            'Διόρθωση ανακριβών πληροφοριών',
            'Διαγραφή δεδομένων',
            'Εξαγωγή δεδομένων',
            'Αντίρρηση στην επεξεργασία'
          ],
          en: [
            'Access your data',
            'Correct inaccurate information',
            'Delete your data',
            'Export your data',
            'Object to processing'
          ]
        },
        rightsContact: {
          el: 'Για να ασκήσετε τα δικαιώματά σας, επικοινωνήστε στο privacy@t-parking.gr',
          en: 'To exercise your rights, contact privacy@t-parking.gr'
        },
        retentionTitle: {
          el: 'Διάρκεια Διατήρησης',
          en: 'Data Retention'
        },
        retention: {
          el: 'Διατηρούμε τα δεδομένα σας μόνο για όσο χρόνο είναι απαραίτητο για τους σκοπούς που συλλέχθηκαν, εκτός αν απαιτείται διατήρηση για νομικούς λόγους.',
          en: 'We retain your data only for as long as necessary for the purposes collected, unless retention is required for legal reasons.'
        },
        changesTitle: {
          el: 'Αλλαγές στην Πολιτική',
          en: 'Policy Changes'
        },
        changes: {
          el: 'Μπορούμε να ενημερώσουμε αυτή την πολιτική. Οι σημαντικές αλλαγές θα ανακοινωθούν μέσω της εφαρμογής.',
          en: 'We may update this policy. Significant changes will be announced through the app.'
        },
        contactTitle: {
          el: 'Επικοινωνία',
          en: 'Contact'
        },
        contact: {
          el: 'Για ερωτήσεις σχετικά με την πολιτική απορρήτου, επικοινωνήστε στο privacy@t-parking.gr',
          en: 'For questions about this privacy policy, contact privacy@t-parking.gr'
        }
      },
      liability: {
        title: {
          el: '9. Περιορισμός Ευθύνης',
          en: '9. Limitation of Liability'
        },
        content: {
          el: 'Το T-Parking παρέχεται "ως έχει". Ο πάροχος δεν ευθύνεται για ζημιές ή απώλειες που προκύπτουν από τη χρήση της υπηρεσίας (π.χ. κρατήσεις, ειδοποιήσεις, καθυστερήσεις).',
          en: 'T-Parking is provided "as is." The provider is not liable for any damages or losses arising from the use of the service (e.g. reservations, notifications, delays).'
        }
      },
      modifications: {
        title: {
          el: '10. Τροποποιήσεις Όρων',
          en: '10. Modifications of Terms'
        },
        content: {
          el: 'Οι όροι χρήσης ενδέχεται να αλλάξουν. Οι αλλαγές θα ανακοινώνονται μέσα από την εφαρμογή.',
          en: 'The terms of use may change. Changes will be announced through the app.'
        }
      },
      googleSignIn: {
        title: {
          el: '13. Είσοδος μέσω Google',
          en: '13. Google Sign-in'
        },
        content: {
          el: 'Αν επιλέξετε να συνδεθείτε μέσω Google, αποδέχεστε αυτόματα και τους όρους χρήσης της Google, εκτός από τους παρόντες.',
          en: "If you choose to sign in via Google, you automatically accept Google's terms of use in addition to these terms."
        }
      },
      termination: {
        title: {
          el: '11. Τερματισμός Πρόσβασης',
          en: '11. Termination of Access'
        },
        content: {
          el: 'Σε περίπτωση παραβίασης των όρων, η πρόσβασή σας μπορεί να διακοπεί ή να περιοριστεί χωρίς προειδοποίηση.',
          en: 'In case of violation of the terms, your access may be suspended or restricted without notice.'
        }
      },
      support: {
        title: {
          el: '12. Υποστήριξη',
          en: '12. Support'
        },
        content: {
          el: 'Για απορίες ή τεχνική βοήθεια, επικοινωνήστε στο: support@t-parking.gr',
          en: 'For questions or technical support, contact: support@t-parking.gr'
        }
      },
      privacyProtection: {
        title: {
          el: '8. Προστασία Προσωπικών Δεδομένων',
          en: '8. Personal Data Protection'
        },
        content: {
          el: 'Η επεξεργασία προσωπικών δεδομένων γίνεται σύμφωνα με την Πολιτική Απορρήτου. Χρησιμοποιώντας την εφαρμογή, συναινείτε στη συλλογή και χρήση των στοιχείων σας.',
          en: 'Personal data is processed in accordance with the Privacy Policy. By using the app, you consent to the collection and use of your information.'
        }
      }
    },
    cookies: {
      title: {
        el: 'Πολιτική Cookies',
        en: 'Cookies Policy'
      },
      intro: {
        el: 'Η ιστοσελίδα μας χρησιμοποιεί cookies για να βελτιώσει την εμπειρία χρήστη και να συλλέξει ανώνυμα στατιστικά στοιχεία.',
        en: 'Our website uses cookies to improve user experience and collect anonymous statistics.'
      },
      whatAreCookiesTitle: {
        el: 'Τι είναι τα Cookies;',
        en: 'What are Cookies?'
      },
      whatAreCookies: {
        el: 'Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στον υπολογιστή ή στη συσκευή σας όταν επισκέπτεστε μια ιστοσελίδα. Χρησιμοποιούνται για να βελτιώσουν την εμπειρία χρήστη, να αποθηκεύσουν προτιμήσεις και να συλλέξουν ανώνυμα στατιστικά στοιχεία.',
        en: 'Cookies are small text files stored on your computer or device when you visit a website. They are used to improve user experience, store preferences, and collect anonymous statistics.'
      },
      usageTitle: {
        el: 'Πώς χρησιμοποιούμε τα Cookies;',
        en: 'How do we use Cookies?'
      },
      usage: {
        el: [
          'Λειτουργικότητα: Για να θυμόμαστε τις προτιμήσεις σας και να βελτιώσουμε την πλοήγηση.',
          'Ανάλυση: Για να συλλέγουμε ανώνυμα δεδομένα σχετικά με τη χρήση της ιστοσελίδας μέσω εργαλείων όπως το Google Analytics.',
          'Διαφήμιση: Για να προσαρμόζουμε διαφημίσεις σύμφωνα με τα ενδιαφέροντά σας (αν εφαρμόζεται).'
        ],
        en: [
          'Functionality: To remember your preferences and improve navigation.',
          'Analytics: To collect anonymous data about website usage via tools like Google Analytics.',
          'Advertising: To tailor ads according to your interests (if applicable).'
        ]
      },
      typesTitle: {
        el: 'Τύποι Cookies που χρησιμοποιούμε',
        en: 'Types of Cookies we use'
      },
      types: {
        el: [
          'Απαραίτητα Cookies: Βασικά για τη λειτουργία της ιστοσελίδας και την ασφάλειά της. Δεν μπορούν να απενεργοποιηθούν.',
          'Λειτουργικά Cookies: Βοηθούν στην αποθήκευση επιλογών και προτιμήσεων (π.χ. γλώσσα).',
          'Cookies Ανάλυσης: Συλλέγουν πληροφορίες για το πώς οι επισκέπτες χρησιμοποιούν την ιστοσελίδα ώστε να τη βελτιώνουμε.',
          'Διαφημιστικά Cookies: Χρησιμοποιούνται για στόχευση διαφημίσεων βάσει της συμπεριφοράς σας.'
        ],
        en: [
          'Necessary Cookies: Essential for the operation and security of the website. Cannot be disabled.',
          'Functional Cookies: Help store choices and preferences (e.g. language).',
          'Analytics Cookies: Collect information on how visitors use the website to help us improve it.',
          'Advertising Cookies: Used for ad targeting based on your behavior.'
        ]
      },
      managementTitle: {
        el: 'Διαχείριση Cookies',
        en: 'Managing Cookies'
      },
      management: {
        el: 'Μπορείτε να διαχειριστείτε ή να απενεργοποιήσετε τα cookies μέσω των ρυθμίσεων του browser σας. Λάβετε υπόψη ότι η απενεργοποίηση ορισμένων cookies μπορεί να επηρεάσει τη λειτουργικότητα της ιστοσελίδας.',
        en: 'You can manage or disable cookies through your browser settings. Note that disabling some cookies may affect the functionality of the website.'
      },
      consentTitle: {
        el: 'Συγκατάθεση',
        en: 'Consent'
      },
      consent: {
        el: 'Συνεχίζοντας να χρησιμοποιείτε την ιστοσελίδα μας χωρίς να αλλάξετε τις ρυθμίσεις cookies, συμφωνείτε με τη χρήση τους σύμφωνα με την παρούσα πολιτική.',
        en: 'By continuing to use our website without changing your cookie settings, you agree to their use according to this policy.'
      }
    },
    privacyPolicy: {
      title: {
        el: 'Πολιτική Απορρήτου - T-Parking',
        en: 'Privacy Policy - T-Parking'
      },
      lastUpdated: {
        el: 'Τελευταία Ενημέρωση: 7 Δεκεμβρίου 2025',
        en: 'Last Updated: December 7, 2025'
      },
      introduction: {
        el: 'Καλώς ήρθατε στο T-Parking. Η παρούσα Πολιτική Απορρήτου περιγράφει τον τρόπο με τον οποίο συλλέγουμε, χρησιμοποιούμε, αποθηκεύουμε και προστατεύουμε τα προσωπικά σας δεδομένα κατά τη χρήση της εφαρμογής μας. Παρακαλούμε διαβάστε προσεκτικά αυτή την πολιτική απορρήτου πριν από τη χρήση της εφαρμογής. Η παρούσα πολιτική απορρήτου συντάχθηκε σύμφωνα με τον Κανονισμό (ΕΕ) 2016/679 για την Προστασία των Προσωπικών Δεδομένων (GDPR) και το Ελληνικό νόμο 4624/2019.',
        en: 'Welcome to T-Parking. This Privacy Policy describes how we collect, use, store, and protect your personal data when using our application. Please read this privacy policy carefully before using the application. This privacy policy was drafted in accordance with Regulation (EU) 2016/679 on the Protection of Personal Data (GDPR) and Greek Law 4624/2019.'
      },
      dataController: {
        title: {
          el: '2. Διαχειριστής Δεδομένων (Data Controller)',
          en: '2. Data Controller'
        },
        controller: {
          el: 'Διαχειριστής Δεδομένων:',
          en: 'Data Controller:'
        },
        company: {
          el: 'T-Parking',
          en: 'T-Parking'
        },
        email: {
          el: 'Email:',
          en: 'Email:'
        },
        emailValue: {
          el: 'devtaskhub@gmail.com',
          en: 'devtaskhub@gmail.com'
        },
        support: {
          el: 'Υποστήριξη:',
          en: 'Support:'
        },
        contact: {
          el: 'Για οποιαδήποτε ερώτηση, αίτημα άσκησης δικαιωμάτων ή καταγγελία σχετικά με την επεξεργασία των προσωπικών σας δεδομένων, μπορείτε να επικοινωνήσετε μαζί μας στο παραπάνω email. Έχετε επίσης το δικαίωμα να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ) στη διεύθυνση: www.dpa.gr ή dpa@dpa.gr',
          en: 'For any questions, requests to exercise rights, or complaints regarding the processing of your personal data, you can contact us at the above email. You also have the right to file a complaint with the Hellenic Data Protection Authority (HDPA) at: www.dpa.gr or dpa@dpa.gr'
        }
      },
      personalData: {
        title: {
          el: '3. Προσωπικά Δεδομένα που Συλλέγονται (Άρθρο 13 GDPR)',
          en: '3. Personal Data Collected (Article 13 GDPR)'
        },
        intro: {
          el: 'Συλλέγουμε και επεξεργαζόμαστε τα ακόλουθα προσωπικά δεδομένα σας:',
          en: 'We collect and process the following personal data:'
        },
        registrationTitle: {
          el: '3.1 Δεδομένα Εγγραφής και Λογαριασμού',
          en: '3.1 Registration and Account Data'
        },
        registration: {
          el: [
            'Ονοματεπώνυμο (πλήρες όνομα)',
            'Διεύθυνση Email',
            'Κωδικός πρόσβασης (αποθηκευμένος με κρυπτογράφηση)'
          ],
          en: [
            'Full name',
            'Email address',
            'Password (stored encrypted)'
          ]
        },
        locationTitle: {
          el: '3.2 Δεδομένα Τοποθεσίας (GPS)',
          en: '3.2 Location Data (GPS)'
        },
        location: {
          el: [
            'Συντεταγμένες GPS (latitude, longitude) σε πραγματικό χρόνο όταν η εφαρμογή είναι ενεργή',
            'Χρονική σήμανση των δεδομένων τοποθεσίας',
            'Δεδομένα θέσης στάθμευσης που μοιράζεστε ή κάνετε reserve'
          ],
          en: [
            'GPS coordinates (latitude, longitude) in real-time when the app is active',
            'Timestamp of location data',
            'Parking location data that you share or reserve'
          ]
        },
        locationNote: {
          el: 'Σημείωση: Τα δεδομένα τοποθεσίας δεν αποθηκεύονται μακροπρόθεσμα και διαγράφονται άμεσα μετά τη χρήση τους, εκτός εάν είναι απαραίτητα για την παροχή της υπηρεσίας (π.χ. ενεργή κράτηση θέσης).',
          en: 'Note: Location data is not stored long-term and is deleted immediately after use, unless necessary for service provision (e.g., active spot reservation).'
        },
        usageTitle: {
          el: '3.3 Δεδομένα Χρήσης',
          en: '3.3 Usage Data'
        },
        usage: {
          el: [
            'Ιστορικό κοινοποίησης θέσεων (parking spots που έχετε μοιραστεί)',
            'Κρατήσεις θέσεων (reservations)',
            'Πόντοι και βαθμολογία (points, scores, rankings)',
            'Στατιστικά χρήσης (χρόνος εξοικονόμησης, χρήματα εξοικονόμησης)',
            'Ιστορικό κινήσεων'
          ],
          en: [
            'Parking spot sharing history (spots you have shared)',
            'Spot reservations',
            'Points and scores (points, scores, rankings)',
            'Usage statistics (time saved, money saved)',
            'Movement history'
          ]
        },
        deviceTitle: {
          el: '3.4 Δεδομένα Συσκευής',
          en: '3.4 Device Data'
        },
        device: {
          el: [
            'Τύπος συσκευής (κινητό, tablet)',
            'Λειτουργικό σύστημα (iOS, Android)',
            'Αναγνωριστικό συσκευής (device identifier)',
            'Έκδοση εφαρμογής'
          ],
          en: [
            'Device type (mobile, tablet)',
            'Operating system (iOS, Android)',
            'Device identifier',
            'App version'
          ]
        },
        cookiesTitle: {
          el: '3.5 Δεδομένα Cookies και Analytics',
          en: '3.5 Cookies and Analytics Data'
        },
        cookies: {
          el: [
            'Cookies για την αποθήκευση προτιμήσεων (γλώσσα, ρυθμίσεις)',
            'Analytics data για ανάλυση χρήσης (προαιρετικά, με συναίνεση)'
          ],
          en: [
            'Cookies for storing preferences (language, settings)',
            'Analytics data for usage analysis (optional, with consent)'
          ]
        },
        notificationsTitle: {
          el: '3.6 Δεδομένα Ειδοποιήσεων',
          en: '3.6 Notification Data'
        },
        notifications: {
          el: [
            'Push notification tokens για αποστολή ειδοποιήσεων',
            'Προτιμήσεις ειδοποιήσεων (ενεργές/απενεργές)'
          ],
          en: [
            'Push notification tokens for sending notifications',
            'Notification preferences (active/inactive)'
          ]
        },
        contactsTitle: {
          el: '3.7 Δεδομένα Επαφών/Φίλων (εάν υπάρχει λειτουργικότητα)',
          en: '3.7 Contacts/Friends Data (if functionality exists)'
        },
        contacts: {
          el: [
            'Λίστα φίλων/επαφών (εάν χρησιμοποιείτε τη λειτουργικότητα προτεραιότητας φίλων)'
          ],
          en: [
            'Friends/contacts list (if you use the friend priority functionality)'
          ]
        },
        importantNotes: {
          el: [
            'Δεν συλλέγουμε ή επεξεργαζόμαστε "ειδικές κατηγορίες" προσωπικών δεδομένων όπως ορίζονται στο Άρθρο 9 GDPR (δεδομένα που αποκαλύπτουν φυλετική ή εθνοτική καταγωγή, πολιτικές απόψεις, θρησκευτικές ή φιλοσοφικές πεποιθήσεις, δεδομένα υγείας, βιομετρικά δεδομένα, κ.ά.)',
            'Δεν συλλέγουμε ή επεξεργαζόμαστε δεδομένα πληρωμών - η εφαρμογή είναι 100% δωρεάν και δεν διαθέτει premium, platinum ή άλλα subscriptions με πληρωμή'
          ],
          en: [
            'We do not collect or process "special categories" of personal data as defined in Article 9 GDPR (data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, health data, biometric data, etc.)',
            'We do not collect or process payment data - the app is 100% free and does not have premium, platinum, or other paid subscriptions'
          ]
        }
      },
      legalBasis: {
        title: {
          el: '4. Νομική Βάση Επεξεργασίας (Άρθρο 6 GDPR)',
          en: '4. Legal Basis for Processing (Article 6 GDPR)'
        },
        intro: {
          el: 'Η επεξεργασία των προσωπικών σας δεδομένων βασίζεται στις ακόλουθες νομικές βάσεις:',
          en: 'The processing of your personal data is based on the following legal bases:'
        },
        contractTitle: {
          el: '4.1 Εκτέλεση Συμβολαίου (Contract Performance)',
          en: '4.1 Contract Performance'
        },
        contract: {
          el: [
            'Παροχή βασικών υπηρεσιών της εφαρμογής (εύρεση θέσεων, κρατήσεις, πλοήγηση)',
            'Διαχείριση λογαριασμού (εγγραφή, είσοδος, διαχείριση προφίλ)',
            'Επεξεργασία κρατήσεων και συστήματος πόντων'
          ],
          en: [
            'Providing basic app services (finding spots, reservations, navigation)',
            'Account management (registration, login, profile management)',
            'Processing reservations and points system'
          ]
        },
        consentTitle: {
          el: '4.2 Συναίνεση (Consent)',
          en: '4.2 Consent'
        },
        consent: {
          el: [
            'Marketing communications (εάν συναινείτε)',
            'Analytics data (προαιρετικά, με συναίνεση)',
            'Push notifications (με συναίνεση)'
          ],
          en: [
            'Marketing communications (if you consent)',
            'Analytics data (optional, with consent)',
            'Push notifications (with consent)'
          ]
        },
        legitimateTitle: {
          el: '4.3 Νόμιμο Συμφέρον (Legitimate Interest)',
          en: '4.3 Legitimate Interest'
        },
        legitimate: {
          el: [
            'Βελτίωση της εφαρμογής (ανάλυση χρήσης, στατιστικά)',
            'Ασφάλεια και πρόληψη απάτης (detection και prevention fraud)',
            'Τεχνική συντήρηση και ανάπτυξη νέων λειτουργιών'
          ],
          en: [
            'Improving the app (usage analysis, statistics)',
            'Security and fraud prevention (fraud detection and prevention)',
            'Technical maintenance and development of new features'
          ]
        },
        legalTitle: {
          el: '4.4 Νομική Υποχρέωση (Legal Obligation)',
          en: '4.4 Legal Obligation'
        },
        legal: {
          el: [
            'Συμμόρφωση με νόμους και κανονισμούς (περιλαμβανομένου του GDPR)',
            'Διατήρηση δεδομένων για λογιστικούς/φορολογικούς σκοπούς (εάν απαιτείται)'
          ],
          en: [
            'Compliance with laws and regulations (including GDPR)',
            'Data retention for accounting/tax purposes (if required)'
          ]
        }
      },
      processingPurpose: {
        title: {
          el: '5. Σκοπός Επεξεργασίας',
          en: '5. Purpose of Processing'
        },
        intro: {
          el: 'Τα προσωπικά σας δεδομένα επεξεργάζονται για τους ακόλουθους σκοπούς:',
          en: 'Your personal data is processed for the following purposes:'
        },
        servicesTitle: {
          el: '5.1 Παροχή και Βελτίωση Υπηρεσιών',
          en: '5.1 Service Provision and Improvement'
        },
        services: {
          el: [
            'Εντοπισμός και εμφάνιση διαθέσιμων θέσεων στάθμευσης σε πραγματικό χρόνο',
            'Παροχή πλοήγησης προς τις θέσεις στάθμευσης (μέσω Google Maps)',
            'Επεξεργασία κρατήσεων θέσεων',
            'Διαχείριση συστήματος πόντων και επιβραβεύσεων'
          ],
          en: [
            'Identifying and displaying available parking spots in real-time',
            'Providing navigation to parking spots (via Google Maps)',
            'Processing spot reservations',
            'Managing points system and rewards'
          ]
        },
        communicationTitle: {
          el: '5.2 Επικοινωνία με Χρήστες',
          en: '5.2 User Communication'
        },
        communication: {
          el: [
            'Αποστολή ειδοποιήσεων για κοντινές διαθέσιμες θέσεις',
            'Ενημέρωση για αλλαγές στους όρους ή τις πολιτικές μας',
            'Απάντηση σε αιτήματα υποστήριξης'
          ],
          en: [
            'Sending notifications for nearby available spots',
            'Notifying about changes to our terms or policies',
            'Responding to support requests'
          ]
        },
        analysisTitle: {
          el: '5.3 Ανάλυση και Βελτίωση',
          en: '5.3 Analysis and Improvement'
        },
        analysis: {
          el: [
            'Ανάλυση χρήσης για βελτίωση της εφαρμογής',
            'Ανάπτυξη νέων λειτουργιών',
            'Παροχή στατιστικών και αναφορών'
          ],
          en: [
            'Usage analysis to improve the app',
            'Development of new features',
            'Providing statistics and reports'
          ]
        },
        securityTitle: {
          el: '5.4 Ασφάλεια και Πρόληψη Απάτης',
          en: '5.4 Security and Fraud Prevention'
        },
        security: {
          el: [
            'Ανίχνευση και πρόληψη αθέμιτης χρήσης',
            'Προστασία της ασφάλειας των χρηστών',
            'Διασφάλιση της ακεραιότητας της εφαρμογής'
          ],
          en: [
            'Detecting and preventing misuse',
            'Protecting user security',
            'Ensuring app integrity'
          ]
        },
        complianceTitle: {
          el: '5.5 Συμμόρφωση με Νομικές Υποχρεώσεις',
          en: '5.5 Compliance with Legal Obligations'
        },
        compliance: {
          el: [
            'Συμμόρφωση με το GDPR και άλλους εφαρμοστέους νόμους',
            'Ανταπόκριση σε νομικές απαιτήσεις και διαταγές'
          ],
          en: [
            'Compliance with GDPR and other applicable laws',
            'Responding to legal requirements and orders'
          ]
        },
        realTimeTitle: {
          el: '5.6 Παροχή Υπηρεσιών σε Πραγματικό Χρόνο',
          en: '5.6 Real-Time Service Provision'
        },
        realTime: {
          el: [
            'Όλες οι ενημερώσεις για διαθέσιμες θέσεις στάθμευσης παρέχονται αμέσως σε πραγματικό χρόνο χωρίς καθυστερήσεις',
            'Όλα τα features είναι 100% δωρεάν και διαθέσιμα σε όλους τους χρήστες'
          ],
          en: [
            'All updates on available parking spots are provided immediately in real-time without delays',
            'All features are 100% free and available to all users'
          ]
        }
      },
      userRights: {
        title: {
          el: '6. Δικαιώματα Χρήστη (Άρθρα 15-22 GDPR)',
          en: '6. User Rights (Articles 15-22 GDPR)'
        },
        intro: {
          el: 'Έχετε τα ακόλουθα δικαιώματα σχετικά με τα προσωπικά σας δεδομένα:',
          en: 'You have the following rights regarding your personal data:'
        },
        accessTitle: {
          el: '6.1 Δικαίωμα Πρόσβασης (Right of Access - Άρθρο 15)',
          en: '6.1 Right of Access (Article 15)'
        },
        access: {
          el: 'Μπορείτε να ζητήσετε αντίγραφο των προσωπικών σας δεδομένων που διατηρούμε.',
          en: 'You can request a copy of the personal data we hold about you.'
        },
        rectificationTitle: {
          el: '6.2 Δικαίωμα Διόρθωσης (Right to Rectification - Άρθρο 16)',
          en: '6.2 Right to Rectification (Article 16)'
        },
        rectification: {
          el: 'Μπορείτε να ζητήσετε διόρθωση ανακριβών ή ελλιπών δεδομένων.',
          en: 'You can request correction of inaccurate or incomplete data.'
        },
        erasureTitle: {
          el: '6.3 Δικαίωμα Διαγραφής / "Δικαίωμα στη Λήθη" (Right to Erasure - Άρθρο 17)',
          en: '6.3 Right to Erasure / "Right to be Forgotten" (Article 17)'
        },
        erasure: {
          el: 'Μπορείτε να ζητήσετε τη διαγραφή των προσωπικών σας δεδομένων, εφόσον:',
          en: 'You can request deletion of your personal data, provided that:'
        },
        erasureConditions: {
          el: [
            'Τα δεδομένα δεν είναι πλέον απαραίτητα για τους αρχικούς σκοπούς',
            'Ανακαλείτε τη συναίνεσή σας και δεν υπάρχει άλλη νομική βάση',
            'Τα δεδομένα έχουν επεξεργαστεί παράνομα'
          ],
          en: [
            'The data is no longer necessary for the original purposes',
            'You withdraw your consent and there is no other legal basis',
            'The data has been processed unlawfully'
          ]
        },
        restrictionTitle: {
          el: '6.4 Δικαίωμα Περιορισμού Επεξεργασίας (Right to Restriction - Άρθρο 18)',
          en: '6.4 Right to Restriction of Processing (Article 18)'
        },
        restriction: {
          el: 'Μπορείτε να ζητήσετε περιορισμό της επεξεργασίας των δεδομένων σας.',
          en: 'You can request restriction of processing of your data.'
        },
        portabilityTitle: {
          el: '6.5 Δικαίωμα Φορητότητας Δεδομένων (Right to Data Portability - Άρθρο 20)',
          en: '6.5 Right to Data Portability (Article 20)'
        },
        portability: {
          el: 'Μπορείτε να λάβετε τα δεδομένα σας σε δομημένη, ευρέως χρησιμοποιούμενη μορφή.',
          en: 'You can receive your data in a structured, commonly used format.'
        },
        objectTitle: {
          el: '6.6 Δικαίωμα Εναντίωσης (Right to Object - Άρθρο 21)',
          en: '6.6 Right to Object (Article 21)'
        },
        object: {
          el: 'Μπορείτε να αντιταχθείτε στην επεξεργασία των δεδομένων σας για σκοπούς νόμιμου συμφέροντος.',
          en: 'You can object to the processing of your data for legitimate interest purposes.'
        },
        withdrawTitle: {
          el: '6.7 Δικαίωμα Ανάκλησης Συναίνεσης (Right to Withdraw Consent - Άρθρο 7)',
          en: '6.7 Right to Withdraw Consent (Article 7)'
        },
        withdraw: {
          el: 'Μπορείτε να ανακαλέσετε τη συναίνεσή σας οποιαδήποτε στιγμή, χωρίς να επηρεάζεται η νομιμότητα της προηγούμενης επεξεργασίας.',
          en: 'You can withdraw your consent at any time, without affecting the lawfulness of prior processing.'
        },
        howToExerciseTitle: {
          el: '6.8 Πώς να Ασκηθείτε τα Δικαιώματά σας',
          en: '6.8 How to Exercise Your Rights'
        },
        howToExercise: {
          el: 'Για να ασκήσετε οποιοδήποτε από τα παραπάνω δικαιώματα, επικοινωνήστε μαζί μας στο: devtaskhub@gmail.com. Θα απαντήσουμε στο αίτημά σας εντός 30 ημερών (ή 90 ημερών σε περίπλοκες περιπτώσεις, με προηγούμενη ειδοποίηση).',
          en: 'To exercise any of the above rights, contact us at: devtaskhub@gmail.com. We will respond to your request within 30 days (or 90 days in complex cases, with prior notice).'
        }
      },
      dataRetention: {
        title: {
          el: '7. Διατήρηση Δεδομένων',
          en: '7. Data Retention'
        },
        intro: {
          el: 'Διατηρούμε τα προσωπικά σας δεδομένα μόνο για όσο χρόνο είναι απαραίτητος για τους σκοπούς που συλλέχθηκαν ή όπως απαιτείται από το νόμο.',
          en: 'We retain your personal data only for as long as necessary for the purposes collected or as required by law.'
        },
        policyTitle: {
          el: '7.1 Πολιτική Διατήρησης',
          en: '7.1 Retention Policy'
        },
        accountData: {
          el: 'Δεδομένα Λογαριασμού: Διατηρούνται για όσο διάστημα είναι ενεργός ο λογαριασμός σας. Μετά τη διαγραφή του λογαριασμού, τα δεδομένα διαγράφονται εντός 30 ημερών (εκτός εάν απαιτείται διατήρηση από το νόμο)',
          en: 'Account Data: Retained for as long as your account is active. After account deletion, data is deleted within 30 days (unless retention is required by law)'
        },
        historyData: {
          el: 'Ιστορικό Κοινοποίησης/Κρατήσεων: Διατηρείται για 6 μήνες μετά την τελευταία δραστηριότητα',
          en: 'Sharing/Reservation History: Retained for 6 months after last activity'
        },
        locationData: {
          el: 'Δεδομένα Τοποθεσίας (GPS): Διαγράφονται άμεσα μετά τη χρήση. Δεδομένα ενεργών κρατήσεων διατηρούνται για όσο διαρκεί η κράτηση (μέχρι 2 ώρες) και διαγράφονται μετά τη λήξη. Όλες οι ενημερώσεις παρέχονται σε πραγματικό χρόνο - δεν υπάρχουν καθυστερήσεις',
          en: 'Location Data (GPS): Deleted immediately after use. Active reservation data is retained for the duration of the reservation (up to 2 hours) and deleted after expiration. All updates are provided in real-time - there are no delays'
        },
        analyticsData: {
          el: 'Analytics Data: Διατηρούνται για 24 μήνες',
          en: 'Analytics Data: Retained for 24 months'
        },
        paymentData: {
          el: 'Δεδομένα Πληρωμών: Δεν συλλέγονται - η εφαρμογή είναι 100% δωρεάν',
          en: 'Payment Data: Not collected - the app is 100% free'
        },
        cookiesData: {
          el: 'Cookies: Session cookies διαγράφονται με το κλείσιμο του browser. Persistent cookies διαγράφονται μετά από 12 μήνες',
          en: 'Cookies: Session cookies are deleted when the browser closes. Persistent cookies are deleted after 12 months'
        },
        contactsData: {
          el: 'Δεδομένα Επαφών/Φίλων: Διατηρούνται για όσο ο λογαριασμός σας είναι ενεργός',
          en: 'Contacts/Friends Data: Retained for as long as your account is active'
        },
        afterDeletionTitle: {
          el: '7.2 Διαγραφή μετά τη Διαγραφή Λογαριασμού',
          en: '7.2 Deletion After Account Deletion'
        },
        afterDeletion: {
          el: 'Μετά τη διαγραφή του λογαριασμού σας: Όλα τα προσωπικά δεδομένα διαγράφονται εντός 30 ημερών. Τα anonymized/aggregated δεδομένα μπορεί να διατηρηθούν για στατιστικούς σκοπούς (χωρίς προσωπική ταυτοποίηση).',
          en: 'After deletion of your account: All personal data is deleted within 30 days. Anonymized/aggregated data may be retained for statistical purposes (without personal identification).'
        }
      },
      thirdParties: {
        title: {
          el: '8. Κοινοποίηση σε Τρίτους (Άρθρο 13 GDPR)',
          en: '8. Disclosure to Third Parties (Article 13 GDPR)'
        },
        intro: {
          el: 'Κοινοποιούμε τα προσωπικά σας δεδομένα στους ακόλουθους τρίτους για τους σκοπούς που αναφέρονται παρακάτω:',
          en: 'We disclose your personal data to the following third parties for the purposes stated below:'
        },
        supabaseTitle: {
          el: '8.1 Supabase (Database & Authentication)',
          en: '8.1 Supabase (Database & Authentication)'
        },
        supabase: {
          el: [
            'Σκοπός: Αποθήκευση δεδομένων, διαχείριση authentication, hosting backend services',
            'Νομική Βάση: Εκτέλεση Συμβολαίου',
            'Δεδομένα: Όλα τα προσωπικά δεδομένα που συλλέγουμε',
            'Τοποθεσία: ΕΕ/EEA (με δυνατότητα backup servers εκτός ΕΕ)',
            'Data Processing Agreement (DPA): Ναι'
          ],
          en: [
            'Purpose: Data storage, authentication management, hosting backend services',
            'Legal Basis: Contract Performance',
            'Data: All personal data we collect',
            'Location: EU/EEA (with possible backup servers outside EU)',
            'Data Processing Agreement (DPA): Yes'
          ]
        },
        googleMapsTitle: {
          el: '8.2 Google Maps API',
          en: '8.2 Google Maps API'
        },
        googleMaps: {
          el: [
            'Σκοπός: Εμφάνιση χάρτη, πλοήγηση, υπολογισμός αποστάσεων',
            'Νομική Βάση: Νόμιμο Συμφέρον',
            'Δεδομένα: Συντεταγμένες GPS, τοποθεσία χρήστη',
            'Τοποθεσία: Μπορεί να είναι εκτός ΕΕ',
            'Data Processing Agreement (DPA): Ναι',
            'Προστασία: Standard Contractual Clauses (SCCs)'
          ],
          en: [
            'Purpose: Map display, navigation, distance calculation',
            'Legal Basis: Legitimate Interest',
            'Data: GPS coordinates, user location',
            'Location: May be outside EU',
            'Data Processing Agreement (DPA): Yes',
            'Protection: Standard Contractual Clauses (SCCs)'
          ]
        },
        cloudHostingTitle: {
          el: '8.3 Cloud Hosting Providers (εάν χρησιμοποιούνται)',
          en: '8.3 Cloud Hosting Providers (if used)'
        },
        cloudHosting: {
          el: [
            'Σκοπός: Hosting, backup, infrastructure',
            'Νομική Βάση: Εκτέλεση Συμβολαίου',
            'Data Processing Agreement (DPA): Ναι'
          ],
          en: [
            'Purpose: Hosting, backup, infrastructure',
            'Legal Basis: Contract Performance',
            'Data Processing Agreement (DPA): Yes'
          ]
        },
        analyticsTitle: {
          el: '8.4 Analytics Services (προαιρετικά, με συναίνεση)',
          en: '8.4 Analytics Services (optional, with consent)'
        },
        analytics: {
          el: [
            'Σκοπός: Ανάλυση χρήσης για βελτίωση της εφαρμογής',
            'Νομική Βάση: Συναίνεση',
            'Δεδομένα: Aggregated/anonymized usage data',
            'Data Processing Agreement (DPA): Ναι'
          ],
          en: [
            'Purpose: Usage analysis to improve the app',
            'Legal Basis: Consent',
            'Data: Aggregated/anonymized usage data',
            'Data Processing Agreement (DPA): Yes'
          ]
        },
        important: {
          el: [
            'Όλοι οι τρίτοι είναι GDPR-compliant και έχουν υπογράψει Data Processing Agreements (DPAs)',
            'Δεν πουλάμε προσωπικά δεδομένα σε τρίτους για marketing purposes',
            'Δεν χρησιμοποιούμε Payment Processors (Stripe, Google Play, Apple App Store) - η εφαρμογή είναι 100% δωρεάν και δεν διαθέτει subscriptions με πληρωμή'
          ],
          en: [
            'All third parties are GDPR-compliant and have signed Data Processing Agreements (DPAs)',
            'We do not sell personal data to third parties for marketing purposes',
            'We do not use Payment Processors (Stripe, Google Play, Apple App Store) - the app is 100% free and does not have paid subscriptions'
          ]
        }
      },
      dataTransfer: {
        title: {
          el: '9. Μεταφορά Δεδομένων εκτός ΕΕ',
          en: '9. Data Transfer Outside the EU'
        },
        intro: {
          el: 'Ορισμένα από τα προσωπικά σας δεδομένα μπορεί να μεταφέρονται και να επεξεργάζονται εκτός της Ευρωπαϊκής Ένωσης (π.χ. Supabase backup servers, Google services).',
          en: 'Some of your personal data may be transferred and processed outside the European Union (e.g., Supabase backup servers, Google services).'
        },
        safeguards: {
          el: [
            'Adequacy Decisions: Οι χώρες έχουν επαρκές επίπεδο προστασίας (Adequacy Decision από την ΕΕ)',
            'Standard Contractual Clauses (SCCs): Χρησιμοποιούμε Standard Contractual Clauses που έχουν εγκριθεί από την Ευρωπαϊκή Επιτροπή',
            'Άλλα κατάλληλα μέτρα προστασίας: Σύμφωνα με το GDPR'
          ],
          en: [
            'Adequacy Decisions: Countries have adequate protection level (Adequacy Decision from EU)',
            'Standard Contractual Clauses (SCCs): We use Standard Contractual Clauses approved by the European Commission',
            'Other appropriate protection measures: In accordance with GDPR'
          ]
        },
        processors: {
          el: 'Όλοι οι processors εκτός ΕΕ έχουν υπογράψει Data Processing Agreements (DPAs) που διασφαλίζουν την προστασία των δεδομένων σας.',
          en: 'All processors outside the EU have signed Data Processing Agreements (DPAs) that ensure the protection of your data.'
        }
      },
      securityMeasures: {
        title: {
          el: '10. Μέτρα Ασφάλειας (Άρθρο 32 GDPR)',
          en: '10. Security Measures (Article 32 GDPR)'
        },
        intro: {
          el: 'Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των προσωπικών σας δεδομένων:',
          en: 'We implement appropriate technical and organizational measures to protect your personal data:'
        },
        encryptionTitle: {
          el: '10.1 Κρυπτογράφηση (Encryption)',
          en: '10.1 Encryption'
        },
        encryption: {
          el: [
            'Κρυπτογράφηση κατά τη μεταφορά: Όλες οι επικοινωνίες γίνονται μέσω TLS/SSL',
            'Κρυπτογράφηση κατά την αποθήκευση: Τα ευαίσθητα δεδομένα (passwords, tokens) είναι κρυπτογραφημένα'
          ],
          en: [
            'Encryption in transit: All communications are via TLS/SSL',
            'Encryption at rest: Sensitive data (passwords, tokens) is encrypted'
          ]
        },
        rlsTitle: {
          el: '10.2 Row-Level Security (RLS)',
          en: '10.2 Row-Level Security (RLS)'
        },
        rls: {
          el: [
            'Κάθε χρήστης έχει πρόσβαση μόνο στα δικά του δεδομένα',
            'RLS policies στο Supabase database για διασφάλιση απομόνωσης δεδομένων'
          ],
          en: [
            'Each user has access only to their own data',
            'RLS policies in Supabase database to ensure data isolation'
          ]
        },
        authTitle: {
          el: '10.3 Authentication & Authorization',
          en: '10.3 Authentication & Authorization'
        },
        auth: {
          el: [
            'Ασφαλείς μηχανισμοί ελέγχου πρόσβασης',
            'Token-based authentication με secure token management'
          ],
          en: [
            'Secure access control mechanisms',
            'Token-based authentication with secure token management'
          ]
        },
        auditsTitle: {
          el: '10.4 Regular Security Audits',
          en: '10.4 Regular Security Audits'
        },
        audits: {
          el: [
            'Τακτικοί security checks και audits',
            'Monitoring για ανίχνευση ασυνήθιστων δραστηριοτήτων'
          ],
          en: [
            'Regular security checks and audits',
            'Monitoring to detect unusual activities'
          ]
        },
        accessControlsTitle: {
          el: '10.5 Access Controls',
          en: '10.5 Access Controls'
        },
        accessControls: {
          el: [
            'Περιορισμένη πρόσβαση μόνο σε εξουσιοδοτημένο προσωπικό',
            'Logging όλων των accesses σε ευαίσθητα δεδομένα'
          ],
          en: [
            'Limited access only to authorized personnel',
            'Logging all accesses to sensitive data'
          ]
        },
        backupTitle: {
          el: '10.6 Backup & Recovery',
          en: '10.6 Backup & Recovery'
        },
        backup: {
          el: [
            'Τακτικά backups με κρυπτογραφημένα δεδομένα',
            'Disaster recovery plans'
          ],
          en: [
            'Regular backups with encrypted data',
            'Disaster recovery plans'
          ]
        },
        incidentTitle: {
          el: '10.7 Incident Response Plan',
          en: '10.7 Incident Response Plan'
        },
        incident: {
          el: [
            'Διαδικασίες διαχείρισης data breaches',
            'Notification procedures σύμφωνα με το GDPR'
          ],
          en: [
            'Data breach management procedures',
            'Notification procedures in accordance with GDPR'
          ]
        }
      },
      cookies: {
        title: {
          el: '11. Cookies & Analytics',
          en: '11. Cookies & Analytics'
        },
        intro: {
          el: 'Η εφαρμογή χρησιμοποιεί cookies και παρόμοιες τεχνολογίες για:',
          en: 'The app uses cookies and similar technologies for:'
        },
        typesTitle: {
          el: '11.1 Τύποι Cookies',
          en: '11.1 Types of Cookies'
        },
        necessaryCookies: {
          el: [
            'Session management',
            'Authentication',
            'Αποθήκευση προτιμήσεων (γλώσσα, ρυθμίσεις)'
          ],
          en: [
            'Session management',
            'Authentication',
            'Storing preferences (language, settings)'
          ]
        },
        analyticsCookies: {
          el: [
            'Ανάλυση χρήσης',
            'Βελτίωση της εφαρμογής'
          ],
          en: [
            'Usage analysis',
            'App improvement'
          ]
        },
        managementTitle: {
          el: '11.2 Διαχείριση Cookies',
          en: '11.2 Cookie Management'
        },
        management: {
          el: [
            'Ρυθμίσεις Εφαρμογής: Μπορείτε να απενεργοποιήσετε analytics από τις ρυθμίσεις της εφαρμογής',
            'Browser Settings: Μπορείτε να διαχειριστείτε cookies από τις ρυθμίσεις του browser σας',
            'Σημείωση: Η απενεργοποίηση ορισμένων cookies μπορεί να επηρεάσει τη λειτουργικότητα της εφαρμογής'
          ],
          en: [
            'App Settings: You can disable analytics from the app settings',
            'Browser Settings: You can manage cookies from your browser settings',
            'Note: Disabling some cookies may affect app functionality'
          ]
        }
      },
      notifications: {
        title: {
          el: '12. Ειδοποιήσεις & Τοποθεσία',
          en: '12. Notifications & Location'
        },
        locationUsageTitle: {
          el: '12.1 Χρήση Δεδομένων Τοποθεσίας (GPS)',
          en: '12.1 Use of Location Data (GPS)'
        },
        locationUsage: {
          el: [
            'Εντοπισμός διαθέσιμων θέσεων στάθμευσης κοντά σας (με άμεση ενημέρωση)',
            'Αποστολή ειδοποιήσεων για κοντινές διαθέσιμες θέσεις (σε πραγματικό χρόνο)',
            'Εμφάνιση της τοποθεσίας σας στον χάρτη',
            'Πλοήγηση προς τις θέσεις στάθμευσης'
          ],
          en: [
            'Identifying available parking spots near you (with immediate updates)',
            'Sending notifications for nearby available spots (in real-time)',
            'Displaying your location on the map',
            'Navigation to parking spots'
          ]
        },
        locationRetentionTitle: {
          el: '12.2 Διατήρηση Δεδομένων Τοποθεσίας',
          en: '12.2 Location Data Retention'
        },
        locationRetention: {
          el: [
            'Real-time data: Δεν αποθηκεύεται μακροπρόθεσμα, διαγράφεται άμεσα μετά τη χρήση',
            'Active reservations: Δεδομένα τοποθεσίας για ενεργές κρατήσεις διατηρούνται μόνο για τη διάρκεια της κράτησης (μέχρι 2 ώρες)'
          ],
          en: [
            'Real-time data: Not stored long-term, deleted immediately after use',
            'Active reservations: Location data for active reservations is retained only for the duration of the reservation (up to 2 hours)'
          ]
        },
        disableLocationTitle: {
          el: '12.3 Απενεργοποίηση Πρόσβασης Τοποθεσίας',
          en: '12.3 Disabling Location Access'
        },
        disableLocation: {
          el: 'Μπορείτε να απενεργοποιήσετε την πρόσβαση τοποθεσίας από τις ρυθμίσεις της συσκευής σας, αλλά αυτό μπορεί να περιορίσει τη λειτουργικότητα της εφαρμογής (π.χ. δεν θα λάβετε ειδοποιήσεις για κοντινές θέσεις).',
          en: 'You can disable location access from your device settings, but this may limit app functionality (e.g., you will not receive notifications for nearby spots).'
        }
      },
      dataBreaches: {
        title: {
          el: '13. Παραβιάσεις Δεδομένων (Data Breaches - Άρθρα 33-34 GDPR)',
          en: '13. Data Breaches (Articles 33-34 GDPR)'
        },
        intro: {
          el: 'Σε περίπτωση παραβίασης προσωπικών δεδομένων που μπορεί να δημιουργήσει υψηλό κίνδυνο για τα δικαιώματα και τις ελευθερίες των φυσικών προσώπων:',
          en: 'In case of a personal data breach that may pose a high risk to the rights and freedoms of natural persons:'
        },
        authorityTitle: {
          el: '13.1 Ειδοποίηση Αρχής (Άρθρο 33)',
          en: '13.1 Notification to Authority (Article 33)'
        },
        authority: {
          el: 'Θα ενημερώσουμε την Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ) εντός 72 ωρών από τη στιγμή που γνωρίζουμε την παραβίαση',
          en: 'We will notify the Hellenic Data Protection Authority (HDPA) within 72 hours of becoming aware of the breach'
        },
        userTitle: {
          el: '13.2 Ειδοποίηση Χρηστών (Άρθρο 34)',
          en: '13.2 User Notification (Article 34)'
        },
        user: {
          el: [
            'Εάν ο κίνδυνος είναι υψηλός, θα σας ενημερώσουμε χωρίς αδικαιολόγητη καθυστέρηση',
            'Θα σας ενημερώσουμε για:',
            'Τη φύση της παραβίασης',
            'Τα δεδομένα που επηρεάστηκαν',
            'Τα μέτρα που έχουμε λάβει',
            'Συστάσεις για την προστασία σας'
          ],
          en: [
            'If the risk is high, we will notify you without undue delay',
            'We will inform you about:',
            'The nature of the breach',
            'The data affected',
            'The measures we have taken',
            'Recommendations for your protection'
          ]
        }
      },
      consent: {
        title: {
          el: '14. Συνθήκες Συναίνεσης (Άρθρο 7 GDPR)',
          en: '14. Consent Conditions (Article 7 GDPR)'
        },
        characteristicsTitle: {
          el: '14.1 Χαρακτηριστικά Συναίνεσης',
          en: '14.1 Consent Characteristics'
        },
        characteristics: {
          el: [
            'Ελεύθερη (Freely given): Δεν υπάρχει πίεση ή υποχρέωση',
            'Συγκεκριμένη (Specific): Για συγκεκριμένους σκοπούς',
            'Ενημερωμένη (Informed): Έχετε πρόσβαση σε όλες τις πληροφορίες',
            'Σαφής (Unambiguous): Δίνεται μέσω explicit checkbox κατά την εγγραφή'
          ],
          en: [
            'Freely given: No pressure or obligation',
            'Specific: For specific purposes',
            'Informed: You have access to all information',
            'Unambiguous: Given through explicit checkbox during registration'
          ]
        },
        withdrawTitle: {
          el: '14.2 Ανάκληση Συναίνεσης',
          en: '14.2 Withdrawal of Consent'
        },
        withdraw: {
          el: [
            'Μπορείτε να ανακαλέσετε τη συναίνεσή σας οποιαδήποτε στιγμή',
            'Η ανάκληση δεν επηρεάζει τη νομιμότητα της προηγούμενης επεξεργασίας',
            'Μπορείτε να διαχειριστείτε τις προτιμήσεις συναίνεσης από τις ρυθμίσεις του λογαριασμού σας'
          ],
          en: [
            'You can withdraw your consent at any time',
            'Withdrawal does not affect the lawfulness of prior processing',
            'You can manage consent preferences from your account settings'
          ]
        },
        refusalTitle: {
          el: '14.3 Άρνηση Συναίνεσης',
          en: '14.3 Refusal of Consent'
        },
        refusal: {
          el: 'Η άρνηση συναίνεσης για analytics και marketing δεν επηρεάζει την πρόσβαση στις βασικές υπηρεσίες της εφαρμογής',
          en: 'Refusing consent for analytics and marketing does not affect access to the basic services of the app'
        }
      },
      privacyByDesign: {
        title: {
          el: '15. Προστασία Δεδομένων από Σχεδιασμό και Προεπιλογή (Άρθρο 25 GDPR)',
          en: '15. Data Protection by Design and by Default (Article 25 GDPR)'
        },
        intro: {
          el: 'Εφαρμόζουμε τις αρχές "Privacy by Design" και "Privacy by Default":',
          en: 'We apply the principles of "Privacy by Design" and "Privacy by Default":'
        },
        designTitle: {
          el: '15.1 Privacy by Design',
          en: '15.1 Privacy by Design'
        },
        design: {
          el: [
            'Συλλέγουμε μόνο τα απαραίτητα δεδομένα για κάθε λειτουργία',
            'Εφαρμόζουμε data minimization',
            'Κρυπτογράφηση ενεργή από προεπιλογή',
            'Τακτικές privacy impact assessments για νέες λειτουργίες'
          ],
          en: [
            'We collect only necessary data for each function',
            'We apply data minimization',
            'Encryption active by default',
            'Regular privacy impact assessments for new features'
          ]
        },
        defaultTitle: {
          el: '15.2 Privacy by Default',
          en: '15.2 Privacy by Default'
        },
        default: {
          el: [
            'Οι ρυθμίσεις απορρήτου είναι πιο προστατευτικές από προεπιλογή',
            'Τα δεδομένα τοποθεσίας δεν αποθηκεύονται μακροπρόθεσμα από προεπιλογή',
            'Analytics είναι προαιρετικά και απαιτούν συναίνεση'
          ],
          en: [
            'Privacy settings are more protective by default',
            'Location data is not stored long-term by default',
            'Analytics is optional and requires consent'
          ]
        }
      },
      processingRecords: {
        title: {
          el: '16. Καταγραφές Επεξεργασίας (Άρθρο 30 GDPR)',
          en: '16. Processing Records (Article 30 GDPR)'
        },
        intro: {
          el: 'Διατηρούμε καταγραφές όλων των δραστηριοτήτων επεξεργασίας προσωπικών δεδομένων, όπως απαιτείται από το Άρθρο 30 GDPR. Οι καταγραφές περιλαμβάνουν:',
          en: 'We maintain records of all personal data processing activities, as required by Article 30 GDPR. The records include:'
        },
        records: {
          el: [
            'Σκοπός και νομική βάση επεξεργασίας',
            'Κατηγορίες δεδομένων και υποκειμένων',
            'Κατηγορίες παραληπτών',
            'Μεταφορές δεδομένων εκτός ΕΕ',
            'Περιόδους διατήρησης',
            'Μέτρα ασφάλειας'
          ],
          en: [
            'Purpose and legal basis of processing',
            'Categories of data and subjects',
            'Categories of recipients',
            'Data transfers outside the EU',
            'Retention periods',
            'Security measures'
          ]
        },
        authority: {
          el: 'Οι καταγραφές είναι διαθέσιμες για έλεγχο από την Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ).',
          en: 'The records are available for inspection by the Hellenic Data Protection Authority (HDPA).'
        }
      },
      automatedDecisionMaking: {
        title: {
          el: '17. Αυτοματοποιημένη Λήψη Αποφάσεων & Profiling (Άρθρο 22 GDPR)',
          en: '17. Automated Decision-Making & Profiling (Article 22 GDPR)'
        },
        intro: {
          el: 'Δεν χρησιμοποιούμε αυτοματοποιημένη λήψη αποφάσεων ή profiling που παράγει νομικά αποτελέσματα ή επηρεάζει σημαντικά τα δικαιώματα ή τις ελευθερίες σας.',
          en: 'We do not use automated decision-making or profiling that produces legal effects or significantly affects your rights or freedoms.'
        },
        pointsSystem: {
          el: 'Το σύστημα πόντων και rankings είναι καθαρά υπολογιστικό και δεν επηρεάζει νομικά δικαιώματα ή ελευθερίες.',
          en: 'The points system and rankings are purely computational and do not affect legal rights or freedoms.'
        },
        future: {
          el: 'Εάν εφαρμόσουμε τέτοιες τεχνολογίες στο μέλλον, θα σας ενημερώσουμε και θα σας δώσουμε το δικαίωμα να ζητήσετε ανθρώπινη παρέμβαση.',
          en: 'If we implement such technologies in the future, we will notify you and give you the right to request human intervention.'
        }
      },
      childrenData: {
        title: {
          el: '18. Δεδομένα Παιδιών (Άρθρο 8 GDPR)',
          en: '18. Children\'s Data (Article 8 GDPR)'
        },
        ageRestriction: {
          el: 'Η εφαρμογή T-Parking προορίζεται για χρήστες άνω των 18 ετών.',
          en: 'The T-Parking app is intended for users over 18 years of age.'
        },
        noCollection: {
          el: 'Δεν συλλέγουμε σκόπιμα δεδομένα από παιδιά κάτω των 18 ετών χωρίς συναίνεση γονέα ή κηδεμόνα.',
          en: 'We do not knowingly collect data from children under 18 years of age without parental or guardian consent.'
        },
        deletion: {
          el: 'Εάν ανακαλύψουμε ότι έχουμε συλλέξει δεδομένα από παιδί κάτω των 18 ετών χωρίς κατάλληλη συναίνεση, θα διαγράψουμε άμεσα τα δεδομένα.',
          en: 'If we discover that we have collected data from a child under 18 years of age without proper consent, we will immediately delete the data.'
        },
        parentContact: {
          el: 'Εάν είστε γονέας ή κηδεμόνας και πιστεύετε ότι το παιδί σας μας έχει παράσχει προσωπικά δεδομένα, επικοινωνήστε μαζί μας στο: devtaskhub@gmail.com',
          en: 'If you are a parent or guardian and believe your child has provided us with personal data, contact us at: devtaskhub@gmail.com'
        }
      },
      specialCategories: {
        title: {
          el: '19. Ειδικές Κατηγορίες Δεδομένων (Άρθρο 9 GDPR)',
          en: '19. Special Categories of Data (Article 9 GDPR)'
        },
        intro: {
          el: 'Δεν συλλέγουμε ή επεξεργαζόμαστε "ειδικές κατηγορίες" προσωπικών δεδομένων όπως ορίζονται στο Άρθρο 9 GDPR, συμπεριλαμβανομένων:',
          en: 'We do not collect or process "special categories" of personal data as defined in Article 9 GDPR, including:'
        },
        categories: {
          el: [
            'Δεδομένων που αποκαλύπτουν φυλετική ή εθνοτική καταγωγή',
            'Πολιτικών απόψεων',
            'Θρησκευτικών ή φιλοσοφικών πεποιθήσεων',
            'Συνδικαλιστικής συμμετοχής',
            'Γενετικών δεδομένων',
            'Βιομετρικών δεδομένων',
            'Δεδομένων υγείας',
            'Δεδομένων που αφορούν σεξουαλική ζωή ή σεξουαλικό προσανατολισμό'
          ],
          en: [
            'Data revealing racial or ethnic origin',
            'Political opinions',
            'Religious or philosophical beliefs',
            'Trade union membership',
            'Genetic data',
            'Biometric data',
            'Health data',
            'Data concerning sexual life or sexual orientation'
          ]
        }
      },
      modifications: {
        title: {
          el: '20. Τροποποιήσεις Πολιτικής Απορρήτου',
          en: '20. Privacy Policy Modifications'
        },
        intro: {
          el: 'Μπορούμε να τροποποιήσουμε αυτή την Πολιτική Απορρήτου οποιαδήποτε στιγμή.',
          en: 'We may modify this Privacy Policy at any time.'
        },
        notificationTitle: {
          el: '20.1 Ειδοποίηση Αλλαγών',
          en: '20.1 Change Notification'
        },
        notification: {
          el: [
            'Οι σημαντικές αλλαγές θα ανακοινωθούν μέσω της εφαρμογής ή email',
            'Η ημερομηνία "Τελευταία Ενημέρωση" θα ενημερώνεται στην κορυφή αυτής της σελίδας'
          ],
          en: [
            'Significant changes will be announced through the app or email',
            'The "Last Updated" date will be updated at the top of this page'
          ]
        },
        continuedUseTitle: {
          el: '20.2 Συνεχής Χρήση',
          en: '20.2 Continued Use'
        },
        continuedUse: {
          el: [
            'Η συνεχής χρήση της εφαρμογής μετά από τροποποιήσεις συνεπάγεται αποδοχή των νέων όρων',
            'Σας συνιστούμε να ελέγχετε τακτικά αυτή τη σελίδα για ενημερώσεις'
          ],
          en: [
            'Continued use of the app after modifications implies acceptance of the new terms',
            'We recommend that you check this page regularly for updates'
          ]
        }
      },
      jurisdiction: {
        title: {
          el: '21. Δικαιοδοσία & Εφαρμοστέο Δίκαιο',
          en: '21. Jurisdiction & Applicable Law'
        },
        intro: {
          el: 'Αυτή η Πολιτική Απορρήτου διέπεται από:',
          en: 'This Privacy Policy is governed by:'
        },
        laws: {
          el: [
            'Ελληνικό Δίκαιο: Οι όροι διέπονται από το ελληνικό δίκαιο',
            'GDPR: Ο Κανονισμός (ΕΕ) 2016/679 για την Προστασία των Προσωπικών Δεδομένων',
            'Ελληνικός Νόμος 4624/2019: Για την εφαρμογή του GDPR στην Ελλάδα'
          ],
          en: [
            'Greek Law: The terms are governed by Greek law',
            'GDPR: Regulation (EU) 2016/679 on the Protection of Personal Data',
            'Greek Law 4624/2019: For the implementation of GDPR in Greece'
          ]
        },
        disputes: {
          el: 'Οποιαδήποτε διαφωνία που προκύπτει από ή σχετίζεται με αυτή την Πολιτική Απορρήτου θα επιλυθεί από τα αρμόδια δικαστήρια της Ελλάδας.',
          en: 'Any dispute arising from or related to this Privacy Policy will be resolved by the competent courts of Greece.'
        },
        adr: {
          el: 'Για καταναλωτικές διαφορές, έχετε το δικαίωμα να καταφύγετε σε εναλλακτικές διαδικασίες επίλυσης διαφορών (ADR) σύμφωνα με το ελληνικό δίκαιο.',
          en: 'For consumer disputes, you have the right to resort to alternative dispute resolution (ADR) procedures in accordance with Greek law.'
        },
        authority: {
          el: 'Η Ελληνική Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ) είναι η αρμόδια εποπτική αρχή για θέματα προστασίας δεδομένων.',
          en: 'The Hellenic Data Protection Authority (HDPA) is the competent supervisory authority for data protection matters.'
        }
      },
      contact: {
        title: {
          el: '22. Επικοινωνία',
          en: '22. Contact'
        },
        intro: {
          el: 'Για οποιαδήποτε ερώτηση, αίτημα ή ανησυχία σχετικά με αυτή την Πολιτική Απορρήτου ή την επεξεργασία των προσωπικών σας δεδομένων, επικοινωνήστε μαζί μας:',
          en: 'For any questions, requests, or concerns regarding this Privacy Policy or the processing of your personal data, please contact us:'
        },
        email: {
          el: 'Email:',
          en: 'Email:'
        },
        emailValue: {
          el: 'devtaskhub@gmail.com',
          en: 'devtaskhub@gmail.com'
        },
        support: {
          el: 'Υποστήριξη:',
          en: 'Support:'
        },
        response: {
          el: 'Θα απαντήσουμε στο αίτημά σας εντός 30 ημερών (ή 90 ημερών σε περίπλοκες περιπτώσεις, με προηγούμενη ειδοποίηση).',
          en: 'We will respond to your request within 30 days (or 90 days in complex cases, with prior notice).'
        },
        lastUpdate: {
          el: 'Τελευταία Ενημέρωση: 7 Δεκεμβρίου 2025',
          en: 'Last Updated: December 7, 2025'
        },
        copyright: {
          el: '© 2025 T-Parking. Όλα τα δικαιώματα διατηρούνται.',
          en: '© 2025 T-Parking. All rights reserved.'
        }
      }
    },
    termsConditions: {
      title: {
        el: 'Όροι και Προϋποθέσεις Χρήσης - T-Parking',
        en: 'Terms and Conditions of Use - T-Parking'
      },
      lastUpdated: {
        el: 'Τελευταία Ενημέρωση: 7 Δεκεμβρίου 2025',
        en: 'Last Updated: December 7, 2025'
      },
      introduction: {
          el: 'Καλώς ήρθατε στο T-Parking. Οι παρακάτω Όροι και Προϋποθέσεις Χρήσης διέπουν τη χρήση της εφαρμογής T-Parking και των υπηρεσιών μας. Παρακαλούμε διαβάστε προσεκτικά αυτούς τους όρους πριν από τη χρήση της εφαρμογής. Με τη χρήση της εφαρμογής, αποδέχεστε αυτούς τους όρους και συναινείτε ρητά στην επεξεργασία των προσωπικών σας δεδομένων σύμφωνα με τον Κανονισμό (ΕΕ) 2016/679 για την Προστασία των Προσωπικών Δεδομένων (GDPR). Αν δεν συμφωνείτε με οποιοδήποτε μέρος αυτών των όρων, παρακαλούμε μην χρησιμοποιείτε την εφαρμογή.',
          en: 'Welcome to T-Parking. The following Terms and Conditions of Use govern the use of the T-Parking application and our services. Please read these terms carefully before using the application. By using the application, you accept these terms and explicitly consent to the processing of your personal data in accordance with Regulation (EU) 2016/679 on the Protection of Personal Data (GDPR). If you do not agree with any part of these terms, please do not use the application.'
        },
        acceptance: {
          title: {
            el: '2. Αποδοχή Όρων & Συναίνεση',
            en: '2. Acceptance of Terms & Consent'
          },
          acceptanceTitle: {
            el: '2.1 Αποδοχή Όρων',
            en: '2.1 Acceptance of Terms'
          },
          acceptanceContent: {
            el: 'Με την εγγραφή, είσοδο ή χρήση της εφαρμογής T-Parking, αποδέχεστε αυτούς τους Όρους και Προϋποθέσεις Χρήσης και συμφωνείτε να τους τηρείτε.',
            en: 'By registering, logging in, or using the T-Parking application, you accept these Terms and Conditions of Use and agree to abide by them.'
          },
          consentTitle: {
            el: '2.2 Συναίνεση Επεξεργασίας Δεδομένων',
            en: '2.2 Consent for Data Processing'
          },
          consentContent: {
            el: 'Με τη χρήση της εφαρμογής, συναινείτε ρητά στην επεξεργασία των προσωπικών σας δεδομένων σύμφωνα με την Πολιτική Απορρήτου μας (δείτε /privacy-policy).',
            en: 'By using the application, you explicitly consent to the processing of your personal data in accordance with our Privacy Policy (see /privacy-policy).'
          },
          consentCharacteristics: {
            el: [
              'Ελεύθερη: Δεν υπάρχει πίεση ή υποχρέωση',
              'Συγκεκριμένη: Για συγκεκριμένους σκοπούς',
              'Ενημερωμένη: Έχετε πρόσβαση σε όλες τις πληροφορίες',
              'Σαφής: Δίνεται μέσω explicit checkbox κατά την εγγραφή'
            ],
            en: [
              'Free: No pressure or obligation',
              'Specific: For specific purposes',
              'Informed: You have access to all information',
              'Unambiguous: Given through explicit checkbox during registration'
            ]
          },
          withdrawTitle: {
            el: '2.3 Ανάκληση Συναίνεσης',
            en: '2.3 Withdrawal of Consent'
          },
          withdrawContent: {
            el: 'Μπορείτε να ανακαλέσετε τη συναίνεσή σας οποιαδήποτε στιγμή, χωρίς να επηρεάζεται η νομιμότητα της προηγούμενης επεξεργασίας.',
            en: 'You can withdraw your consent at any time, without affecting the lawfulness of prior processing.'
          }
        },
        serviceDescription: {
          title: {
            el: '3. Περιγραφή Υπηρεσίας',
            en: '3. Service Description'
          },
          whatIsTitle: {
            el: '3.1 Τι είναι το T-Parking',
            en: '3.1 What is T-Parking'
          },
          whatIsContent: {
            el: 'Το T-Parking είναι μια mobile εφαρμογή που επιτρέπει στους χρήστες να:',
            en: 'T-Parking is a mobile application that allows users to:'
          },
          features: {
            el: [
              'Βρίσκουν διαθέσιμες θέσεις στάθμευσης σε πραγματικό χρόνο',
              'Κρατούν θέσεις στάθμευσης (reservations)',
              'Μοιράζονται θέσεις στάθμευσης όταν ξεπαρκάρουν',
              'Πλοηγούνται προς θέσεις στάθμευσης (μέσω Google Maps)',
              'Κερδίζουν πόντους και επιβραβεύσεις',
              'Λαμβάνουν ειδοποιήσεις για κοντινές διαθέσιμες θέσεις'
            ],
            en: [
              'Find available parking spots in real-time',
              'Reserve parking spots (reservations)',
              'Share parking spots when they leave',
              'Navigate to parking spots (via Google Maps)',
              'Earn points and rewards',
              'Receive notifications for nearby available spots'
            ]
          },
          functionalityTitle: {
            el: '3.2 Λειτουργικότητα',
            en: '3.2 Functionality'
          },
          functionalityContent: {
            el: 'Η εφαρμογή λειτουργεί σε πραγματικό χρόνο (real-time) χωρίς καθυστερήσεις και χρησιμοποιεί δεδομένα τοποθεσίας (GPS) για την παροχή των υπηρεσιών της. Όλα τα features είναι 100% δωρεάν και διαθέσιμα σε όλους τους χρήστες.',
            en: 'The app operates in real-time without delays and uses location data (GPS) to provide its services. All features are 100% free and available to all users.'
          },
          characteristicsTitle: {
            el: '3.3 Χαρακτηριστικά',
            en: '3.3 Features'
          },
          characteristics: {
            el: [
              'Σύστημα Πόντων: Κερδίζετε πόντους κάθε φορά που μοιράζεστε μια θέση στάθμευσης',
              'Κρατήσεις: 1 δωρεάν κράτηση ανά 20 επιβεβαιωμένα ξεπαρκαρίσματα',
              'Ειδοποιήσεις: Push notifications για κοντινές διαθέσιμες θέσεις',
              'Ιστορικό & Στατιστικά: Προβολή ιστορικού, πόντων, rankings, εξοικονόμησης χρόνου/χρημάτων',
              'Πλοήγηση: Ενσωματωμένη πλοήγηση μέσω Google Maps'
            ],
            en: [
              'Points System: You earn points every time you share a parking spot',
              'Reservations: 1 free reservation per 20 confirmed departures',
              'Notifications: Push notifications for nearby available spots',
              'History & Statistics: View history, points, rankings, time/money savings',
              'Navigation: Integrated navigation via Google Maps'
            ]
          }
        },
        registration: {
          title: {
            el: '4. Εγγραφή & Λογαριασμός',
            en: '4. Registration & Account'
          },
          requirementsTitle: {
            el: '4.1 Απαιτήσεις Εγγραφής',
            en: '4.1 Registration Requirements'
          },
          requirementsIntro: {
            el: 'Για να χρησιμοποιήσετε το T-Parking, πρέπει να:',
            en: 'To use T-Parking, you must:'
          },
          requirements: {
            el: [
              'Έχετε συμπληρώσει το 18ο έτος της ηλικίας σας',
              'Δημιουργήσετε λογαριασμό με ακριβή και ενημερωμένα στοιχεία',
              'Παράσχετε έγκυρη διεύθυνση email',
              'Δημιουργήσετε ασφαλές password (τουλάχιστον 6 χαρακτήρες)'
            ],
            en: [
              'Be at least 18 years of age',
              'Create an account with accurate and up-to-date information',
              'Provide a valid email address',
              'Create a secure password (at least 6 characters)'
            ]
          },
          responsibilityTitle: {
            el: '4.2 Ευθύνη Χρήστη',
            en: '4.2 User Responsibility'
          },
          responsibilityContent: {
            el: 'Είστε υπεύθυνος για:',
            en: 'You are responsible for:'
          },
          responsibility: {
            el: [
              'Τη διασφάλιση της ασφάλειας του λογαριασμού σας, συμπεριλαμβανομένου του password σας',
              'Όλη τη δραστηριότητα που γίνεται μέσω του λογαριασμού σας',
              'Τη διατήρηση ενημερωμένων και ακριβών πληροφοριών στο προφίλ σας'
            ],
            en: [
              'Ensuring the security of your account, including your password',
              'All activity that occurs through your account',
              'Maintaining up-to-date and accurate information in your profile'
            ]
          },
          securityTitle: {
            el: '4.3 Ασφάλεια Λογαριασμού',
            en: '4.3 Account Security'
          },
          securityContent: {
            el: 'Εάν υποψιάζεστε ότι ο λογαριασμός σας έχει παραβιαστεί, ειδοποιήστε μας άμεσα στο: devtaskhub@gmail.com',
            en: 'If you suspect that your account has been compromised, notify us immediately at: devtaskhub@gmail.com'
          },
          securityDisclaimer: {
            el: 'Εμείς δεν φέρουμε ευθύνη για ζημίες που προκύπτουν από μη εξουσιοδοτημένη χρήση του λογαριασμού σας.',
            en: 'We are not responsible for damages arising from unauthorized use of your account.'
          }
        },
        useOfService: {
          title: {
            el: '5. Χρήση Υπηρεσίας',
            en: '5. Use of Service'
          },
          lawfulUseTitle: {
            el: '5.1 Νόμιμη Χρήση',
            en: '5.1 Lawful Use'
          },
          lawfulUseContent: {
            el: 'Η χρήση της εφαρμογής επιτρέπεται μόνο για νόμιμους σκοπούς.',
            en: 'Use of the application is permitted only for lawful purposes.'
          },
          prohibitedTitle: {
            el: '5.2 Απαγορευμένες Δραστηριότητες',
            en: '5.2 Prohibited Activities'
          },
          prohibitedIntro: {
            el: 'Απαγορεύεται αυστηρά:',
            en: 'The following are strictly prohibited:'
          },
          falseInformationTitle: {
            el: 'Παροχή Ψευδών ή Παραπλανητικών Πληροφοριών:',
            en: 'Providing False or Misleading Information:'
          },
          falseInformation: {
            el: [
              'Δημιουργία ψευδών θέσεων στάθμευσης',
              'Παροχή παραπλανητικών πληροφοριών σχετικά με τη διαθεσιμότητα θέσεων',
              'Χρήση ψευδών στοιχείων κατά την εγγραφή'
            ],
            en: [
              'Creating fake parking spots',
              'Providing misleading information about spot availability',
              'Using false information during registration'
            ]
          },
          abuseTitle: {
            el: 'Κατάχρηση Υπηρεσίας:',
            en: 'Service Abuse:'
          },
          abuse: {
            el: [
              'Χρήση της εφαρμογής για παράνομες δραστηριότητες',
              'Κατάχρηση του συστήματος πόντων ή κρατήσεων',
              'Προσπάθεια χειραγώγησης των rankings ή στατιστικών'
            ],
            en: [
              'Using the app for illegal activities',
              'Abusing the points system or reservations',
              'Attempting to manipulate rankings or statistics'
            ]
          },
          thirdPartyRightsTitle: {
            el: 'Παραβίαση Δικαιωμάτων Τρίτων:',
            en: 'Violation of Third-Party Rights:'
          },
          thirdPartyRights: {
            el: [
              'Παραβίαση πνευματικών δικαιωμάτων',
              'Παραβίαση δικαιωμάτων ιδιωτικής ζωής',
              'Χρήση της εφαρμογής για παρενοχλήσεις ή εκφοβισμούς'
            ],
            en: [
              'Violation of intellectual property rights',
              'Violation of privacy rights',
              'Using the app for harassment or intimidation'
            ]
          },
          technicalInterferenceTitle: {
            el: 'Τεχνικές Επεμβάσεις:',
            en: 'Technical Interference:'
          },
          technicalInterference: {
            el: [
              'Hacking, reverse engineering, ή προσπάθεια να παρακάμψετε τα security measures',
              'Προσπάθεια πρόσβασης σε δεδομένα άλλων χρηστών',
              'Χρήση bots, scripts, ή automated tools για χειραγώγηση της εφαρμογής'
            ],
            en: [
              'Hacking, reverse engineering, or attempting to bypass security measures',
              'Attempting to access other users\' data',
              'Using bots, scripts, or automated tools to manipulate the app'
            ]
          },
          otherProhibitedTitle: {
            el: 'Άλλες Απαγορευμένες Δραστηριότητες:',
            en: 'Other Prohibited Activities:'
          },
          otherProhibited: {
            el: [
              'Χρήση της εφαρμογής με τρόπο που μπορεί να βλάψει την εφαρμογή, τους χρήστες της, ή τρίτους',
              'Καταστροφή, διαταραχή ή παρεμπόδιση της λειτουργίας της εφαρμογής',
              'Πωλήσεις, μεταβίβαση, ή ενοικίαση του λογαριασμού σας σε τρίτους'
            ],
            en: [
              'Using the app in a way that may harm the app, its users, or third parties',
              'Destroying, disrupting, or interfering with the app\'s functionality',
              'Selling, transferring, or renting your account to third parties'
            ]
          },
          consequencesTitle: {
            el: '5.3 Συνεπείς',
            en: '5.3 Consequences'
          },
          consequences: {
            el: [
              'Τερματισμός ή αναστολή του λογαριασμού σας',
              'Νομικές ενέργειες (εάν χρειάζεται)',
              'Αποζημιώσεις για ζημίες που προκύπτουν'
            ],
            en: [
              'Termination or suspension of your account',
              'Legal action (if necessary)',
              'Compensation for damages incurred'
            ]
          }
        },
        reservations: {
          title: {
            el: '6. Κρατήσεις & Πόντοι',
            en: '6. Reservations & Points'
          },
          reservationsTitle: {
            el: '6.1 Σύστημα Κρατήσεων',
            en: '6.1 Reservation System'
          },
          reservations: {
            el: [
              'Όλοι οι χρήστες μπορούν να κάνουν κράτηση θέσης εάν έχουν διαθέσιμη δωρεάν κράτηση',
              '1 δωρεάν κράτηση προμηθεύεται για κάθε 20 επιβεβαιωμένα ξεπαρκαρίσματα',
              'Κάθε κράτηση έχει διάρκεια έως 2 ώρες',
              'Μετά τη λήξη, η θέση γίνεται διαθέσιμη για άλλους χρήστες',
              'Όλα τα features είναι 100% δωρεάν - δεν υπάρχουν premium ή platinum subscriptions με πληρωμή'
            ],
            en: [
              'All users can reserve a spot if they have an available free reservation',
              '1 free reservation is provided for every 20 confirmed departures',
              'Each reservation has a duration of up to 2 hours',
              'After expiration, the spot becomes available for other users',
              'All features are 100% free - there are no premium or platinum paid subscriptions'
            ]
          },
          pointsTitle: {
            el: '6.2 Σύστημα Πόντων',
            en: '6.2 Points System'
          },
          pointsIntro: {
            el: '+1 πόντος για κάθε θέση που μοιράζεστε (Unpark). Οι πόντοι χρησιμοποιούνται για:',
            en: '+1 point for each spot you share (Unpark). Points are used for:'
          },
          points: {
            el: [
              'Υπολογισμό rankings',
              'Στατιστικά',
              'Επιβραβεύσεις (δωρεάν κρατήσεις)'
            ],
            en: [
              'Ranking calculations',
              'Statistics',
              'Rewards (free reservations)'
            ]
          },
          rewardsTitle: {
            el: '6.3 Επιβραβεύσεις',
            en: '6.3 Rewards'
          },
          rewards: {
            el: [
              '1 δωρεάν κράτηση = 20 επιβεβαιωμένα ξεπαρκαρίσματα',
              'Οι επιβραβεύσεις είναι ατομικές και δεν μπορούν να μεταφερθούν'
            ],
            en: [
              '1 free reservation = 20 confirmed departures',
              'Rewards are individual and cannot be transferred'
            ]
          },
          availabilityTitle: {
            el: '6.4 Διαθεσιμότητα Κρατήσεων',
            en: '6.4 Reservation Availability'
          },
          availability: {
            el: [
              'Οι κρατήσεις είναι subject to availability',
              'Δεν εγγυόμαστε ότι μια θέση θα είναι διαθέσιμη όταν φτάσετε',
              'Δεν φέρουμε ευθύνη για αλλαγές στην κατάσταση μιας θέσης (π.χ. εάν κάποιος άλλος έχει πάρει τη θέση)'
            ],
            en: [
              'Reservations are subject to availability',
              'We do not guarantee that a spot will be available when you arrive',
              'We are not responsible for changes in the status of a spot (e.g., if someone else has taken the spot)'
            ]
          }
        },
        personalData: {
          title: {
            el: '7. Προσωπικά Δεδομένα (Σύνοψη - Για πλήρη λεπτομέρειες δείτε Privacy Policy)',
            en: '7. Personal Data (Summary - For full details see Privacy Policy)'
          },
          collectionTitle: {
            el: '7.1 Συλλογή Δεδομένων',
            en: '7.1 Data Collection'
          },
          collectionContent: {
            el: 'Συλλέγουμε τα ακόλουθα προσωπικά δεδομένα (για λεπτομέρειες, δείτε την Πολιτική Απορρήτου):',
            en: 'We collect the following personal data (for details, see the Privacy Policy):'
          },
          collection: {
            el: [
              'Ονοματεπώνυμο, Email, Password',
              'Δεδομένα τοποθεσίας (GPS) σε πραγματικό χρόνο',
              'Δεδομένα χρήσης (ιστορικό, κρατήσεις, πόντοι)',
              'Δεδομένα συσκευής',
              'Cookies και analytics data (με συναίνεση)'
            ],
            en: [
              'Full name, Email, Password',
              'Location data (GPS) in real-time',
              'Usage data (history, reservations, points)',
              'Device data',
              'Cookies and analytics data (with consent)'
            ]
          },
          legalBasisTitle: {
            el: '7.2 Νομική Βάση (GDPR Article 6)',
            en: '7.2 Legal Basis (GDPR Article 6)'
          },
          legalBasis: {
            el: [
              'Εκτέλεση Συμβολαίου: Παροχή βασικών υπηρεσιών',
              'Συναίνεση: Marketing, analytics (προαιρετικά)',
              'Νόμιμο Συμφέρον: Βελτίωση εφαρμογής, ασφάλεια',
              'Νομική Υποχρέωση: Συμμόρφωση με νόμους'
            ],
            en: [
              'Contract Performance: Providing basic services',
              'Consent: Marketing, analytics (optional)',
              'Legitimate Interest: App improvement, security',
              'Legal Obligation: Compliance with laws'
            ]
          },
          purposeTitle: {
            el: '7.3 Σκοπός Επεξεργασίας',
            en: '7.3 Purpose of Processing'
          },
          purpose: {
            el: [
              'Παροχή και βελτίωση υπηρεσιών',
              'Επεξεργασία κρατήσεων και πόντων',
              'Αποστολή ειδοποιήσεων',
              'Ανάλυση και βελτίωση',
              'Ασφάλεια και πρόληψη απάτης'
            ],
            en: [
              'Service provision and improvement',
              'Processing reservations and points',
              'Sending notifications',
              'Analysis and improvement',
              'Security and fraud prevention'
            ]
          },
          policyTitle: {
            el: '7.4 Πολιτική Απορρήτου',
            en: '7.4 Privacy Policy'
          },
          policyContent: {
            el: 'Για πλήρεις λεπτομέρειες σχετικά με την επεξεργασία προσωπικών δεδομένων, δείτε την Πολιτική Απορρήτου μας στο /privacy-policy.',
            en: 'For full details regarding the processing of personal data, see our Privacy Policy at /privacy-policy.'
          }
        },
        userRights: {
          title: {
            el: '8. Δικαιώματα Χρήστη (GDPR Articles 15-22)',
            en: '8. User Rights (GDPR Articles 15-22)'
          },
          intro: {
            el: 'Έχετε τα ακόλουθα δικαιώματα σχετικά με τα προσωπικά σας δεδομένα:',
            en: 'You have the following rights regarding your personal data:'
          },
          rights: {
            el: [
              'Δικαίωμα Πρόσβασης (Right of Access)',
              'Δικαίωμα Διόρθωσης (Right to Rectification)',
              'Δικαίωμα Διαγραφής / "Δικαίωμα στη Λήθη" (Right to Erasure)',
              'Δικαίωμα Περιορισμού Επεξεργασίας (Right to Restriction)',
              'Δικαίωμα Φορητότητας Δεδομένων (Right to Data Portability)',
              'Δικαίωμα Εναντίωσης (Right to Object)',
              'Δικαίωμα Ανάκλησης Συναίνεσης (Right to Withdraw Consent)'
            ],
            en: [
              'Right of Access',
              'Right to Rectification',
              'Right to Erasure / "Right to be Forgotten"',
              'Right to Restriction of Processing',
              'Right to Data Portability',
              'Right to Object',
              'Right to Withdraw Consent'
            ]
          },
          contact: {
            el: 'Για να ασκήσετε οποιοδήποτε από αυτά τα δικαιώματα, επικοινωνήστε μαζί μας στο: devtaskhub@gmail.com',
            en: 'To exercise any of these rights, contact us at: devtaskhub@gmail.com'
          }
        },
        dataRetention: {
          title: {
            el: '9. Διατήρηση Δεδομένων',
            en: '9. Data Retention'
          },
          policyTitle: {
            el: '9.1 Πολιτική Διατήρησης',
            en: '9.1 Retention Policy'
          },
          policy: {
            el: [
              'Δεδομένα Λογαριασμού: Διατηρούνται για όσο ο λογαριασμός είναι ενεργός',
              'Ιστορικό Κοινοποίησης/Κρατήσεων: 6 μήνες',
              'Δεδομένα Τοποθεσίας: Διαγράφονται άμεσα μετά τη χρήση (εκτός ενεργών κρατήσεων)',
              'Analytics Data: 24 μήνες'
            ],
            en: [
              'Account Data: Retained for as long as the account is active',
              'Sharing/Reservation History: 6 months',
              'Location Data: Deleted immediately after use (except active reservations)',
              'Analytics Data: 24 months'
            ]
          },
          deletionTitle: {
            el: '9.2 Διαγραφή μετά τη Διαγραφή Λογαριασμού',
            en: '9.2 Deletion After Account Deletion'
          },
          deletion: {
            el: 'Μετά τη διαγραφή του λογαριασμού, όλα τα προσωπικά δεδομένα διαγράφονται εντός 30 ημερών (εκτός εάν απαιτείται διατήρηση από το νόμο).',
            en: 'After deletion of the account, all personal data is deleted within 30 days (unless retention is required by law).'
          }
        },
        thirdParties: {
          title: {
            el: '10. Κοινοποίηση σε Τρίτους',
            en: '10. Disclosure to Third Parties'
          },
          intro: {
            el: 'Κοινοποιούμε τα προσωπικά σας δεδομένα στους ακόλουθους τρίτους (όλοι GDPR-compliant με DPAs):',
            en: 'We disclose your personal data to the following third parties (all GDPR-compliant with DPAs):'
          },
          parties: {
            el: [
              'Supabase: Database & Authentication',
              'Google Maps API: Πλοήγηση και χάρτες',
              'Cloud Hosting Providers: Hosting & backup',
              'Analytics Services: Ανάλυση χρήσης (με συναίνεση)'
            ],
            en: [
              'Supabase: Database & Authentication',
              'Google Maps API: Navigation and maps',
              'Cloud Hosting Providers: Hosting & backup',
              'Analytics Services: Usage analysis (with consent)'
            ]
          },
          details: {
            el: 'Για λεπτομέρειες, δείτε την Πολιτική Απορρήτου μας.',
            en: 'For details, see our Privacy Policy.'
          }
        },
        securityMeasures: {
          title: {
            el: '11. Μέτρα Ασφάλειας (GDPR Article 32)',
            en: '11. Security Measures (GDPR Article 32)'
          },
          intro: {
            el: 'Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα:',
            en: 'We implement appropriate technical and organizational measures:'
          },
          measures: {
            el: [
              'Κρυπτογράφηση (TLS/SSL)',
              'Row-Level Security (RLS)',
              'Authentication & Authorization',
              'Regular Security Audits',
              'Access Controls',
              'Backup & Recovery',
              'Incident Response Plan'
            ],
            en: [
              'Encryption (TLS/SSL)',
              'Row-Level Security (RLS)',
              'Authentication & Authorization',
              'Regular Security Audits',
              'Access Controls',
              'Backup & Recovery',
              'Incident Response Plan'
            ]
          },
          details: {
            el: 'Για λεπτομέρειες, δείτε την Πολιτική Απορρήτου μας.',
            en: 'For details, see our Privacy Policy.'
          }
        },
        cookies: {
          title: {
            el: '12. Cookies & Analytics',
            en: '12. Cookies & Analytics'
          },
          intro: {
            el: 'Η εφαρμογή χρησιμοποιεί cookies για:',
            en: 'The app uses cookies for:'
          },
          uses: {
            el: [
              'Session management',
              'Authentication',
              'Αποθήκευση προτιμήσεων',
              'Analytics (με συναίνεση)'
            ],
            en: [
              'Session management',
              'Authentication',
              'Storing preferences',
              'Analytics (with consent)'
            ]
          },
          management: {
            el: 'Μπορείτε να διαχειριστείτε τα cookies από τις ρυθμίσεις της εφαρμογής ή του browser σας.',
            en: 'You can manage cookies from the app settings or your browser settings.'
          }
        },
        notifications: {
          title: {
            el: '13. Ειδοποιήσεις & Τοποθεσία',
            en: '13. Notifications & Location'
          },
          gpsTitle: {
            el: '13.1 Χρήση GPS',
            en: '13.1 Use of GPS'
          },
          gpsContent: {
            el: 'Η εφαρμογή χρησιμοποιεί δεδομένα τοποθεσίας (GPS) σε πραγματικό χρόνο για:',
            en: 'The app uses location data (GPS) in real-time for:'
          },
          gps: {
            el: [
              'Εντοπισμό διαθέσιμων θέσεων κοντά σας',
              'Αποστολή ειδοποιήσεων',
              'Πλοήγηση'
            ],
            en: [
              'Identifying available spots near you',
              'Sending notifications',
              'Navigation'
            ]
          },
          retentionTitle: {
            el: '13.2 Διατήρηση Δεδομένων Τοποθεσίας',
            en: '13.2 Location Data Retention'
          },
          retention: {
            el: [
              'Real-time data: Διαγράφεται άμεσα μετά τη χρήση',
              'Active reservations: Διατηρείται μόνο για τη διάρκεια της κράτησης'
            ],
            en: [
              'Real-time data: Deleted immediately after use',
              'Active reservations: Retained only for the duration of the reservation'
            ]
          }
        },
        dataBreaches: {
          title: {
            el: '14. Παραβιάσεις Δεδομένων (GDPR Articles 33-34)',
            en: '14. Data Breaches (GDPR Articles 33-34)'
          },
          intro: {
            el: 'Σε περίπτωση παραβίασης δεδομένων:',
            en: 'In case of a data breach:'
          },
          notification: {
            el: [
              'Ειδοποίηση Αρχής εντός 72 ωρών',
              'Ειδοποίηση χρηστών χωρίς αδικαιολόγητη καθυστέρηση (εάν ο κίνδυνος είναι υψηλός)'
            ],
            en: [
              'Notification to Authority within 72 hours',
              'Notification to users without undue delay (if the risk is high)'
            ]
          }
        },
        dataTransfer: {
          title: {
            el: '15. Μεταφορά Δεδομένων εκτός ΕΕ',
            en: '15. Data Transfer Outside the EU'
          },
          intro: {
            el: 'Ορισμένα από τα προσωπικά σας δεδομένα μπορεί να μεταφέρονται και να επεξεργάζονται εκτός της Ευρωπαϊκής Ένωσης (π.χ. Supabase backup servers, Google services).',
            en: 'Some of your personal data may be transferred and processed outside the European Union (e.g., Supabase backup servers, Google services).'
          },
          safeguards: {
            el: [
              'Adequacy Decisions: Οι χώρες έχουν επαρκές επίπεδο προστασίας (Adequacy Decision από την ΕΕ)',
              'Standard Contractual Clauses (SCCs): Χρησιμοποιούμε Standard Contractual Clauses που έχουν εγκριθεί από την Ευρωπαϊκή Επιτροπή',
              'Άλλα κατάλληλα μέτρα προστασίας: Σύμφωνα με το GDPR'
            ],
            en: [
              'Adequacy Decisions: Countries have adequate protection level (Adequacy Decision from EU)',
              'Standard Contractual Clauses (SCCs): We use Standard Contractual Clauses approved by the European Commission',
              'Other appropriate protection measures: In accordance with GDPR'
            ]
          }
        },
        contactData: {
          title: {
            el: '16. Επικοινωνία & Data Controller',
            en: '16. Contact & Data Controller'
          },
          controller: {
            el: 'Data Controller:',
            en: 'Data Controller:'
          },
          company: {
            el: 'T-Parking',
            en: 'T-Parking'
          },
          email: {
            el: 'Email:',
            en: 'Email:'
          },
          emailValue: {
            el: 'devtaskhub@gmail.com',
            en: 'devtaskhub@gmail.com'
          },
          support: {
            el: 'Υποστήριξη:',
            en: 'Support:'
          },
          authority: {
            el: 'Αρχή Προστασίας Δεδομένων:',
            en: 'Data Protection Authority:'
          },
          authorityValue: {
            el: 'www.dpa.gr | dpa@dpa.gr',
            en: 'www.dpa.gr | dpa@dpa.gr'
          }
        },
        liability: {
          title: {
            el: '17. Περιορισμός Ευθύνης',
            en: '17. Limitation of Liability'
          },
          asIsTitle: {
            el: '17.1 "As Is" Provision',
            en: '17.1 "As Is" Provision'
          },
          asIsContent: {
            el: 'Το T-Parking παρέχεται "ως έχει" (as is). Δεν εγγυόμαστε:',
            en: 'T-Parking is provided "as is." We do not guarantee:'
          },
          guarantees: {
            el: [
              'Ότι η εφαρμογή θα λειτουργεί αδιάλειπτα ή χωρίς σφάλματα',
              'Ότι οι θέσεις στάθμευσης θα είναι διαθέσιμες όταν φτάσετε',
              'Ότι οι ειδοποιήσεις θα παραδοθούν εγκαίρως ή πάντα',
              'Ότι δεν θα υπάρξουν technical issues ή downtime'
            ],
            en: [
              'That the app will operate continuously or without errors',
              'That parking spots will be available when you arrive',
              'That notifications will be delivered on time or always',
              'That there will be no technical issues or downtime'
            ]
          },
          limitationTitle: {
            el: '17.2 Περιορισμός Ευθύνης',
            en: '17.2 Limitation of Liability'
          },
          limitationContent: {
            el: 'Δεν φέρουμε ευθύνη για:',
            en: 'We are not responsible for:'
          },
          limitations: {
            el: [
              'Ζημίες, απώλειες, ή διαφορές που προκύπτουν από τη χρήση ή την αδυναμία χρήσης της εφαρμογής',
              'Κρατήσεις που δεν είναι διαθέσιμες όταν φτάσετε',
              'Ειδοποιήσεις που δεν παραδίδονται',
              'Σφάλματα στην εφαρμογή',
              'Απώλεια δεδομένων',
              'Παραβιάσεις ασφάλειας από τρίτους',
              'Προβλήματα με third-party services (Google Maps, Supabase, κ.ά.)',
              'Αναμενόμενα ή μη αναμενόμενα downtime'
            ],
            en: [
              'Damages, losses, or differences arising from use or inability to use the app',
              'Reservations that are not available when you arrive',
              'Notifications that are not delivered',
              'Errors in the app',
              'Data loss',
              'Security breaches by third parties',
              'Problems with third-party services (Google Maps, Supabase, etc.)',
              'Expected or unexpected downtime'
            ]
          },
          maximumTitle: {
            el: '17.3 Μέγιστη Ευθύνη',
            en: '17.3 Maximum Liability'
          },
          maximum: {
            el: 'Σημείωση: Η εφαρμογή είναι 100% δωρεάν - δεν υπάρχουν premium, platinum ή άλλα subscriptions με πληρωμή. Όλα τα features είναι διαθέσιμα δωρεάν σε όλους τους χρήστες. Κατά συνέπεια, η μέγιστη ευθύνη μας είναι €0.',
            en: 'Note: The app is 100% free - there are no premium, platinum, or other paid subscriptions. All features are available for free to all users. Consequently, our maximum liability is €0.'
          }
        },
        modifications: {
          title: {
            el: '18. Τροποποιήσεις Όρων',
            en: '18. Modifications of Terms'
          },
          rightTitle: {
            el: '18.1 Δικαίωμα Τροποποίησης',
            en: '18.1 Right to Modify'
          },
          rightContent: {
            el: 'Μπορούμε να τροποποιήσουμε αυτούς τους Όρους και Προϋποθέσεις Χρήσης οποιαδήποτε στιγμή.',
            en: 'We may modify these Terms and Conditions of Use at any time.'
          },
          notificationTitle: {
            el: '18.2 Ειδοποίηση Αλλαγών',
            en: '18.2 Change Notification'
          },
          notification: {
            el: [
              'Οι σημαντικές αλλαγές θα ανακοινωθούν μέσω της εφαρμογής ή email',
              'Η ημερομηνία "Τελευταία Ενημέρωση" θα ενημερώνεται στην κορυφή αυτής της σελίδας'
            ],
            en: [
              'Significant changes will be announced through the app or email',
              'The "Last Updated" date will be updated at the top of this page'
            ]
          },
          continuedUseTitle: {
            el: '18.3 Συνεχής Χρήση',
            en: '18.3 Continued Use'
          },
          continuedUse: {
            el: [
              'Η συνεχής χρήση της εφαρμογής μετά από τροποποιήσεις συνεπάγεται αποδοχή των νέων όρων',
              'Σας συνιστούμε να ελέγχετε τακτικά αυτή τη σελίδα για ενημερώσεις'
            ],
            en: [
              'Continued use of the app after modifications implies acceptance of the new terms',
              'We recommend that you check this page regularly for updates'
            ]
          }
        },
        termination: {
          title: {
            el: '19. Τερματισμός',
            en: '19. Termination'
          },
          byUsTitle: {
            el: '19.1 Τερματισμός από Εμάς',
            en: '19.1 Termination by Us'
          },
          byUsContent: {
            el: 'Διατηρούμε το δικαίωμα να τερματίσουμε ή να αναστείλουμε την πρόσβασή σας στην εφαρμογή χωρίς προειδοποίηση σε περίπτωση:',
            en: 'We reserve the right to terminate or suspend your access to the app without notice in case of:'
          },
          byUsReasons: {
            el: [
              'Παραβίασης αυτών των όρων',
              'Παράνομης χρήσης',
              'Κατάχρησης της υπηρεσίας',
              'Αίτημα διαγραφής λογαριασμού από εσάς'
            ],
            en: [
              'Violation of these terms',
              'Illegal use',
              'Service abuse',
              'Account deletion request from you'
            ]
          },
          byYouTitle: {
            el: '19.2 Τερματισμός από Εσάς',
            en: '19.2 Termination by You'
          },
          byYouContent: {
            el: 'Μπορείτε να τερματίσετε τη χρήση της εφαρμογής οποιαδήποτε στιγμή διαγράφοντας τον λογαριασμό σας.',
            en: 'You can terminate the use of the app at any time by deleting your account.'
          },
          afterTitle: {
            el: '19.3 Μετά τον Τερματισμό',
            en: '19.3 After Termination'
          },
          after: {
            el: [
              'Τα δεδομένα σας θα διαγραφούν σύμφωνα με την πολιτική διατήρησης (30 ημέρες)',
              'Δεν θα έχετε πρόσβαση στις υπηρεσίες της εφαρμογής',
              'Οι κρατήσεις και οι πόντοι σας δεν θα είναι διαθέσιμοι'
            ],
            en: [
              'Your data will be deleted according to the retention policy (30 days)',
              'You will not have access to the app services',
              'Your reservations and points will not be available'
            ]
          }
        },
        childrenData: {
          title: {
            el: '20. Δεδομένα Παιδιών (Άρθρο 8 GDPR)',
            en: '20. Children\'s Data (Article 8 GDPR)'
          },
          ageRestriction: {
            el: 'Η εφαρμογή T-Parking προορίζεται για χρήστες άνω των 18 ετών.',
            en: 'The T-Parking app is intended for users over 18 years of age.'
          },
          noChildren: {
            el: 'Δεν επιτρέπουμε την εγγραφή ή χρήση της εφαρμογής από χρήστες κάτω των 18 ετών.',
            en: 'We do not allow registration or use of the app by users under 18 years of age.'
          },
          termination: {
            el: 'Εάν ανακαλύψουμε ότι ένας χρήστης είναι κάτω των 18 ετών, θα τερματίσουμε άμεσα τον λογαριασμό του και θα διαγράψουμε όλα τα δεδομένα του.',
            en: 'If we discover that a user is under 18 years of age, we will immediately terminate their account and delete all their data.'
          },
          parentContact: {
            el: 'Εάν είστε γονέας ή κηδεμόνας και πιστεύετε ότι το παιδί σας έχει δημιουργήσει λογαριασμό, επικοινωνήστε μαζί μας στο: devtaskhub@gmail.com',
            en: 'If you are a parent or guardian and believe your child has created an account, contact us at: devtaskhub@gmail.com'
          }
        },
        specialCategories: {
          title: {
            el: '21. Ειδικές Κατηγορίες Δεδομένων (Άρθρο 9 GDPR)',
            en: '21. Special Categories of Data (Article 9 GDPR)'
          },
          content: {
            el: 'Δεν συλλέγουμε ή επεξεργαζόμαστε "ειδικές κατηγορίες" προσωπικών δεδομένων όπως ορίζονται στο Άρθρο 9 GDPR.',
            en: 'We do not collect or process "special categories" of personal data as defined in Article 9 GDPR.'
          }
        },
        automatedDecision: {
          title: {
            el: '22. Αυτοματοποιημένη Λήψη Αποφάσεων (Άρθρο 22 GDPR)',
            en: '22. Automated Decision-Making (Article 22 GDPR)'
          },
          content: {
            el: 'Δεν χρησιμοποιούμε αυτοματοποιημένη λήψη αποφάσεων ή profiling που παράγει νομικά αποτελέσματα ή επηρεάζει σημαντικά τα δικαιώματα ή τις ελευθερίες σας. Το σύστημα πόντων και rankings είναι καθαρά υπολογιστικό.',
            en: 'We do not use automated decision-making or profiling that produces legal effects or significantly affects your rights or freedoms. The points system and rankings are purely computational.'
          }
        },
        privacyByDesign: {
          title: {
            el: '23. Προστασία Δεδομένων από Σχεδιασμό (Άρθρο 25 GDPR)',
            en: '23. Data Protection by Design (Article 25 GDPR)'
          },
          intro: {
            el: 'Εφαρμόζουμε "Privacy by Design" και "Privacy by Default":',
            en: 'We apply "Privacy by Design" and "Privacy by Default":'
          },
          measures: {
            el: [
              'Συλλέγουμε μόνο τα απαραίτητα δεδομένα',
              'Κρυπτογράφηση ενεργή από προεπιλογή',
              'Προστατευτικές ρυθμίσεις από προεπιλογή'
            ],
            en: [
              'We collect only necessary data',
              'Encryption active by default',
              'Protective settings by default'
            ]
          }
        },
        processingRecords: {
          title: {
            el: '24. Καταγραφές Επεξεργασίας (Άρθρο 30 GDPR)',
            en: '24. Processing Records (Article 30 GDPR)'
          },
          content: {
            el: 'Διατηρούμε καταγραφές όλων των δραστηριοτήτων επεξεργασίας προσωπικών δεδομένων, διαθέσιμες για έλεγχο από την ΑΠΔΠΧ.',
            en: 'We maintain records of all personal data processing activities, available for inspection by the HDPA.'
          }
        },
        jurisdiction: {
          title: {
            el: '25. Δικαιοδοσία & Εφαρμοστέο Δίκαιο',
            en: '25. Jurisdiction & Applicable Law'
          },
          applicableTitle: {
            el: '25.1 Εφαρμοστέο Δίκαιο',
            en: '25.1 Applicable Law'
          },
          applicableIntro: {
            el: 'Αυτοί οι Όροι και Προϋποθέσεις Χρήσης διέπονται από:',
            en: 'These Terms and Conditions of Use are governed by:'
          },
          applicableLaws: {
            el: [
              'Ελληνικό Δίκαιο',
              'GDPR: Κανονισμός (ΕΕ) 2016/679',
              'Ελληνικός Νόμος 4624/2019'
            ],
            en: [
              'Greek Law',
              'GDPR: Regulation (EU) 2016/679',
              'Greek Law 4624/2019'
            ]
          },
          jurisdictionTitle: {
            el: '25.2 Δικαιοδοσία',
            en: '25.2 Jurisdiction'
          },
          jurisdictionContent: {
            el: 'Οποιαδήποτε διαφωνία που προκύπτει από ή σχετίζεται με αυτούς τους όρους θα επιλυθεί από τα αρμόδια δικαστήρια της Ελλάδας.',
            en: 'Any dispute arising from or related to these terms will be resolved by the competent courts of Greece.'
          },
          adrTitle: {
            el: '25.3 Εναλλακτική Επίλυση Διαφορών (ADR)',
            en: '25.3 Alternative Dispute Resolution (ADR)'
          },
          adrContent: {
            el: 'Για καταναλωτικές διαφορές, έχετε το δικαίωμα να καταφύγετε σε εναλλακτικές διαδικασίες επίλυσης διαφορών (ADR) σύμφωνα με το ελληνικό δίκαιο.',
            en: 'For consumer disputes, you have the right to resort to alternative dispute resolution (ADR) procedures in accordance with Greek law.'
          },
          authorityTitle: {
            el: '25.4 Εποπτική Αρχή',
            en: '25.4 Supervisory Authority'
          },
          authorityContent: {
            el: 'Η Ελληνική Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ) είναι η αρμόδια εποπτική αρχή για θέματα προστασίας δεδομένων.',
            en: 'The Hellenic Data Protection Authority (HDPA) is the competent supervisory authority for data protection matters.'
          }
        },
        severability: {
          title: {
            el: '26. Αναποτελεσματικότητα Ρήτρων',
            en: '26. Severability'
          },
          content: {
            el: 'Εάν οποιαδήποτε ρήτρα αυτών των όρων κριθεί άκυρη, παράνομη ή μη εφαρμόσιμη, οι υπόλοιπες ρήτρες παραμένουν σε ισχύ.',
            en: 'If any clause of these terms is found to be invalid, illegal, or unenforceable, the remaining clauses remain in effect.'
          }
        },
        disclaimer: {
          title: {
            el: '27. Αποποίηση Εγγυήσεων',
            en: '27. Disclaimer of Warranties'
          },
          intro: {
            el: 'Δεν παρέχουμε καμία εγγύηση, ρητή ή σιωπηρή, σχετικά με:',
            en: 'We provide no warranty, express or implied, regarding:'
          },
          warranties: {
            el: [
              'Τη διαθεσιμότητα ή την αδιάλειπτη λειτουργία της εφαρμογής',
              'Την ακρίβεια ή την πληρότητα των πληροφοριών',
              'Την απουσία σφαλμάτων ή bugs',
              'Τη συμβατότητα με συγκεκριμένες συσκευές ή λειτουργικά συστήματα'
            ],
            en: [
              'The availability or uninterrupted operation of the app',
              'The accuracy or completeness of information',
              'The absence of errors or bugs',
              'Compatibility with specific devices or operating systems'
            ]
          }
        },
        contact: {
          title: {
            el: '28. Επικοινωνία',
            en: '28. Contact'
          },
          intro: {
            el: 'Για οποιαδήποτε ερώτηση, αίτημα ή ανησυχία σχετικά με αυτούς τους Όρους και Προϋποθέσεις Χρήσης, επικοινωνήστε μαζί μας:',
            en: 'For any questions, requests, or concerns regarding these Terms and Conditions of Use, please contact us:'
          },
          email: {
            el: 'Email:',
            en: 'Email:'
          },
          emailValue: {
            el: 'devtaskhub@gmail.com',
            en: 'devtaskhub@gmail.com'
          },
          support: {
            el: 'Υποστήριξη:',
            en: 'Support:'
          },
          response: {
            el: 'Θα απαντήσουμε στο αίτημά σας εντός 30 ημερών (ή 90 ημερών σε περίπλοκες περιπτώσεις, με προηγούμενη ειδοποίηση).',
            en: 'We will respond to your request within 30 days (or 90 days in complex cases, with prior notice).'
          }
        },
        entireAgreement: {
          title: {
            el: '29. Ολική Συμφωνία',
            en: '29. Entire Agreement'
          },
          content: {
            el: 'Αυτοί οι Όροι και Προϋποθέσεις Χρήσης, μαζί με την Πολιτική Απορρήτου μας, αποτελούν την ολική συμφωνία μεταξύ εσάς και του T-Parking σχετικά με τη χρήση της εφαρμογής.',
            en: 'These Terms and Conditions of Use, together with our Privacy Policy, constitute the entire agreement between you and T-Parking regarding the use of the application.'
          }
        },
      lastUpdate: {
        el: 'Τελευταία Ενημέρωση: 7 Δεκεμβρίου 2025',
        en: 'Last Updated: December 7, 2025'
      },
      copyright: {
        el: '© 2025 T-Parking. Όλα τα δικαιώματα διατηρούνται.',
        en: '© 2025 T-Parking. All rights reserved.'
      }
    }
  }
} as const;
