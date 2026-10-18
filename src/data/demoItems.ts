export type DemoItem = { id: number; title: string; description: string; group: string };
const demoItems: DemoItem[] = [
  { id: 1, title: "Text input", description: "A single-line alphanumeric field.", group: "Essentials" },
  { id: 2, title: "Password input", description: "Masked entry with visibility toggle.", group: "Essentials" },
  { id: 3, title: "Email address", description: "Email-optimized input with browser validation.", group: "Essentials" },
  { id: 4, title: "Telephone input", description: "Phone number entry with a simulated keypad.", group: "Essentials" },
  { id: 5, title: "URL input", description: "A URL field with native format validation.", group: "Essentials" },
  { id: 6, title: "Number input", description: "Numeric input with native increment controls.", group: "Essentials" },
  { id: 7, title: "Minimum value", description: "Numbers constrained to zero or above.", group: "Essentials" },
  { id: 8, title: "Maximum value", description: "A metric capped at one hundred.", group: "Essentials" },
  { id: 9, title: "Step interval", description: "Accepts values in increments of five.", group: "Essentials" },
  { id: 10, title: "Search input", description: "Search field with a one-tap clear action.", group: "Essentials" },
  { id: 11, title: "Multiline text", description: "A native, freeform text area.", group: "Text areas" },
  { id: 12, title: "Fixed rows", description: "A textarea preset to four visible rows.", group: "Text areas" },
  { id: 13, title: "Locked resize", description: "A text area that keeps its original size.", group: "Text areas" },
  { id: 14, title: "Horizontal resize", description: "Resize the field across its width.", group: "Text areas" },
  { id: 15, title: "Vertical resize", description: "Resize the field vertically.", group: "Text areas" },
  { id: 16, title: "Character counter", description: "Live count with a 500-character limit.", group: "Text areas" },
  { id: 17, title: "Read-only value", description: "Selectable and copyable, but not editable.", group: "States & validation" },
  { id: 18, title: "Disabled field", description: "An inactive field excluded from form submission.", group: "States & validation" },
  { id: 19, title: "Required field", description: "Required browser validation with a clear marker.", group: "States & validation" },
  { id: 20, title: "Focus on demand", description: "Move keyboard focus to the field with a button.", group: "States & validation" },
  { id: 21, title: "Pattern validation", description: "Exactly three uppercase letters are accepted.", group: "States & validation" },
  { id: 22, title: "Floating label", description: "The label lifts when the field is active or filled.", group: "States & validation" },
  { id: 23, title: "Inline error", description: "An invalid state paired with helpful guidance.", group: "States & validation" },
  { id: 24, title: "Card number", description: "Automatically grouped into four-digit blocks.", group: "Structured data" },
  { id: 25, title: "Card expiration", description: "Formats a month and year as MM/YY.", group: "Structured data" },
  { id: 26, title: "Card security code", description: "A short, masked three- or four-digit code.", group: "Structured data" },
  { id: 27, title: "One-time password", description: "Six linked cells with automatic focus advance.", group: "Structured data" },
  { id: 28, title: "Currency amount", description: "An amount with a fixed rupee prefix.", group: "Structured data" },
  { id: 29, title: "Metric value", description: "Numeric input paired with a unit suffix.", group: "Structured data" },
  { id: 30, title: "Inline editing", description: "Click the text to edit it in place.", group: "Rich text & editor" },
  { id: 31, title: "Copy to clipboard", description: "Copy a sample value with instant feedback.", group: "Rich text & editor" },
  { id: 32, title: "Hidden identifier", description: "A hidden input carries a non-visible ID.", group: "Rich text & editor" },
  { id: 33, title: "Validation summary", description: "Check required details and review the errors.", group: "Rich text & editor" },
  { id: 34, title: "Autocomplete", description: "Browser suggestions for common names.", group: "Rich text & editor" },
  { id: 35, title: "Address suggestions", description: "A local address list for autocomplete.", group: "Rich text & editor" },
  { id: 36, title: "Query chips", description: "Turn terms into removable search chips.", group: "Rich text & editor" },
  { id: 37, title: "Bold formatting", description: "Select text and apply bold styling.", group: "Rich text & editor" },
  { id: 38, title: "Italic formatting", description: "Select text and apply italic styling.", group: "Rich text & editor" },
  { id: 39, title: "Add hyperlink", description: "Select text and attach a link.", group: "Rich text & editor" },
  { id: 40, title: "Blockquote", description: "Format the selected line as a quotation.", group: "Rich text & editor" },
  { id: 41, title: "Code block", description: "Switch the editor into a code-friendly block.", group: "Rich text & editor" },
  { id: 42, title: "Ordered list", description: "Format selected lines as a numbered list.", group: "Rich text & editor" },
  { id: 43, title: "Bullet list", description: "Format selected lines as a bullet list.", group: "Rich text & editor" },
  { id: 44, title: "Image attachment", description: "Attach an image and preview it locally.", group: "Rich text & editor" },
  { id: 45, title: "Align left", description: "Apply left alignment in the editor.", group: "Rich text & editor" },
  { id: 46, title: "Align center", description: "Apply centered alignment in the editor.", group: "Rich text & editor" },
  { id: 47, title: "Align right", description: "Apply right alignment in the editor.", group: "Rich text & editor" },
  { id: 48, title: "Justify text", description: "Distribute text evenly across the editor.", group: "Rich text & editor" },
  { id: 49, title: "Code editor", description: "A compact code input with line numbers.", group: "Rich text & editor" },
  { id: 50, title: "National ID mask", description: "Formats a 12-digit identifier in groups.", group: "Special controls" },
  { id: 51, title: "Prefix icon", description: "A leading icon inside the input boundary.", group: "Special controls" },
  { id: 52, title: "Suffix action", description: "An eye control to show or hide a value.", group: "Special controls" },
  { id: 53, title: "Field hint", description: "Small supporting copy under the field.", group: "Special controls" },
  { id: 54, title: "Instant validation", description: "A debounced availability check while typing.", group: "Special controls" },
  { id: 55, title: "Clear all fields", description: "Reset all editable demo values at once.", group: "Special controls" },
  { id: 56, title: "Undo typing", description: "Restore the previous value after editing.", group: "Special controls" },
  { id: 57, title: "Draft saved", description: "Persist a small draft in local storage.", group: "Special controls" },
  { id: 58, title: "Auto-expanding area", description: "Grows as more lines are entered.", group: "Special controls" },
  { id: 59, title: "Password strength", description: "Strength meter responds to password complexity.", group: "Special controls" },
  { id: 60, title: "Caps Lock warning", description: "Detects Caps Lock while entering a password.", group: "Special controls" },
];

const selectionDefinitions = [
  ["Standard checkbox", "A clickable binary choice."],
  ["Checked checkbox", "A checkbox shown in its selected state."],
  ["Unchecked checkbox", "An interactive checkbox awaiting a choice."],
  ["Indeterminate checkbox", "A partial-selection state for parent controls."],
  ["Checkbox group parent", "Select or clear every child option at once."],
  ["Radio group", "Choose exactly one option from a set."],
  ["Active radio choice", "A radio group with a selected default."],
  ["Inactive radio choices", "Unselected choices ready for a decision."],
  ["Checkbox cards", "Select full panels as independent options."],
  ["Radio cards", "Choose one option from full-width cards."],
  ["Segmented control", "Connected tabs with one active choice."],
  ["Active segmented button", "A highlighted button in a compact choice strip."],
  ["Toggle switch", "A styled checkbox for an on/off setting."],
  ["Disabled toggle", "A locked switch that cannot be changed."],
  ["Grid selector", "Pick multiple cells from a compact grid."],
  ["Listbox", "A native select showing several visible options."],
  ["Multi-select listbox", "Select several options with Ctrl or Shift."],
  ["Option groups", "A native select organized with optgroup labels."],
  ["Native option", "Choose a standard option from a select."],
  ["Dropdown prompt", "A non-selectable prompt before a choice."],
  ["Multi-select tags", "Build a selection from removable tags."],
  ["Select all", "Quickly check every item in the list."],
  ["Deselect all", "Quickly clear every selected item."],
  ["Removable tokens", "Remove individual selections with an X."],
  ["Horizontal button group", "Touch-friendly choices arranged in a row."],
  ["Vertical button group", "Stacked choices for narrow layouts."],
  ["Checkbox search", "Filter a list of checkboxes while typing."],
  ["Nested selection tree", "Expand a parent and select child settings."],
  ["Color selector", "Pick a product color from swatches."],
  ["Size selector", "Choose a size from selectable buttons."],
  ["Image selection", "Select a visual option and see its check state."],
  ["Text toggle", "A switch with explicit ON and OFF labels."],
  ["Select dropdown", "A compact native dropdown."],
  ["Hover option list", "Move over options to preview the active row."],
  ["Combobox", "Type or open a list of matching options."],
  ["Datalist suggestions", "A text input with browser suggestions."],
  ["True / false", "A split radio control for boolean choices."],
  ["Seat matrix", "Choose available seats from a small grid."],
  ["List group selector", "Select one row from a stacked list."],
  ["Tap to select", "Choose an action with a touch-friendly tap."],
  ["Nested dropdown", "Open nested options with clear depth indicators."],
  ["Action menu", "Open common file actions from a menu."],
  ["Hover menu", "Reveal a submenu when hovering over its parent."],
  ["Context menu", "Open asset actions from a local menu button."],
  ["Multi-column dropdown", "Choose a structured option from multiple columns."],
  ["Keyboard option list", "Navigate choices with the arrow keys."],
  ["Searchable dropdown", "Filter a dropdown before selecting."],
  ["Map zone selector", "Choose an area from a simple clickable map."],
  ["Split action dropdown", "Run an action or choose an alternate action."],
  ["Floating text toolbar", "Select text to reveal formatting actions."],
  ["Star rating", "Choose a score from one to five stars."],
  ["Favorite heart", "Toggle an item on or off a wishlist."],
  ["Bookmark button", "Save or remove a reference point."],
  ["Thumbs-up vote", "Record approval for an item."],
  ["Thumbs-down vote", "Record disapproval for an item."],
  ["Selection tile", "Toggle a pill-shaped choice."],
  ["Language picker", "Choose a language from localized options."],
  ["Country code", "Select a dialing prefix with country labels."],
  ["Selected list rows", "Toggle highlighted multi-select list items."],
  ["Focus ring", "Explore visible keyboard focus indicators."],
].map(([title, description], index) => ({
  id: index + 61,
  title,
  description,
  group: "Selection & choices",
}));
const sliderDefinitions = [
  ["Range slider", "Adjust a basic range value with a neutral track."],
  ["Slider thumb", "Move the thumb and follow its value marker along the track."],
  ["Filled track", "Adjust a value and inspect the filled portion of its track."],
  ["Remaining track", "Adjust a value and inspect how much track remains."],
  ["Dual-thumb price range", "Set minimum and maximum values for a budget."],
  ["Stepped parameter", "Snap the range to fixed increments."],
  ["Slider tick marks", "Adjust a range with visible step marks."],
  ["Value tooltip", "See the current slider value while adjusting."],
  ["Minimum scale label", "Explore a slider with a labeled lower bound."],
  ["Maximum scale label", "Explore a slider with a labeled upper bound."],
  ["Vertical range slider", "Adjust a vertical range control."],
  ["Volume knob", "Turn a rotary-style control to set a level."],
  ["Audio volume", "Set an audio volume level."],
  ["Video timeline", "Scrub through a sample video timeline."],
  ["Buffered timeline", "Compare playback position to buffered media."],
  ["Timeline preview", "Move over the timeline to preview a position."],
  ["Playback speed", "Choose a playback speed preset."],
  ["Subtitles toggle", "Turn captions on or off."],
  ["Picture-in-picture", "Toggle a simulated floating video view."],
  ["Fullscreen video", "Toggle a simulated fullscreen player."],
  ["Date picker", "Choose a date using the native date input."],
  ["Time picker", "Choose a time using the native time input."],
  ["Date and time", "Choose a local date and time together."],
  ["Month picker", "Choose a month and year."],
  ["Week picker", "Choose a week of the year."],
  ["Calendar day", "Select a day from a compact calendar."],
  ["Weekday headers", "View a calendar with weekday labels."],
  ["Month navigation", "Move the calendar between months."],
  ["Year picker", "Jump to a year in the calendar."],
  ["Date range", "Set a start and end date."],
  ["Selected day", "Choose a day and see its selected state."],
  ["Date range highlight", "Select a date interval and preview its range."],
  ["Unavailable dates", "Explore dates that cannot be selected."],
  ["Today indicator", "See and select the current date."],
  ["Time slots", "Choose an appointment time."],
  ["AM / PM toggle", "Choose morning or afternoon."],
  ["Time zone", "Choose a time zone for an event."],
  ["Color input", "Open the browser's native color picker."],
  ["Color spectrum", "Pick a color from a two-dimensional palette."],
  ["Hue slider", "Adjust hue while preserving saturation and lightness."],
  ["Opacity slider", "Adjust the opacity of a sample color."],
  ["HEX color value", "Edit a color using its hexadecimal value."],
  ["RGB color values", "Adjust red, green, and blue channels."],
  ["Saved color swatches", "Choose from reusable color presets."],
  ["Eyedropper canvas", "Sample a color from the local demo canvas."],
  ["Zoom level", "Scale a preview using a range control."],
  ["Chart range", "Adjust the visible period on a sample chart."],
  ["2D coordinate picker", "Position a point and inspect its coordinates."],
  ["Audio pitch", "Adjust the pitch of a sample tone."],
  ["Fractional star rating", "Set and preview a fractional rating."],
  ["Birthday selector", "Choose a birthday with date controls."],
  ["Balance dial", "Adjust a measurement using a rotary-style dial."],
  ["Multi-handle partition", "Divide a percentage across three segments."],
  ["Sound equalizer", "Tune multiple audio frequency bands."],
  ["Timer ticker", "Set hours, minutes, and seconds."],
  ["Countdown timer", "Start, pause, and reset a sample countdown."],
  ["Distance radius", "Set a geographic coverage radius."],
  ["Font size", "Scale sample text with a slider."],
  ["Image contrast", "Tune contrast on a sample preview."],
  ["Image saturation", "Tune saturation on a sample preview."],
].map(([title, description], index) => ({ id: index + 121, title, description, group: "Value sliders & ranges" }));
const actionDefinitions = [
  ["Standard button", "A simple button with a visible action result."],
  ["Submit button", "Validate and submit a small sample form."],
  ["Reset button", "Restore the sample form to its defaults."],
  ["Text link", "Follow an in-page demo link."],
  ["External link", "Open PhishNix – Email Risk Analyzer in a new tab."],
  ["Anchor scroll", "Jump to a target within this section."],
  ["Telephone link", "Preview a click-to-call link."],
  ["Email link", "Preview a mail link."],
  ["Download link", "Download a small sample text file."],
  ["Primary action", "A high-emphasis call-to-action."],
  ["Secondary action", "A lower-emphasis alternative action."],
  ["Tertiary action", "A borderless text action."],
  ["Icon action", "An accessible icon-only action button."],
  ["Button with icon", "Combine a label and icon in one action."],
  ["Hamburger menu", "Open and close a compact navigation menu."],
  ["Vertical overflow menu", "Open a vertical context action menu."],
  ["Horizontal overflow menu", "Open a horizontal overflow menu."],
  ["App launcher", "Open a small app grid."],
  ["Close dialog", "Open and dismiss a sample dialog."],
  ["Accordion expander", "Expand and collapse additional details."],
  ["Collapse control", "Show or hide a detail panel."],
  ["Chevron menu", "Expand a menu with a directional indicator."],
  ["Next item", "Advance through a small carousel."],
  ["Previous item", "Move back through a small carousel."],
  ["Scroll to top", "Jump to the top of the page."],
  ["Floating shortcut", "Open a floating quick-action panel."],
  ["Download action", "Download a generated sample file."],
  ["Print action", "Open the browser print dialog."],
  ["Share link", "Copy the current page link and view it in a paste-ready field."],
  ["Native share", "Use the device share sheet when available."],
  ["Add to cart", "Add a sample item and update the cart count."],
  ["Buy now", "Confirm a sample direct checkout action."],
  ["Apply coupon", "Apply a demo coupon and update the sample total."],
  ["Help chat", "Open a local support chat panel."],
  ["Voice input", "Use speech recognition when the browser supports it."],
  ["QR code popup", "Open a popup with a sample QR pattern and the current page URL."],
  ["Export CSV", "Download the sample rows as a CSV file."],
  ["Print to PDF", "Open a print-friendly document view."],
  ["Theme preference", "Toggle a light or dark theme preview without changing the app theme."],
  ["High contrast", "Toggle a high-contrast preview."],
  ["Text size controls", "Increase or decrease sample text size."],
  ["Read aloud", "Read the sample text using speech synthesis."],
  ["Interactive poll", "Vote and see live sample poll percentages."],
  ["Delete confirmation", "Review a confirmation before deleting a sample item."],
  ["Submenu trigger", "Open a nested navigation submenu."],
  ["Tabs", "Switch between tab panels."],
  ["Accordion", "Expand and collapse content panels."],
  ["Filter panel", "Show and hide sample filters."],
  ["Sortable table", "Sort sample rows by a column."],
  ["Map pin", "Select a map pin to view its details."],
  ["Load more", "Append another sample row to a list."],
  ["Pagination", "Navigate between sample result pages."],
  ["Last page", "Jump to the final page of sample results."],
  ["First page", "Return to the first page of sample results."],
  ["Tag filter", "Apply and clear a sample filter tag."],
  ["Follow channel", "Toggle a channel follow state."],
  ["Notification settings", "Choose notification preferences."],
  ["Subscribe action", "Confirm a sample subscription choice."],
  ["Batch selection", "Select rows to reveal batch actions."],
  ["Cart quantity", "Increase or decrease a sample cart quantity."],
].map(([title, description], index) => ({ id: index + 181, title, description, group: "Clickable controls & actions" }));
const extendedSections = [
  {
    firstId: 241,
    group: "File, media & graphics",
    titles: `
<input type="file">
Multiple file uploader box
Specific format file selector
Drag-and-drop file zone
Image crop overlay square
Image rotation utility tool
File upload progress bar
Upload success green node
Upload error retry clicker
Uploaded asset line entry
Document format asset badge
Uploaded image thumbnail box
Detach attached file button
Audio record mic button
Camera capture stream anchor
SVG canvas framework (<svg>)
Interactive path node (<path>)
Animation graphic loop anchor
Dynamic Canvas workspace (<canvas>)
WebGL 3D model frame
Embedded page layer (<iframe>)
Native media frame (<video>)
Native sound block (<audio>)
Track asset node (<track>)
Picture layout manager (<picture>)
Image asset frame (<img>)
Image alt text info note
Figure framing node (<figure>)
Caption summary node (<figcaption>)
Lazy-loading image shell
Broken image placeholder box
Image magnification hover node
Lightbox slider carousel slider
Interactive image hotspot dot
Before/After reveal split slider
Audio soundwave visualizer track
Audio mute switcher control
Video auto-play toggle
Video loop continuous parameter
Video theater display switch
Embedded YouTube presentation module
Embedded Google Maps frame
PDF viewport interface box
Flash message media alert
Interactive chart line coordinate
Bar chart metric column
Pie chart slice selector
Financial index ticker row
Map layering selection box
Map zoom configuration buttons
Compass orientation arrow axis
Street View person anchor
Vector drawing pencil selector
Vector workspace eraser tool
Canvas brush width slider
Asset download collection package
Cloud import integration selector
Media stream cast icon button
Video track recording indicator
Audio channel balance balance adjuster
`
  },
  {
    firstId: 301,
    group: "Overlays & notifications",
    titles: `
Native <dialog> block
Global modal dimming backdrop
Auto-centering modal frame
Scroll-locked body block
Lightbox overlay wrap
Alert dialog verification popup
Cookie preference banner
Newsletter email popup slide
Full-screen navigation panel layer
Hover-triggered <abbr> tooltip
Custom CSS rich tooltip
Actionable popover menu cloud
Context-aware helper note
Floating snackbar status bubble
Self-dismissing toast popups
Global system alert banner
Destructive warning banner
Success event green bar
Informational tip blue note
In-app notifications slide panel
Dynamic notification dot indicator
Expanding drop-down alert log
Critical error block overlay
Age verification wall pane
Paywall subscription access gate
Multi-tab modal sub-menu
Ad block warning alert
Session timeout warning countdown
Onboarding tour guide spotlight
Next-step onboarding tool tip
Floating contextual feedback block
Slide-out bottom sheet pane
Inline info-alert panel
Password criteria checklist alert
Search overview dashboard popup
Form dirty-state unsaved alert
Drag-and-drop placement indicator outline
Live typing indicator bubble
Dynamic price breakdown popup box
Cart preview drawer overlay
Low inventory warning tag
Interactive tour milestone dot
Non-interactive backdrop click-shield
Multi-layered modal stack index
Welcome onboarding greeting mat
Digital signature drawing zone
Location access permission prompt
Push notifications registry prompt
Microphone usage approval modal
Camera access authorization sheet
Clipboard authorization utility block
File system write approval gate
Single Sign-On (SSO) login popup
Two-factor authenticator setup grid
Account deletion final warning block
Server connection retrying ticker
Offline connection status banner
Dynamic data refreshed confirmation bubble
Live stream incoming comments overlay
Content reporting flag modal
`
  },
  {
    firstId: 361,
    group: "Tables, lists & cards",
    titles: `
Grid framework (<table>)
Table top header row (<thead>)
Table data body row (<tbody>)
Table bottom summary row (<tfoot>)
Table header title cell (<th>)
Standard table data cell (<td>)
Table main caption element (<caption>)
Scope attribute target selector (scope="col")
Zebra-striped row styling layout
Responsive scrollable table shell
Sticky table header bar
Fixed first column structural anchor
Expandable table data row panel
Draggable table row reorder anchor
Inline table editing cell
Table column width resize divider
Unordered content list (<ul>)
Sequential numeric list (<ol>)
Custom definition list wrap (<dl>)
Definition term sub-component (<dt>)
Definition explanation sub-component (<dd>)
Standard list line item (<li>)
Flex-grid item card module
Card structural header banner
Card media image panel
Card text description block
Card action footer tray
Floating shadow card wrapper
Horizontal landscape card strip
Masonry grid layout container
E-commerce item grid card
Article preview summary card
User profile overview card
Analytics metric scoreboard card
Feature highlight presentation block
Testimonial user quotation tile
Pricing plan matrix card
Pricing feature check row
Split comparison view frame
Frequently Asked Questions (FAQ) list accordion
User comment forum thread layout
Timeline activity log branch
News feed stream thread
Media player playlist track item
Step-by-step progress checklist row
Shopping cart summary line
Invoice calculation breakdown grid
Search result overview line snippet
Key-value detail description row
Collapsible side-panel settings tree
Board column task stack container
Draggable project board card
Empty item placeholder graphic state
Content tagging chip container
Hero content presentation panel
Footer information matrix site index
Badge-labeled menu list item
Floating action bar interface tray
Overlay sidebar filter drawer
Dynamic screen sizing boundary shell
`
  },
  {
    firstId: 421,
    group: "Semantic structure & status",
    titles: `
<main>
<header>
<nav>
<footer>
<section>
<article>
<aside>
<h1>
<h2>
<h3>
<h4>
<h5>
<h6>
<p>
<strong>
<em>
<code>
<pre>
<blockquote>
<cite>
<time>
<address>
<hr>
<br>
<wbr>
<span>
<div>
Breadcrumb pathway tracker
Sticky top menu bar
Mega dropdown menu block
Tabbed data panel selector
Active selection line indicator
Mobile drawer slide menu
Active processing gear spinner
Linear progress tracking bar
Skeleton wireframe load screen
Numeric update badge chip
Live tracking milestone stepper
Removable filter tag bubble
System status pulse point
<fieldset> container
<legend> text caption
<label> element wrapper
Floating help tooltip node
Interactive grid item handle
Dynamic autocomplete options panel
Active focus boundary ring
Form error text message string
Cookie consent box layout
Inline details element (<details>)
Details summary label (<summary>)
Highlighted text tag (<mark>)
Subscript text formatter (<sub>)
Superscript text block (<sup>)
Strikethrough text tag (<s>)
Small text description container (<small>)
Inserted text line (<ins>)
Deleted text row block (<del>)
Custom Web Component node
Multi-select listbox container
Split-action option group
Pop-up confirmation panel
Sliding side option pane
Live data visualization point
Audio player progress slider
Video frame overlay dashboard
Drag-and-drop drop targets
Global search bar panel block
Multi-tier accordion container
Horizontal carousel navigation indicators
Active carousel position item dot
Infinite-scroll loading circle
Multi-row table filter row
Live update alert tag
User avatar image mask
Status color indicator circle
Dynamic price recalculation output (<output>)
Secure captcha puzzle screen
Account dashboard card frame
Form data tracking text log
Interactive code block clipboard copy trigger
Page print layout configuration anchor
Accessible skip navigation shortcut link
Floating feedback evaluation ribbon
Dynamic content search filter match highlight
Interactive file download packaging selector
Dynamic user interface layout customizer drawer
Secure third-party authentication portal connector
Interactive geographic mapping path segment
Financial dashboard tracking ledger row
Interactive vector typography node
Form processing fallback shield sheet
Real-time system interval countdown ticker
Accessibility audio description controller
Live streaming content broadcast banner overlay
`
  },
  {
    firstId: 516,
    group: "Live charts & dashboards",
    titles: `
Live KPI dashboard
Auto-refresh metrics
Revenue line chart
Category bar chart
Traffic area chart
Status distribution chart
Date-range analytics
Metric comparison
Interactive chart filters
Live activity feed
Dashboard data table
Export dashboard report
`
  }
];
const extendedDemoItems: DemoItem[] = extendedSections.flatMap(({ firstId, group, titles }) =>
  titles.trim().split("\n").map((title, index) => ({
    id: firstId + index,
    title,
    description: `Try the ${title} demo. Its interaction and status stay inside this card.`,
    group,
  }))
);
const semanticLogoutDemo: DemoItem = {
  id: 515,
  title: "Logout action",
  description: "End the demo session and return to the login screen.",
  group: "Semantic structure & status",
};
const loaderDemoItems: DemoItem[] = [
  { id: 528, title: "Animated spinners", description: "Start and stop an accessible loading spinner.", group: "Loaders & spinners" },
  { id: 529, title: "Progress indicator", description: "Run, pause, and reset a live progress bar.", group: "Loaders & spinners" },
  { id: 530, title: "Skeleton loading state", description: "Toggle a shimmer placeholder and its loaded content.", group: "Loaders & spinners" },
  { id: 531, title: "Blinking loading text", description: "Toggle blinking text as a loading status indicator.", group: "Loaders & spinners" },
];
const brokenAssetDemoItems: DemoItem[] = [
  { id: 532, title: "Broken link checker", description: "Check sample in-page links against their actual target elements.", group: "Broken links & images" },
  { id: 533, title: "Broken image fallback", description: "Trigger an image load failure and inspect its accessible fallback.", group: "Broken links & images" },
];
export const allDemoItems = [...demoItems, ...selectionDefinitions, ...sliderDefinitions, ...actionDefinitions, ...extendedDemoItems.map((item) => item.id === semanticLogoutDemo.id ? semanticLogoutDemo : item), ...loaderDemoItems, ...brokenAssetDemoItems];
export const groups = ["All components", "Essentials", "Text areas", "States & validation", "Structured data", "Rich text & editor", "Special controls", "Selection & choices", "Value sliders & ranges", "Clickable controls & actions", "File, media & graphics", "Overlays & notifications", "Tables, lists & cards", "Semantic structure & status", "Live charts & dashboards", "Loaders & spinners", "Broken links & images"];
export const submitItems = new Set([3, 5, 7, 8, 9, 19, 21, 23, 24, 25, 26, 27, 33, 50]);
export const nonResettableItems = new Set([17, 18, 32, 55]);
export const demoAccounts = [
  { username: "admin@lava.test", password: "LavaAdmin24", role: "Administrator" },
  { username: "tester@lava.test", password: "TestLab2026", role: "QA Engineer" },
  { username: "demo@lava.test", password: "Welcome123", role: "Demo account" },
  { username: "guest@lava.test", password: "GuestPass7", role: "Guest tester" },
];
