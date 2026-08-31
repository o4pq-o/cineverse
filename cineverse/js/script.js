// بيانات ثابتة لأن المشروع لا يستخدم قاعدة بيانات أو API.
const items = [
  { id: 1, name: "ظلال المدينة", type: "فيلم", year: "2024", rating: "8.7", image: "assets/images/poster-1.svg", short: "صحفية شابة تتبع أثر رسالة غامضة في مدينة لا تنام.", description: "تبدأ القصة عندما تجد صحفية رسالة قديمة تقودها إلى أسرار مخفية في شوارع المدينة. خلال رحلتها تكتشف أن كل قرار صغير قد يغير حياة أشخاص كثيرين." },
  { id: 2, name: "ما وراء البحر", type: "فيلم", year: "2023", rating: "8.4", image: "assets/images/poster-2.svg", short: "رحلة هادئة تكشف معنى الصداقة والعودة إلى الجذور.", description: "يسافر صديقان إلى قرية ساحلية بعد سنوات طويلة من البعد. هناك يعيدان اكتشاف صداقتهما ويتعرفان على قصة قديمة تربط عائلتيهما بالبحر." },
  { id: 3, name: "نبض أخير", type: "مسلسل", year: "2025", rating: "9.0", image: "assets/images/poster-3.svg", short: "طبيبة طوارئ تواجه قرارات صعبة في أكثر ليالي المستشفى ازدحامًا.", description: "تتابع أحداث المسلسل حياة طبيبة طوارئ تعمل في مستشفى كبير. بين الحالات العاجلة وعائلتها، تحاول أن تجد التوازن بين واجبها وحياتها الشخصية." },
  { id: 4, name: "رحلة إلى الشمال", type: "فيلم", year: "2022", rating: "8.1", image: "assets/images/poster-4.svg", short: "مغامرة عائلية ممتعة بين الجبال والطرق غير المتوقعة.", description: "تقرر عائلة القيام برحلة قصيرة إلى الشمال، لكنها تتحول إلى مغامرة مليئة بالمواقف الطريفة والدروس الجميلة عن التعاون والعائلة." },
  { id: 5, name: "الغرفة 17", type: "مسلسل", year: "2024", rating: "8.8", image: "assets/images/poster-5.svg", short: "كل حلقة تكشف سرًا جديدًا خلف باب غرفة قديمة.", description: "في فندق قديم، تثير الغرفة رقم 17 فضول موظف جديد. يبدأ بجمع القصص حولها، ويكتشف أن ضيوفًا كثيرين تركوا خلفهم أسرارًا غير مكتملة." },
  { id: 6, name: "وقت الغروب", type: "فيلم", year: "2023", rating: "8.3", image: "assets/images/poster-6.svg", short: "قصة دافئة عن بداية جديدة في مدينة صغيرة.", description: "بعد تغيير مفاجئ في حياتها، تنتقل مصورة إلى مدينة صغيرة. تتعلم هناك أن البدايات الجديدة لا تعني نسيان الماضي، بل فهمه بطريقة أجمل." }
];

function showSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  if (slides.length === 0) return;

  let currentSlide = 0;

  function changeSlide(number) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = number;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      changeSlide(Number(dot.dataset.slide));
    });
  });

  setInterval(function () {
    changeSlide((currentSlide + 1) % slides.length);
  }, 5000);
}

function createCard(item) {
  return `
    <article class="movie-card">
      <div class="movie-poster"><img src="${item.image}" alt="ملصق ${item.name}"><span class="poster-title">${item.name}</span></div>
      <div class="card-body">
        <div class="card-top"><h2>${item.name}</h2><span class="rating">★ ${item.rating}</span></div>
        <p>${item.short}</p>
        <a class="text-link" href="details.html?id=${item.id}">عرض التفاصيل ←</a>
      </div>
    </article>`;
}

function showCards(list) {
  const cardsGrid = document.querySelector("#cards-grid");
  const resultsMessage = document.querySelector("#results-message");
  if (!cardsGrid) return;

  cardsGrid.innerHTML = list.map(createCard).join("");
  resultsMessage.textContent = list.length === 0 ? "لا توجد نتائج مطابقة." : `عدد الأعمال: ${list.length}`;
}

function addSearch() {
  const searchInput = document.querySelector("#search-input");
  if (!searchInput) return;

  showCards(items);
  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.trim();
    const filteredItems = items.filter(function (item) {
      return item.name.includes(searchValue);
    });
    showCards(filteredItems);
  });
}

function showDetails() {
  const detailsPage = document.querySelector("#details-page");
  if (!detailsPage) return;

  const parameters = new URLSearchParams(window.location.search);
  const itemId = Number(parameters.get("id"));
  const selectedItem = items.find(function (item) {
    return item.id === itemId;
  });

  if (!selectedItem) {
    detailsPage.innerHTML = '<section class="not-found"><h1>لم يتم العثور على العمل</h1><a class="primary-button" href="browse.html">العودة إلى القائمة</a></section>';
    return;
  }

  detailsPage.innerHTML = `
    <a class="back-link" href="browse.html">← العودة إلى القائمة</a>
    <section class="details-content">
      <div class="details-poster"><img src="${selectedItem.image}" alt="ملصق ${selectedItem.name}"><h1>${selectedItem.name}</h1></div>
      <div class="details-info">
        <p class="section-label">${selectedItem.type}</p>
        <h1>${selectedItem.name}</h1>
        <div class="details-meta"><span>★ ${selectedItem.rating}</span><span>${selectedItem.year}</span><span>${selectedItem.type}</span></div>
        <p>${selectedItem.description}</p>
      </div>
    </section>`;
}

showSlider();
addSearch();
showDetails();
