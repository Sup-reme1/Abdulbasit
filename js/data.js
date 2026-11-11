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
      // role: "Lead designer and developer (sole author)",
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
      title: "Kaaadi: Smart E-Paper Electronic ID Card",
      subtitle: "Embedded systems and smart security: an NFC-enabled ID badge with an e-paper display, designed down to the PCB.",
      category: "academic",
      featured: true,
      year: "",
      role: "Co-designer: hardware enclosure",
      tags: ["Embedded Systems", "PCB Design", "NFC", "E-Paper", "Low-power design", "KiCad"],
      cover: {
        src: "assets/projects/kaaadi/render-card-and-pcb.jpg",
        alt: "3D render of the Kaaadi e-paper ID card, its enclosure and the populated PCB",
      },
      summary:
        "A prototype electronic ID card that shows the holder's identity and daily timetable on an ultra-low-power e-paper display. It uses NFC and secure on-board storage for identity verification, all on a custom PCB.",
      highlights: [
        { value: "6", label: "Hardware subsystems on one board" },
        { value: "NFC", label: "Coil antenna for identity verification" },
        { value: "E-paper", label: "Holds its image with zero power" },
      ],
      problem: [
        "Printed ID cards are static: they can't be updated, are easy to forge, and carry no verification data. The aim was a card that can be verified electronically, update what it shows, and still run for long periods on a small battery.",
      ],
      approach: [
        {
          title: "System architecture",
          text: "Split the design into hierarchical KiCad sheets: MCU, power, display, external storage, IMU, real-time clock and piezo speaker. An I²C bus with shared pull-ups links the IMU, RTC, fuel gauge and piezo driver, and an SPI link drives the e-paper display.",
        },
        {
          title: "Low-power hardware",
          text: "Chose an e-paper display (draws power only when the image changes), a battery fuel gauge for charge monitoring, an RTC for timekeeping, and an IMU that can wake the MCU on motion. This lets the card spend most of its time asleep for portable, handheld use.",
        },
        {
          title: "PCB layout",
          text: "Laid out a compact board with an on-board NFC coil antenna, a 2.4 GHz PCB trace antenna, QSPI external flash, USB and battery connectors, then rendered it in 3D with the enclosure to check fit before fabrication.",
        },
        {
          title: "Firmware",
          text: "Programmed firmware to handle encrypted data exchange between the card and authentication readers for secure access control, and to refresh the display with identity and schedule data.",
        },
      ],
      gallery: [
        { group: "Design", src: "assets/projects/kaaadi/architecture-diagram.png", caption: "Hierarchical system architecture (KiCad): MCU, power, IMU, RTC, piezo, external storage and display" },
        { group: "Design", src: "assets/projects/kaaadi/pcb-layout.jpg", caption: "PCB layout, both sides: NFC coil, 2.4 GHz antenna, MCU and flash" },
        { group: "Design", src: "assets/projects/kaaadi/render-card-and-pcb.jpg", caption: "3D render: the card showing ID and timetable, enclosure and PCB (coins for scale)" },
        { group: "Design", src: "assets/projects/kaaadi/render-card-views.jpg", caption: "Card and enclosure views" },
      ],
      skills: ["Hardware architecture", "KiCad schematic & PCB", "I²C / SPI / QSPI", "NFC", "Low-power design", "Firmware", "3D rendering"],
    },

    {
      id: "smart-home-iot-monitoring",
      title: "Smart Home IoT Monitoring System",
      subtitle: "Arduino + Bluetooth Connection.",
      category: "academic",
      year: "",
      role: "Developer",
      context: "Laboratory project, Electronic and Computer Engineering Laboratory, Lagos State University.",
      tags: ["Lab Work", "IoT", "Arduino", "Bluetooth Module", "UART", "Sensors"],
      summary:
        "Engineered an automated home monitoring and control framework using an Arduino microcontroller paired with an HC-05 Bluetooth module for real-time mobile interaction.",
      // approach: [
      //   { title: "Communication", text: "Set up low-level serial communication (UART / AT commands) for real-time cellular data and event notifications." },
      //   { title: "Sensing", text: "Connected several environmental sensors, with threshold-detection logic that sends remote notifications when a safety limit is breached." },
      // ],
      skills: ["Arduino", "UART", "Sensor thresholds"],
    },

    {
      id: "bluetooth-robotic-car",
      title: "Bluetooth-Controlled 4-Wheel Robotic Car",
      subtitle: "Mobile robot with differential steering over HC-05 Bluetooth.",
      category: "academic",
      year: "2023",
      // role: "Designer and builder",
      context: "Laboratory project, Electronic and Computer Engineering Laboratory, Lagos State University.",
      tags: ["Lab Work", "Robotics", "Arduino", "Bluetooth", "Motor Control"],
      cover: {
        src: "assets/projects/bluetooth-robotic-car/finished-car.jpg",
        alt: "The finished four-wheel robotic car with Arduino and breadboard",
      },
      summary:
        "A four-wheel mobile robot built on an Arduino controller, dual H-bridge motor drivers and an HC-05 Bluetooth serial interface.",
      highlights: [
        { value: "4", label: "Independently driven DC gear motors" },
        { value: "HC-05", label: "Bluetooth serial control" },
      ],
      approach: [
        { title: "Mechanical assembly", text: "Assembled the two-deck chassis, then soldered and mounted four DC gear motors with their wheels." },
        { title: "Firmware", text: "Wrote custom firmware that parses incoming serial data and applies real-time differential steering and speed control." },
        { title: "Power design", text: "Designed the power distribution to keep motor noise away from the logic circuitry, which stopped the controller from resetting." },
      ],
      gallery: [
        { group: "Build", src: "assets/projects/bluetooth-robotic-car/build-soldering.jpg", caption: "Soldering motor leads in the lab" },
        { group: "Build", src: "assets/projects/bluetooth-robotic-car/assembly-guide.jpg", caption: "Chassis assembly guide" },
        { group: "Build", src: "assets/projects/bluetooth-robotic-car/chassis-parts.jpg", caption: "Chassis plates, motors and wheels before assembly" },
        { group: "Build", src: "assets/projects/bluetooth-robotic-car/motors-mounted.jpg", caption: "All four gear motors mounted and wired" },
        { group: "Finished robot", src: "assets/projects/bluetooth-robotic-car/finished-car.jpg", caption: "Completed car during firmware upload" },
        { group: "Finished robot", src: "assets/projects/bluetooth-robotic-car/finished-car-electronics.jpg", caption: "Top deck: Arduino, breadboard and battery pack" },
      ],
      skills: ["Motor drivers (H-bridge)", "Serial parsing", "Power isolation", "Soldering", "Robotics"],
    },

    {
      id: "sound-detector-alarm",
      title: "Sound Detector Safety Alarm System",
      subtitle: "Battery-powered, interrupt-driven acoustic intrusion alarm, built to a client brief.",
      category: "academic",
      year: "2023–2024",
      // role: "Designer and developer",
      context:
        "Built to monitor quiet offices after closing hours. Started from a written proposal with a costed bill of materials (Nov 2023) and delivered in Jan 2024.",
      tags: ["Embedded Systems", "Arduino", "Interrupts", "Signal Conditioning", "Battery Management"],
      cover: {
        src: "assets/projects/sound-detector-alarm/finished-running.jpg",
        alt: "The finished sound detector alarm with its LCD showing the start-up screen",
      },
      summary:
        "A real-time, event-triggered safety system using high-sensitivity acoustic sensors, a microcontroller, and visual and audible outputs.",
      problem: [
        "An office needed to know about any sound after hours, such as a possible intruder, without a full security system. The device had to show a notification on screen, sound a loud alarm for security staff, and run from its own rechargeable battery.",
      ],
      approach: [
        { title: "Signal acquisition", text: "Read the acoustic sensor through the microcontroller's ADC, sampling fast enough to capture short sound events (following the Nyquist criterion), then quantising them into digital levels." },
        { title: "Noise rejection", text: "Calibrated the hardware threshold and added software debouncing to cut false triggers from background noise." },
        { title: "Latency", text: "Used interrupt-driven routines so the alarm responds within a millisecond of the threshold being crossed." },
        // { title: "Battery management", text: "A 7.4 V 18650 Li-ion pack with a charging module and buck converter. The LCD shows battery percentage measured through a voltage divider, and a transistor switch allows checking battery level while charging to avoid overcharging." },
      ],
      results: [
        "Delivered a self-contained unit: an I²C LCD for notifications and battery status, a 3–24 V piezo siren for alarms, all in a sealed ABS enclosure.",
      ],
      gallery: [
        { group: "Components & prototyping", src: "assets/projects/sound-detector-alarm/components.jpg", caption: "Arduino Uno, LCD, sound sensor, charging module, switch and buzzer" },
        { group: "Components & prototyping", src: "assets/projects/sound-detector-alarm/lcd-test.jpg", caption: "Bench-testing the I²C LCD" },
        { group: "Components & prototyping", src: "assets/projects/sound-detector-alarm/firmware-code.jpg", caption: "LCD test firmware in the Arduino IDE" },
        { group: "Components & prototyping", src: "assets/projects/sound-detector-alarm/battery-pack.jpg", caption: "7.4 V 2600 mAh 18650 battery pack" },
        { group: "Components & prototyping", src: "assets/projects/sound-detector-alarm/buzzer.jpg", caption: "3–24 V piezo siren" },
        { group: "Assembly", src: "assets/projects/sound-detector-alarm/enclosure.jpg", caption: "ABS enclosure before machining" },
        { group: "Assembly", src: "assets/projects/sound-detector-alarm/internal-wiring.jpg", caption: "Internal wiring" },
        { group: "Assembly", src: "assets/projects/sound-detector-alarm/assembly.jpg", caption: "Fitting the electronics into the enclosure" },
        { group: "Finished device", src: "assets/projects/sound-detector-alarm/finished-front.jpg", caption: "Front panel with LCD window" },
        { group: "Finished device", src: "assets/projects/sound-detector-alarm/finished-running.jpg", caption: "Powered on and initialising" },
      ],
      videos: [
        // Large clips: upload to Google Drive (Anyone with the link → Viewer) and paste the share link here, e.g.
        { embed: "https://drive.google.com/file/d/1dZMAfiAPURneS_nVMg4N0lj4gtsKwUBo/view?usp=sharing", caption: "Alarm Init" },
        { embed: "https://drive.google.com/file/d/1UIlTlKP1pN3fIKsn4Pgn0hAnhXcyqH3J/view?usp=sharing", caption: "Alarm triggering on a sound event" },
      ],
      skills: ["ADC sampling", "Interrupts", "Debouncing", "Sensor calibration", "Li-ion charging", "Voltage dividers", "Client proposals"],
    },

    {
      id: "gas-detector-alarm",
      title: "Gas Detector Alarm",
      subtitle: "Portable sensor-based gas detector that shows concentration on an LCD and sounds an alarm.",
      category: "academic",
      year: "2023",
      // role: "Enclosure Design",
      tags: ["Embedded Systems", "Arduino", "Gas Sensing", "Safety", "Battery-powered"],
      cover: {
        src: "assets/projects/gas-detector-alarm/lcd-reading.jpg",
        alt: "Gas detector LCD showing a concentration reading",
      },
      summary:
        "A handheld, battery-powered detector that reads an MQ-series gas sensor, shows the measured concentration on an LCD, and sounds a loud alarm when the level passes a safe threshold.",
      problem: [
        "Gas leaks and harmful vapours are often invisible and odourless at dangerous levels. A cheap, portable detector that alerts people immediately can prevent accidents at home and in workshops.",
      ],
      approach: [
        { title: "Sensing", text: "An MQ-series gas sensor mounted on the lid; its analogue output is read by the microcontroller's ADC and converted to a concentration value (the photos show the BAC % mode used for alcohol vapour)." },
        { title: "Alarm logic", text: "Firmware compares each reading with a set threshold and drives a piezo siren when it is exceeded, while the LCD shows the live reading." },
        { title: "Power", text: "A rechargeable Li-ion cell with a charging module and DC-DC converter, so the unit is fully portable." },
        { title: "Enclosure", text: "All electronics fitted into a compact enclosure, with the sensor and LCD on the lid and the siren on the side." },
      ],
      gallery: [
        { group: "Build", src: "assets/projects/gas-detector-alarm/internal-wiring.jpg", caption: "Internal wiring before closing the enclosure" },
        { group: "Build", src: "assets/projects/gas-detector-alarm/controller-and-battery.jpg", caption: "Microcontroller board and Li-ion battery" },
        { group: "Build", src: "assets/projects/gas-detector-alarm/power-modules.jpg", caption: "Charging and DC-DC converter modules" },
        { group: "Build", src: "assets/projects/gas-detector-alarm/lid-sensor-lcd.jpg", caption: "Lid with LCD and gas sensor" },
        { group: "Build", src: "assets/projects/gas-detector-alarm/buzzer.jpg", caption: "Piezo siren" },
        { group: "Finished device", src: "assets/projects/gas-detector-alarm/finished-device.jpg", caption: "Finished detector, powered on" },
        { group: "Finished device", src: "assets/projects/gas-detector-alarm/lcd-reading.jpg", caption: "Live concentration reading" },
      ],
      videos: [
        { src: "assets/projects/gas-detector-alarm/demo.mp4", caption: "Demonstration" },
        // Larger clip: upload "VID_20231218_083214.mp4" to Google Drive and paste the share link:
        // { embed: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing", caption: "Alarm test" },
      ],
      skills: ["Analogue sensing / ADC", "Threshold alarms", "Li-ion charging", "Enclosure fabrication"],
    },

    {
      id: "iot-battery-charger",
      title: "IoT Battery Charger",
      subtitle: "AC-to-DC charging prototype with a user-selectable output voltage to match the battery being charged.",
      category: "academic",
      year: "2023",
      // role: "Designer and builder",
      tags: ["Power Electronics", "IoT", "Embedded Systems", "Battery Charging"],
      cover: {
        src: "assets/projects/iot-battery-charger/front-panel.jpg",
        alt: "Front panel of the battery charger with LCD, keypad and output terminals",
      },
      summary:
        "A charging unit that converts AC mains to DC and lets the user set the output to the battery's voltage. A microcontroller, LCD and keypad provide control and status, and relays handle switching.",
      problem: [
        "Batteries come in different voltages, and most simple chargers are fixed to one. Charging at the wrong voltage shortens battery life or is dangerous. The aim was one charger that adapts to the battery connected to it.",
      ],
      approach: [
        { title: "Power conversion", text: "Converts AC mains to DC, then regulates it with DC-DC converter modules to the voltage required by the battery." },
        { title: "User interface", text: "An LCD and a four-key keypad on the front panel let the user select and confirm the target battery voltage and see charging status." },
        { title: "Control & switching", text: "A microcontroller reads the user's selection and drives a relay module to switch the charging path safely." },
        { title: "Enclosure", text: "Measured, marked and drilled an IP-rated enclosure, then mounted all modules inside with front-panel terminals, a power switch and a mains socket." },
      ],
      gallery: [
        { group: "Planning & build", src: "assets/projects/iot-battery-charger/components-layout.jpg", caption: "Planning the panel layout: LCD, keypad, relay module and converters" },
        { group: "Planning & build", src: "assets/projects/iot-battery-charger/enclosure-marking.jpg", caption: "Marking cut-outs on the enclosure" },
        { group: "Planning & build", src: "assets/projects/iot-battery-charger/enclosure-drilled.jpg", caption: "Enclosure drilled and prepared" },
        { group: "Planning & build", src: "assets/projects/iot-battery-charger/modules-mounted.jpg", caption: "Relay, converter and control modules mounted" },
        { group: "Planning & build", src: "assets/projects/iot-battery-charger/final-wiring.jpg", caption: "Final internal wiring" },
        { group: "Finished unit", src: "assets/projects/iot-battery-charger/front-panel.jpg", caption: "Front panel: LCD, keypad and output terminals" },
        { group: "Finished unit", src: "assets/projects/iot-battery-charger/side-switch-socket.jpg", caption: "Mains socket and power switch" },
        { group: "Finished unit", src: "assets/projects/iot-battery-charger/output-terminals.jpg", caption: "Output terminals connected" },
      ],
      skills: ["AC-DC conversion", "DC-DC regulation", "Relay control", "Keypad & LCD interfaces", "Enclosure fabrication"],
    },

    {
      id: "transistor-level-logic-gates",
      title: "Transistor-Level Logic Gate Modelling",
      subtitle: "Digital logic built from discrete BJTs and MOSFETs.",
      category: "academic",
      year: "",
      role: "Experimenter",
      context: "Laboratory project, Electronic and Computer Engineering Laboratory, Lagos State University.",
      tags: ["Lab Work", "Digital Electronics", "Semiconductors"],
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
      subtitle: "PLP Academy graduation project supporting UN SDG 4: Quality Education.",
      category: "academic",
      year: "2024",
      role: "Backend developer",
      context:
        "Graduation (capstone) project for the 16-week PLP Academy Software Development programme, completed December 2024. Built around UN Sustainable Development Goal 4: ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
      tags: ["Software Engineering", "SDG 4", "Node.js", "MySQL", "REST API", "RBAC"],
      summary:
        "A scalable backend service for a learning management system, with full CRUD functionality for managing users, courses and digital learning resources. It is designed to widen access to quality education by making learning materials easy to publish, organise and reach.",
      problem: [
        "Many learners, especially in under-resourced communities, lack organised access to course materials and structured learning. Instructors also need a simple way to publish and manage content.",
        "In line with SDG 4 (Quality Education), the goal was a secure, scalable backend that lets institutions and independent instructors deliver learning resources to students reliably.",
      ],
      objectives: [
        "Provide a REST API for managing users, courses and learning resources.",
        "Enforce secure, role-appropriate access for administrators, instructors and students.",
        "Design a data model that keeps records consistent and queries fast as usage grows.",
      ],
      approach: [
        { title: "API design", text: "Built a RESTful API with Node.js and Express exposing full CRUD operations for users, courses and learning resources." },
        { title: "Access control", text: "Implemented role-based access control (RBAC) for administrator, instructor and student roles, so each user sees and changes only what their role allows." },
        { title: "Data", text: "Designed normalised MySQL schemas for fast queries and data integrity." },
        { title: "Security", text: "Applied the authentication practices covered in the programme (JWT-based sessions and protected routes) to secure the endpoints." },
      ],
      learnings: [
        "Turning a global development goal (SDG 4) into concrete software requirements.",
        "Designing a backend architecture with clear separation of roles and responsibilities.",
        "Relational data modelling and normalisation for real-world entities such as users, courses and enrolments.",
      ],
      // futureWork: [
      //   "Offline-first or low-bandwidth delivery of learning materials for areas with poor connectivity.",
      //   "Learning analytics to identify students who need extra support.",
      // ],
      documents: [
        { label: "PLP Academy certificate (PDF)", href: "documents/certificates/plp-software-development-2024.pdf" },
      ],
      skills: ["Node.js / Express", "REST APIs", "MySQL", "RBAC", "JWT authentication", "Database design", "Requirements analysis"],
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
      relatedProjects: ["transistor-level-logic-gates", "bluetooth-robotic-car", "smart-home-iot-monitoring"],
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

  /*
   * DESIGN PORTFOLIO (homepage "Design work" section).
   * The section stays hidden until driveUrl is filled in.
   * driveUrl: share link to the Google Drive folder (set sharing to "Anyone with the link → Viewer").
   * items: optional highlight images stored locally, e.g. assets/design/flyer-1.jpg
   */
  design: {
    driveUrl: "https://drive.google.com/drive/folders/1e4075egdIgB5mlb58gJzFNra97Rqs71s?usp=sharing",
    description:
      "Graphic design work for events and publications, created as a volunteer designer for MSSN, LASU Epe Campus.",
    items: [
      // { src: "assets/design/event-flyer.jpg", caption: "Event flyer" },
    ],
  },
};
