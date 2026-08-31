// بيانات ثابتة لأن المشروع لا يستخدم قاعدة بيانات أو API.
const items = [
  // بيانات كل فيلم أو مسلسل.
  { id: 1, name: "ظلال المدينة", type: "فيلم", year: "2024", rating: "8.7", image: "assets/images/poster-1.svg", short: "صحفية شابة تتبع أثر رسالة غامضة في مدينة لا تنام.", description: "تبدأ القصة عندما تجد صحفية رسالة قديمة تقودها إلى أسرار مخفية في شوارع المدينة. خلال رحلتها تكتشف أن كل قرار صغير قد يغير حياة أشخاص كثيرين." },
  { id: 2, name: "ما وراء البحر", type: "فيلم", year: "2023", rating: "8.4", image: "assets/images/poster-2.svg", short: "رحلة هادئة تكشف معنى الصداقة والعودة إلى الجذور.", description: "يسافر صديقان إلى قرية ساحلية بعد سنوات طويلة من البعد. هناك يعيدان اكتشاف صداقتهما ويتعرفان على قصة قديمة تربط عائلتيهما بالبحر." },
  { id: 3, name: "نبض أخير", type: "مسلسل", year: "2025", rating: "9.0", image: "assets/images/poster-3.svg", short: "طبيبة طوارئ تواجه قرارات صعبة في أكثر ليالي المستشفى ازدحامًا.", description: "تتابع أحداث المسلسل حياة طبيبة طوارئ تعمل في مستشفى كبير. بين الحالات العاجلة وعائلتها، تحاول أن تجد التوازن بين واجبها وحياتها الشخصية." },
  { id: 4, name: "رحلة إلى الشمال", type: "فيلم", year: "2022", rating: "8.1", image: "assets/images/poster-4.svg", short: "مغامرة عائلية ممتعة بين الجبال والطرق غير المتوقعة.", description: "تقرر عائلة القيام برحلة قصيرة إلى الشمال، لكنها تتحول إلى مغامرة مليئة بالمواقف الطريفة والدروس الجميلة عن التعاون والعائلة." },
  { id: 5, name: "الغرفة 17", type: "مسلسل", year: "2024", rating: "8.8", image: "assets/images/poster-5.svg", short: "كل حلقة تكشف سرًا جديدًا خلف باب غرفة قديمة.", description: "في فندق قديم، تثير الغرفة رقم 17 فضول موظف جديد. يبدأ بجمع القصص حولها، ويكتشف أن ضيوفًا كثيرين تركوا خلفهم أسرارًا غير مكتملة." },
  { id: 6, name: "وقت الغروب", type: "فيلم", year: "2023", rating: "8.3", image: "assets/images/poster-6.svg", short: "قصة دافئة عن بداية جديدة في مدينة صغيرة.", description: "بعد تغيير مفاجئ في حياتها، تنتقل مصورة إلى مدينة صغيرة. تتعلم هناك أن البدايات الجديدة لا تعني نسيان الماضي، بل فهمه بطريقة أجمل." }
];

// تشغيل سلايدر الصفحة الرئيسية.
function showSlider() {
  // الحصول على الشرائح وأزرار التحكم.
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");

  // إيقاف الدالة إذا لم تكن الصفحة تحتوي على سلايدر.
  if (slides.length === 0) {
    return;
  }

  // رقم الشريحة المعروضة حاليًا.
  let currentSlide = 0;

  // تغيير الشريحة وتحديث الزر النشط.
  function changeSlide(number) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = number;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  // إضافة حدث لكل زر في السلايدر.
  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      // قراءة رقم الشريحة من data-slide.
      changeSlide(Number(dot.dataset.slide));
    });
  });

  // الانتقال تلقائيًا إلى الشريحة التالية كل 5 ثوان.
  setInterval(function () {
    let nextSlide = currentSlide + 1;

    // العودة إلى أول شريحة بعد الوصول إلى الأخيرة.
    if (nextSlide >= slides.length) {
      nextSlide = 0;
    }

    changeSlide(nextSlide);
  }, 5000);
}

// إنشاء HTML لبطاقة فيلم واحدة.
function createCard(item) {
  return `
    <article class="movie-card">
      <div class="movie-poster">
        <img src="${item.image}" alt="ملصق ${item.name}">
        <span class="poster-title">${item.name}</span>
      </div>

      <div class="card-body">
        <div class="card-top">
          <h2>${item.name}</h2>
          <span class="rating">★ ${item.rating}</span>
        </div>

        <p>${item.short}</p>
        <a class="text-link" href="details.html?id=${item.id}">عرض التفاصيل ←</a>
      </div>
    </article>
  `;
}

// عرض مجموعة من البطاقات في صفحة الاستكشاف.
function showCards(list) {
  const cardsGrid = document.querySelector("#cards-grid");
  const resultsMessage = document.querySelector("#results-message");

  // الخروج إذا لم تكن الصفحة تحتوي على منطقة البطاقات.
  if (!cardsGrid) {
    return;
  }

  // إنشاء بطاقة لكل عنصر في القائمة.
  cardsGrid.innerHTML = list.map(createCard).join("");

  // عرض عدد النتائج أو رسالة عند عدم وجود نتائج.
  if (resultsMessage) {
    if (list.length === 0) {
      resultsMessage.textContent = "لا توجد نتائج مطابقة.";
    } else {
      resultsMessage.textContent = "عدد الأعمال: " + list.length;
    }
  }
}

// إضافة وظيفة البحث.
function addSearch() {
  const searchInput = document.querySelector("#search-input");

  // الخروج إذا لم يكن مربع البحث موجودًا.
  if (!searchInput) {
    return;
  }

  // عرض جميع الأعمال عند فتح الصفحة.
  showCards(items);

  // البحث أثناء كتابة المستخدم.
  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.trim();

    // الاحتفاظ بالأعمال التي يحتوي اسمها على النص المكتوب.
    const filteredItems = items.filter(function (item) {
      return item.name.includes(searchValue);
    });

    // عرض نتائج البحث.
    showCards(filteredItems);
  });
}

// عرض تفاصيل العمل المختار.
function showDetails() {
  const detailsPage = document.querySelector("#details-page");

  // الخروج إذا لم تكن هذه صفحة التفاصيل.
  if (!detailsPage) {
    return;
  }

  // قراءة رقم العمل من رابط الصفحة.
  const parameters = new URLSearchParams(window.location.search);
  const itemId = Number(parameters.get("id"));

  // البحث عن العمل المطابق للرقم.
  const selectedItem = items.find(function (item) {
    return item.id === itemId;
  });

  // عرض رسالة إذا لم يتم العثور على العمل.
  if (!selectedItem) {
    detailsPage.innerHTML =
      '<section class="not-found"><h1>لم يتم العثور على العمل</h1><a class="primary-button" href="browse.html">العودة إلى القائمة</a></section>';
    return;
  }

  // إنشاء محتوى صفحة التفاصيل.
  detailsPage.innerHTML = `
    <a class="back-link" href="browse.html">← العودة إلى القائمة</a>

    <section class="details-content">
      <div class="details-poster">
        <img src="${selectedItem.image}" alt="ملصق ${selectedItem.name}">
        <h1>${selectedItem.name}</h1>
      </div>

      <div class="details-info">
        <p class="section-label">${selectedItem.type}</p>
        <h1>${selectedItem.name}</h1>

        <div class="details-meta">
          <span>★ ${selectedItem.rating}</span>
          <span>${selectedItem.year}</span>
          <span>${selectedItem.type}</span>
        </div>

        <p>${selectedItem.description}</p>
      </div>
    </section>
  `;
}

// تشغيل وظائف المشروع المناسبة لكل صفحة.
showSlider();
addSearch();
showDetails();
