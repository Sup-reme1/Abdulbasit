/*
 * PORTFOLIO DATA — single source of truth for projects and experience.
 *
 * Every project here gets its own page at:   project.html?id=<id>
 * Every experience here gets its own page at: experience.html?id=<id>
 *
 * See HOW-TO-ADD-PROJECTS.md for a full guide and a copy-paste template.
 * Any field you leave out is simply not shown.
 */

window.PORTFOLIO = {
  projects: [
    {
      id: "automated-shoe-polishing-machine",
      title: "Automated Shoe Polishing Machine",
      subtitle:
        "Final year project: a multi-axis mechatronic system that cleans and polishes formal leather shoes automatically.",
      category: "academic", // academic | professional | award | personal
      featured: true,
      year: "2025",
      role: "Lead designer and developer (sole author)",
      context:
        "B.Sc. final year project, Department of Electronic and Computer Engineering, Lagos State University. Supervised by Prof. A.I.O. Yussuff.",
      tags: ["Embedded Systems", "Mechatronics", "Arduino", "C++", "Motion Control", "Fusion 360", "KiCad"],
      cover: {
        src: "assets/projects/shoe-polisher/cad-3d-assembly.png",
        alt: "3D CAD assembly of the automated shoe polishing machine",
      },
      summary:
        "Designed, modelled, wired, programmed and built a working prototype that rotates a shoe, translates dual brushes along it, and dispenses liquid polish, all coordinated by an Arduino-based state machine.",
      highlights: [
        { value: "90%", label: "Shoe surface coverage in testing" },
        { value: "3", label: "Stepper motors coordinated" },
        { value: "3", label: "Subsystems: mechanical, electronic, firmware" },
        { value: "2", label: "Polish colours with automatic brush change" },
      ],
      problem: [
        "Polished formal shoes are expected in professional and university settings, but manual polishing is slow, labour-intensive and inconsistent. The automatic polishers that exist rarely clean before polishing, apply polish unevenly, and cannot adapt to the contours of a shoe.",
        "The goal was a low-cost, hygienic, user-friendly machine for formal leather shoes, aimed at students and staff at LASU Epe Campus.",
      ],
      objectives: [
        "Design an automated machine with both cleaning and polishing functions.",
        "Develop an integrated hardware and software control system using an Arduino microcontroller.",
        "Evaluate the performance of the prototype through testing.",
      ],
      approach: [
        {
          title: "Mechanical design (Fusion 360)",
          text: "Modelled the full frame, shoe holder and brush carriages in CAD before building. A NEMA 17 stepper rotates the shoe through 360°, and lead-screw carriages driven by further NEMA 17 steppers translate horizontal and vertical brushes across the heel, sides and vamp.",
        },
        {
          title: "Electronics (KiCad)",
          text: "Arduino Uno as the controller, with an MCP23017 I²C GPIO expander for extra outputs. A4988 drivers handle the NEMA 17 steppers and a ULN2003 drives the 28BYJ-48 brush-change motor. Relays switch the 12 V brush motors, polish pumps and buzzer so the logic side stays isolated. A buck converter steps the 12 V supply down to 5 V for the logic, and a 16×2 I²C LCD shows status.",
        },
        {
          title: "Firmware (C++ / Arduino)",
          text: "Wrote the firmware as a state machine (idle → colour selection → start → clean → polish → alert → reset). It sequences motor actuation, timing and pump dispensing, handles left and right shoes in turn, and automatically rotates the brush face to match the selected polish colour.",
        },
        {
          title: "Fabrication and integration",
          text: "Built the physical prototype from wood, steel guide rods, threaded rods, bearings, couplers and foam dampers, then integrated it with a front-panel control box (LCD, power switch, start button, status LEDs, buzzer) and a two-colour polish reservoir with spray nozzles.",
        },
      ],
      code: {
        language: "cpp",
        caption: "Excerpt from the firmware's main state machine (full listing in the project report, Appendix B)",
        content: `enum SystemState { DEFAULT_MODE, ENTER_COLOR, START };
SystemState currentState = DEFAULT_MODE;

void loop() {
  switch (currentState) {
    case DEFAULT_MODE:
      screen("Enter Polish Color");
      currentState = ENTER_COLOR;
      break;

    case ENTER_COLOR:
      if (digitalRead(BrpolishButtonPin) == LOW) {
        shoeColor = 1;                 // 0 = black, 1 = brown
        screen("Brown Polish Selected");
        changePolishBrush(1);          // rotate brush face to match colour
        currentState = START;
      }
      break;

    case START:
      if (digitalRead(startButtonPin) == LOW) {
        screen("Polishing in progress");
        cleanShoe();
        polishShoe();
        alertUser();                   // buzzer + LCD prompt
      }
      break;
  }
}`,
      },
      results: [
        "The prototype consistently completed a full clean-and-polish cycle once the user started it.",
        "Testing on a formal leather loafer polished about 90% of the shoe surface.",
        "The dual-axis brushing and lead-screw translation reached the heel, sides and vamp, areas single-axis machines often miss.",
        "The remaining ~10% sat at the points where the fixed holder grips the toe and heel. That identified the holding mechanism as the main limitation.",
      ],
      challenges: [
        "Mechanical alignment: getting the shoe holder to grip and rotate the shoe reliably needed careful force balancing, and took more time and material than planned.",
        "Power and noise: high-current motors and pumps had to be isolated from the logic circuitry using relays and drivers.",
        "Running out of microcontroller pins: an I²C GPIO expander was added to drive all the actuators from a single Arduino Uno.",
      ],
      learnings: [
        "Building a complete electromechanical system end to end, from CAD to schematic to firmware to fabrication.",
        "Testing against measurable criteria (surface coverage) and tracing the remaining errors to a specific mechanical cause.",
        "Writing state-machine firmware that coordinates several actuators in sequence.",
        "Writing up the work as a full engineering report and an end-user manual.",
      ],
      futureWork: [
        "An adaptive, sensor-driven shoe holder that detects shoe size and repositions during the cycle to reach 100% coverage.",
        "Measuring coverage with a camera instead of by eye, and using vision to detect shoe shape and adjust brush paths.",
        "Multi-colour polishing on a single shoe without cross-contamination.",
        "Mirroring the unit to polish the left and right shoes at the same time.",
      ],
      gallery: [
        { group: "Design (CAD)", src: "assets/projects/shoe-polisher/concept-sketch.jpg", caption: "Initial hand sketch of the brush rotation and translation system" },
        { group: "Design (CAD)", src: "assets/projects/shoe-polisher/cad-3d-assembly.png", caption: "Full 3D assembly in Fusion 360" },
        { group: "Design (CAD)", src: "assets/projects/shoe-polisher/cad-front-view.png", caption: "Front view: control box, brush motors and shoe-rotation stepper" },
        { group: "Design (CAD)", src: "assets/projects/shoe-polisher/cad-side-view.png", caption: "Side view: polish tanks and lead-screw brush translation" },
        { group: "Design (CAD)", src: "assets/projects/shoe-polisher/cad-brush-translation.jpg", caption: "Brush translation mechanism: stepper, lead screw and guide rods" },
        { group: "Design (CAD)", src: "assets/projects/shoe-polisher/cad-brush-translation-top.jpg", caption: "Brush translation mechanism, top view" },
        { group: "Design (CAD)", src: "assets/projects/shoe-polisher/cad-enclosure.png", caption: "Enclosed machine concept" },
        { group: "System design", src: "assets/projects/shoe-polisher/block-diagram.png", caption: "System block diagram" },
        { group: "System design", src: "assets/projects/shoe-polisher/flowchart.png", caption: "Operation flowchart" },
        { group: "System design", src: "assets/projects/shoe-polisher/circuit-diagram.png", caption: "Full circuit schematic (KiCad)" },
        { group: "Build & prototype", src: "assets/projects/shoe-polisher/build-top-view.jpg", caption: "Completed prototype, top view" },
        { group: "Build & prototype", src: "assets/projects/shoe-polisher/build-control-box.jpg", caption: "Control box: LCD, power switch, start button, status LEDs, buzzer" },
        { group: "Build & prototype", src: "assets/projects/shoe-polisher/build-shoe-holder.jpg", caption: "Shoe holder and brush translation rods with a loafer in place" },
        { group: "Build & prototype", src: "assets/projects/shoe-polisher/build-polish-tanks.jpg", caption: "Polish reservoirs and diaphragm pump" },
        { group: "Build & prototype", src: "assets/projects/shoe-polisher/build-spray-nozzles.jpg", caption: "Polish spray nozzle manifold" },
        { group: "Build & prototype", src: "assets/projects/shoe-polisher/build-brush-assembly.jpg", caption: "Brush carriage assembly" },
      ],
      documents: [
        { label: "Project Report (PDF)", href: "documents/shoe-polisher-project-report.pdf" },
        { label: "User Manual (PDF)", href: "documents/shoe-polisher-user-manual.pdf" },
      ],
      links: [
        // { label: "Source code (GitHub)", href: "https://github.com/your-username/robotic-car" },
        // { label: "Demo video", href: "https://youtube.com/..." },
      ],
      skills: ["Embedded C++", "Arduino", "Stepper motor control", "I²C / GPIO expansion", "Relay & driver circuits", "Fusion 360", "KiCad", "Prototyping", "Technical writing"],
    },

    {
      id: "aquatech-aquaculture-automation",
      title: "AQUATECH: Automated Aquaculture Management",
      subtitle: "1st place, AgroInnovatex Challenge.",
      category: "award",
      featured: true,
      year: "",
      role: "Designer",
      tags: ["Embedded Systems", "IoT", "Precision Agriculture", "Sensors", "Actuators"],
      summary:
        "An award-winning system that uses microprocessors, environmental sensors and mechanical actuators to automate fish feeding cycles and water quality and exchange management in real time.",
      highlights: [{ value: "1st", label: "Place, AgroInnovatex Challenge" }],
      problem: [
        "Fish farming depends on regular feeding and stable water quality. Doing both by hand takes a lot of labour and leads to mistakes.",
      ],
      approach: [
        {
          title: "Sensing",
          text: "Environmental sensors monitor water-quality parameters continuously.",
        },
        {
          title: "Actuation",
          text: "Mechanical actuators automate feeding cycles and water exchange based on sensor readings and schedules.",
        },
      ],
      results: ["Won 1st place at the AgroInnovatex Challenge."],
      skills: ["Embedded systems", "Sensor integration", "Control logic", "Innovation pitching"],
    },

    {
      id: "electronic-id-card-system",
      title: "Electronic ID Card System",
      subtitle: "Embedded systems and smart security: RFID/NFC identity verification.",
      category: "academic",
      year: "",
      role: "Co-designer and firmware developer",
      tags: ["Embedded Systems", "RFID/NFC", "Security", "Low-power design"],
      summary:
        "A prototype electronic ID card system that combines embedded microcontrollers, RFID/NFC modules and secure data storage for identity verification.",
      approach: [
        { title: "Hardware", text: "Designed low-power circuit schematics and hardware architecture for portable, handheld operation." },
        { title: "Firmware", text: "Programmed firmware to manage encrypted data transmission between the smart card and authentication readers, for secure access control." },
      ],
      skills: ["Firmware", "RFID/NFC", "Low-power circuit design", "Encryption basics"],
    },

    {
      id: "smart-home-iot-monitoring",
      title: "Smart Home IoT Monitoring System",
      subtitle: "Arduino + GSM remote alerting for home safety.",
      category: "academic",
      year: "",
      role: "Developer",
      tags: ["IoT", "Arduino", "GSM", "UART", "Sensors"],
      summary:
        "An automated home-monitoring setup that uses an Arduino and a GSM module to send remote status alerts.",
      approach: [
        { title: "Communication", text: "Set up low-level serial communication (UART / AT commands) for real-time cellular data and event notifications." },
        { title: "Sensing", text: "Connected several environmental sensors, with threshold-detection logic that sends remote notifications when a safety limit is breached." },
      ],
      skills: ["Arduino", "GSM / AT commands", "UART", "Sensor thresholds"],
    },

    {
      id: "bluetooth-robotic-car",
      title: "Bluetooth-Controlled 4-Wheel Robotic Car",
      subtitle: "Mobile robot with differential steering over HC-05 Bluetooth.",
      category: "personal",
      year: "",
      role: "Designer and builder",
      tags: ["Robotics", "Arduino", "Bluetooth", "Motor Control"],
      summary:
        "A four-wheel mobile robot built on an Arduino controller, dual H-bridge motor drivers and an HC-05 Bluetooth serial interface.",
      approach: [
        { title: "Firmware", text: "Wrote custom firmware that parses incoming serial data and applies real-time differential steering and speed control." },
        { title: "Power design", text: "Designed the power distribution to keep motor noise away from the logic circuitry, which stopped the controller from resetting." },
      ],
      skills: ["Motor drivers (H-bridge)", "Serial parsing", "Power isolation", "Robotics"],
    },

    {
      id: "sound-detector-alarm",
      title: "Sound Detector Safety Alarm System",
      subtitle: "Interrupt-driven acoustic safety alarm.",
      category: "academic",
      year: "",
      role: "Developer",
      tags: ["Embedded Systems", "Interrupts", "Signal Conditioning"],
      summary:
        "A real-time, event-triggered safety system using high-sensitivity acoustic sensors, a microcontroller, and visual and audible outputs.",
      approach: [
        { title: "Noise rejection", text: "Calibrated the hardware threshold and added software debouncing to cut false triggers from background noise." },
        { title: "Latency", text: "Used interrupt-driven routines so the alarm responds within a millisecond of the threshold being crossed." },
      ],
      skills: ["Interrupts", "Debouncing", "Sensor calibration"],
    },

    {
      id: "transistor-level-logic-gates",
      title: "Transistor-Level Logic Gate Modelling",
      subtitle: "Digital logic built from discrete BJTs and MOSFETs.",
      category: "academic",
      year: "",
      role: "Experimenter",
      tags: ["Digital Electronics", "Semiconductors", "Lab Work"],
      summary:
        "Designed and verified the basic logic gates (AND, OR, NOT, NAND, NOR) using only discrete bipolar junction transistors and MOSFETs.",
      approach: [
        { title: "Analysis", text: "Studied logic behaviour, noise margins, switching delays and signal performance at the semiconductor level." },
        { title: "Validation", text: "Compared measured output voltages with Boolean truth tables using a multimeter and oscilloscope." },
      ],
      skills: ["Oscilloscope", "Multimeter", "BJT / MOSFET design", "Experimental validation"],
    },

    {
      id: "lms-backend",
      title: "Learning Management System (Backend)",
      subtitle: "REST backend with role-based access control.",
      category: "personal",
      year: "",
      role: "Backend developer",
      tags: ["Software Engineering", "Node.js", "MySQL", "REST API", "RBAC"],
      summary:
        "A scalable backend service with full CRUD functionality for managing users and distributing digital learning resources.",
      approach: [
        { title: "Access control", text: "Implemented role-based access control (RBAC) for administrator, instructor and student roles." },
        { title: "Data", text: "Designed normalised MySQL schemas for fast queries and data integrity." },
      ],
      skills: ["Node.js / Express", "REST APIs", "MySQL", "RBAC", "Database design"],
    },

    {
      id: "sharepoint-business-solutions",
      title: "SharePoint & Power Platform Business Solutions",
      subtitle: "Internal tools built at Exec200 Systems.",
      category: "professional",
      year: "2024–present",
      role: "Software Developer → Junior SharePoint Developer",
      tags: ["SPFx", "React", "PDFMake", "Power Platform", "Microsoft 365"],
      summary:
        "SharePoint Framework web parts, React components, PDF report generation and Power Platform workflow automation for business clients.",
      approach: [
        { title: "Web parts", text: "Developed SharePoint Framework (SPFx) web parts with reusable React components." },
        { title: "Reporting", text: "Generated downloadable PDF reports with PDFMake." },
        { title: "Automation", text: "Automated approvals and notifications with Microsoft Power Platform." },
      ],
      skills: ["SPFx", "React", "JavaScript", "PDFMake", "Power Automate", "Power Apps"],
    },
  ],

  experience: [
    {
      id: "exec200-junior-sharepoint-developer",
      role: "Junior SharePoint Developer",
      org: "Exec200 Systems Limited",
      start: "Apr 2026",
      end: "Present",
      type: "work", // work | volunteer | lab
      summary: "Building Microsoft SharePoint solutions for business clients.",
      responsibilities: [
        "Develop SharePoint Framework (SPFx) web parts and Microsoft 365 integrations.",
        "Build workflow automation with Microsoft Power Platform.",
      ],
      skills: ["SharePoint", "SPFx", "React", "Power Platform"],
      relatedProjects: ["sharepoint-business-solutions"],
    },
    {
      id: "exec200-software-developer-intern",
      role: "Software Developer (Intern)",
      org: "Exec200 Systems Limited",
      start: "Jul 2024",
      end: "Apr 2026",
      type: "work",
      summary: "Full internship in software development, leading to a full-time role.",
      responsibilities: [
        "Built UI features with HTML, CSS and JavaScript.",
        "Created reusable components in React.",
        "Developed SharePoint Framework (SPFx) web parts.",
        "Generated PDF reports with PDFMake.",
        "Automated workflows with Microsoft Power Platform.",
      ],
      achievements: [
        "Promoted to Junior SharePoint Developer (April 2026).",
        "Earned Microsoft Certified: Power Platform Fundamentals (PL-900).",
      ],
      skills: ["JavaScript", "React", "SPFx", "PDFMake", "Power Platform"],
      relatedProjects: ["sharepoint-business-solutions"],
    },
    {
      id: "swep-laboratory-assistant",
      role: "Laboratory Assistant",
      org: "Students Work Experience Program (SWEP), Lagos State University",
      start: "Dec 2023",
      end: "Feb 2024",
      type: "lab",
      summary: "Worked in the Electronic and Computer Engineering Laboratory.",
      responsibilities: [
        "Helped students set up and carry out laboratory experiments.",
        "Guided students in the safe and correct use of lab equipment.",
      ],
      skills: ["Lab instrumentation", "Mentoring", "Lab safety"],
      relatedProjects: ["transistor-level-logic-gates"],
    },
    {
      id: "mssn-graphic-designer",
      role: "Graphic Designer (Volunteer)",
      org: "MSSN, Lagos State University, Epe Campus",
      start: "2023",
      end: "2024",
      type: "volunteer",
      summary: "Created visual designs for events and publications.",
      skills: ["Graphic design", "Visual communication"],
    },
    {
      id: "adlan-machine-operator",
      role: "Machine Operator",
      org: "Adlan Engineering Company, Ejigbo, Lagos",
      start: "Aug 2017",
      end: "Dec 2017",
      type: "work",
      summary: "Early hands-on industrial experience operating engineering machinery.",
      skills: ["Machine operation", "Workshop safety", "Fabrication"],
    },
  ],
};
