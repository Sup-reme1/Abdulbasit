# How to add projects, experience and images

All projects and experience entries live in one file: **`js/data.js`**.
You never need to create a new HTML page. Add an entry to that file and the site:

- adds a card to the homepage (Projects or Experience section)
- creates a page for it at its own URL
- links it into the Previous / Next navigation

| You add…                    | Its URL becomes                         |
| --------------------------- | --------------------------------------- |
| a project with `id: "my-robot"` | `project.html?id=my-robot`          |
| an experience with `id: "acme-intern"` | `experience.html?id=acme-intern` |

Use these URLs in your CV, statement of purpose, or emails to supervisors to link straight to one project.

---

## 1. Add a project

### Step 1: Create a folder for its images

```
assets/projects/<project-id>/
```

Example: `assets/projects/bluetooth-robotic-car/`

### Step 2: Put your images in that folder

Image rules:

- **Name files in lowercase with hyphens, no spaces**: `circuit-diagram.png`, not `Circuit Diagram (1).PNG`.
  Spaces and capital letters often break links once the site is online.
- **Prefix by type** so the folder stays tidy: `cad-…`, `build-…`, `test-…`, `diagram-…`.
- **Keep each image under ~500 KB.** Phone photos are often 3–5 MB. Shrink them first
  (Windows Photos → "Resize image", or https://squoosh.app) to about 1600 px on the long side.
- **Use JPG for photos, PNG for diagrams/screenshots/CAD renders.**
- **Cover image:** pick your clearest image. A CAD render or a clean photo of the finished build works best.
  It is shown at a 16:10 ratio on the card, so avoid very tall images.

### Step 3: Put any documents in `documents/`

Reports, manuals and posters go in `documents/`, ideally as **PDF** (not .docx, which browsers can't open).
In Word: *File → Save As → PDF*.

Example: `documents/robotic-car-report.pdf`

### Step 4: Add the entry to `js/data.js`

Open `js/data.js`, find the `projects: [` list, and paste this template **inside the square brackets**
(after another project's closing `},`). Fill in what you have and delete lines you don't need.
Any field you leave out is simply not shown.

```js
    {
      id: "bluetooth-robotic-car",            // REQUIRED. Lowercase-with-hyphens. Becomes the URL. Never change it once shared.
      title: "Bluetooth-Controlled Robotic Car", // REQUIRED
      subtitle: "One-line description shown under the title.",
      category: "personal",                   // academic | professional | award | personal
      featured: false,                        // true = highlighted card border
      year: "2024",
      role: "Designer and builder",
      context: "Optional note, e.g. course name, supervisor, competition.",
      tags: ["Robotics", "Arduino", "C++"],   // first 4 show on the card

      cover: {
        src: "assets/projects/bluetooth-robotic-car/build-final.jpg",
        alt: "The finished robotic car",      // describe the image (for accessibility)
      },

      summary: "Two or three sentences. Shown on the card AND as the Overview.",

      highlights: [                           // big numbers at the top of the page
        { value: "50 m", label: "Bluetooth control range" },
        { value: "4", label: "Independently driven wheels" },
      ],

      problem: [                              // one string per paragraph
        "What problem were you solving, and why does it matter?",
      ],
      objectives: ["Objective 1", "Objective 2"],

      approach: [                             // shown as cards
        { title: "Hardware", text: "What you designed and why." },
        { title: "Firmware", text: "How the software works." },
      ],

      code: {                                 // optional short code excerpt
        language: "cpp",
        caption: "Main control loop",
        content: `void loop() {
  // paste code here, between the backticks
}`,
      },

      results: ["Measurable result 1", "Result 2"],
      challenges: ["Problem you hit and how you solved it"],
      learnings: ["What you learned"],
      futureWork: ["What you would research or improve next"],

      gallery: [                              // group = sub-heading on the page
        { group: "Design", src: "assets/projects/bluetooth-robotic-car/cad-chassis.png", caption: "Chassis CAD model" },
        { group: "Build",  src: "assets/projects/bluetooth-robotic-car/build-wiring.jpg", caption: "Motor driver wiring" },
      ],

      documents: [
        { label: "Project Report (PDF)", href: "documents/robotic-car-report.pdf" },
      ],
      links: [
        { label: "Source code (GitHub)", href: "https://github.com/your-username/robotic-car" },
        { label: "Demo video", href: "https://youtube.com/..." },
      ],

      skills: ["Motor drivers", "Serial communication"],
    },
```

### Step 5: Check it

1. Save the file.
2. Open `index.html` in your browser (double-click it) and refresh. The new card should appear under **Projects**.
3. Click it and check every image loads. A broken image means the path in `src` doesn't match the file name exactly.

---

## 2. Add an experience

Paste this inside the `experience: [` list in `js/data.js`. The list order is the order on the page,
so put the newest roles first.

```js
    {
      id: "acme-embedded-intern",             // REQUIRED, becomes experience.html?id=acme-embedded-intern
      role: "Embedded Systems Intern",        // REQUIRED
      org: "Acme Robotics Ltd, Lagos",        // REQUIRED
      start: "Jan 2027",
      end: "Present",
      type: "work",                           // work | volunteer | lab
      summary: "One sentence shown on the card.",
      context: "Optional paragraph about the team or company.",
      responsibilities: ["What you did day to day"],
      achievements: ["Concrete outcomes: numbers, promotions, things shipped"],
      skills: ["C", "STM32", "RTOS"],
      relatedProjects: ["bluetooth-robotic-car"], // project ids, shown as cards at the bottom
    },
```

---

## 3. Add images to an existing project

1. Copy the image into that project's folder, e.g. `assets/projects/shoe-polisher/test-result.jpg`.
2. In `js/data.js`, find the project and add a line to its `gallery` list:

```js
        { group: "Testing", src: "assets/projects/shoe-polisher/test-result.jpg", caption: "Shoe after one polishing cycle" },
```

Use an existing `group` name to join that group, or a new name to start a new sub-heading.
To change the main image, edit the project's `cover.src`.

---

## 4. Add videos to a project

Add a `videos` list to the project in `js/data.js`. Two kinds are supported:

```js
      videos: [
        // A) Small video stored in the site (keep under ~10 MB)
        { src: "assets/projects/gas-detector-alarm/demo.mp4", caption: "Demonstration" },

        // B) Large video on Google Drive or YouTube, played in an embedded player
        { embed: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing", caption: "Alarm test" },
        { embed: "https://youtu.be/VIDEO_ID", caption: "Robot driving demo" },
      ],
```

**Use Google Drive or YouTube for anything bigger than ~10 MB.** Phone videos are often 50–100 MB:
they make the site slow, and GitHub rejects files over 100 MB.

To get a Google Drive link:

1. Upload the video to Google Drive.
2. Right-click it → **Share** → under *General access* choose **Anyone with the link** (Viewer).
3. Click **Copy link** and paste it as the `embed` value. The site converts it into a player automatically.

Drive may take a few minutes after uploading before the video can play.

---

## 5. Show your design portfolio from Google Drive

In `js/data.js`, at the bottom, find `design:` and paste your Drive **folder** link into `driveUrl`:

```js
  design: {
    driveUrl: "https://drive.google.com/drive/folders/FOLDER_ID?usp=sharing",
    description: "Graphic design work for events and publications…",
    items: [],
  },
```

- The folder must be shared as **Anyone with the link → Viewer**.
- With `items` empty, the homepage shows a browsable preview of the folder plus a "View on Google Drive" button.
- To show your best pieces as large images instead, export them as JPG into `assets/design/` and list them:
  `items: [{ src: "assets/design/event-flyer.jpg", caption: "Event flyer" }]`. Each one links to the Drive folder.
- The "Design work" section stays hidden while `driveUrl` is empty.

---

## 6. Common mistakes

| Symptom | Cause |
| --- | --- |
| Whole Projects section is empty | A syntax error in `data.js`: usually a missing comma between `}` and `{`, or a missing quote. Press F12 in the browser → *Console* to see the line number. |
| One image is broken | File name in `src` doesn't match exactly (case, spaces, `.jpg` vs `.jpeg`). |
| Page says "Not found" | The `?id=` in the URL doesn't match any `id` in `data.js`. |
| Apostrophe breaks the file | Text is wrapped in `"double quotes"`, so `'` is fine inside. If you need a `"` inside the text, write `\"`. |
| Code excerpt breaks the file | Code goes between backticks (`` ` ``). Don't use a backtick inside the code itself. |

---

## 7. Folder reference

```
index.html                 homepage (static sections: about, education, skills, etc.)
project.html               template for every project page
experience.html            template for every experience page
js/data.js                 ← all projects and experience (edit this)
js/common.js               theme toggle, menu, shared card
js/home.js                 renders homepage cards and filters
js/detail.js               renders project/experience pages
css/style.css              styles
assets/profile.jpg
assets/projects/<id>/      images for each project
documents/                 PDFs: CV, reports, manuals
```

Text that isn't a project or experience (About, Research interests, Skills, Transferable skills,
Documents, Awards, Leadership, Contact) is written directly in `index.html`. Edit it there.

To replace your CV, overwrite `documents/abdulbasit-ajibowu-cv.pdf` with the new file under the same name.
