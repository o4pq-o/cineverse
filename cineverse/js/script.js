/*
دليل قراءة JavaScript للمبتدئ: هذا الملف يتحكم في التفاعل. DOM يعني عناصر HTML التي يستطيع JavaScript الوصول إليها. المشروع لا يستخدم قاعدة بيانات أو API أو fetch أو async/await أو localStorage؛ البيانات محفوظة محليًا في Array اسمها items.
*/
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
/*
الدالة showSlider مسؤولة عن تشغيل سلايدر الصفحة الرئيسية.
تعمل عند استدعائها في نهاية الملف، ولا تستقبل Parameters ولا تعيد بيانات.
الخطوات: الحصول على الشرائح، معرفة الشريحة الحالية، الاستماع للنقر، ثم التبديل التلقائي.
*/
function showSlider() {
  // الحصول على الشرائح وأزرار التحكم.
  // document يمثل صفحة HTML الحالية. querySelectorAll يعيد جميع عناصر DOM التي تطابق selector. هنا نحصل على كل الشرائح ذات class slide.
  const slides = document.querySelectorAll(".slide");
  // الحصول على جميع نقاط التحكم التي ينقر عليها المستخدم للانتقال إلى شريحة محددة.
  const dots = document.querySelectorAll(".slider-dot");

  // إيقاف الدالة إذا لم تكن الصفحة تحتوي على سلايدر.
  // شرط حماية: إذا لم توجد شرائح فنحن لسنا في الصفحة الرئيسية، لذلك نوقف الدالة باستخدام return.
  if (slides.length === 0) {
    return;
  }

  // رقم الشريحة المعروضة حاليًا.
  // let يسمح بتغيير القيمة لاحقًا. يبدأ العد من 0 لأن فهارس القوائم في JavaScript تبدأ من الصفر.
  let currentSlide = 0;

  // تغيير الشريحة وتحديث الزر النشط.
  /* دالة داخلية تغير الشريحة. number هو Parameter يمثل رقم الشريحة المطلوبة. تزيل active من القديم ثم تضيفه للجديد، وCSS يقرر أن active تعني الظهور. */
  function changeSlide(number) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = number;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  // إضافة حدث لكل زر في السلايدر.
  // forEach تمر على كل نقطة. dot يمثل النقطة الحالية في كل دورة.
  dots.forEach(function (dot) {
    // addEventListener يعني الاستماع لحدث. هنا عند click ننفذ الدالة التالية.
    dot.addEventListener("click", function () {
      // قراءة رقم الشريحة من data-slide.
      // dataset.slide يقرأ data-slide من HTML كنص، وNumber يحوله إلى رقم ثم نرسل الرقم إلى changeSlide.
      changeSlide(Number(dot.dataset.slide));
    });
  });

  // الانتقال تلقائيًا إلى الشريحة التالية كل 5 ثوان.
  // setInterval يكرر تنفيذ الدالة. 5000 millisecond تساوي 5 ثوانٍ.
  setInterval(function () {
    // حساب رقم الشريحة التالية.
    let nextSlide = currentSlide + 1;

    // العودة إلى أول شريحة بعد الوصول إلى الأخيرة.
    // عند تجاوز آخر فهرس نعود إلى 0، أي أول شريحة.
    if (nextSlide >= slides.length) {
      nextSlide = 0;
    }

    changeSlide(nextSlide);
  }, 5000);
}

// إنشاء HTML لبطاقة فيلم واحدة.
/*
createCard تنشئ HTML لبطاقة عمل واحدة.
item هو Object يحتوي بيانات فيلم واحد. الدالة تعيد String باستخدام Template Literal بين backticks.
داخل ${...} نضع قيم JavaScript داخل HTML الناتج.
*/
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
/*
showCards تعرض قائمة بطاقات. Parameter list قد يكون جميع items أو نتائج البحث.
تصل إلى DOM ثم تستخدم map لإنشاء بطاقة لكل عنصر وjoin لجمع النصوص ثم innerHTML لوضعها في الصفحة.
*/
function showCards(list) {
  // # يعني اختيار ID. هنا نصل إلى الحاوية التي ستظهر فيها البطاقات.
  const cardsGrid = document.querySelector("#cards-grid");
  const resultsMessage = document.querySelector("#results-message");

  // الخروج إذا لم تكن الصفحة تحتوي على منطقة البطاقات.
  if (!cardsGrid) {
    return;
  }

  // إنشاء بطاقة لكل عنصر في القائمة.
  // map تنشئ نتيجة لكل عنصر، createCard تحول العنصر إلى HTML، join("") يجمع النتائج دون فواصل، وinnerHTML يضع HTML داخل الصفحة.
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
/*
addSearch تشغل البحث الفوري. تصل إلى input، تعرض جميع الأعمال أولًا، ثم عند كل حدث input تستخدم filter لإنتاج قائمة مطابقة وتعرضها.
*/
function addSearch() {
  const searchInput = document.querySelector("#search-input");

  // الخروج إذا لم يكن مربع البحث موجودًا.
  if (!searchInput) {
    return;
  }

  // عرض جميع الأعمال عند فتح الصفحة.
  showCards(items);

  // البحث أثناء كتابة المستخدم.
  // حدث input يحدث عند الكتابة أو الحذف داخل مربع البحث.
  searchInput.addEventListener("input", function () {
    // value تقرأ النص المكتوب، وtrim تزيل المسافات الزائدة من البداية والنهاية.
    const searchValue = searchInput.value.trim();

    // الاحتفاظ بالأعمال التي يحتوي اسمها على النص المكتوب.
    // filter تمر على Array وتعيد Array جديدة تحتوي فقط العناصر التي تحقق الشرط.
    const filteredItems = items.filter(function (item) {
      // includes تتحقق هل اسم العمل يحتوي النص الذي كتبه المستخدم. true يبقي العنصر وfalse يستبعده.
      return item.name.includes(searchValue);
    });

    // عرض نتائج البحث.
    showCards(filteredItems);
  });
}

// عرض تفاصيل العمل المختار.
/*
showDetails تعرض تفاصيل عمل واحد. تقرأ id من URL ثم تستخدم find للبحث عن Object المطابق، وبعدها تنشئ HTML للتفاصيل أو رسالة عدم العثور.
*/
function showDetails() {
  const detailsPage = document.querySelector("#details-page");

  // الخروج إذا لم تكن هذه صفحة التفاصيل.
  if (!detailsPage) {
    return;
  }

  // قراءة رقم العمل من رابط الصفحة.
  // window.location.search يعيد الجزء بعد ? في الرابط. URLSearchParams يسهل قراءة القيم مثل id=3.
  const parameters = new URLSearchParams(window.location.search);
  // get("id") تقرأ قيمة id كنص، وNumber تحولها إلى رقم لمقارنتها مع id الرقمي.
  const itemId = Number(parameters.get("id"));

  // البحث عن العمل المطابق للرقم.
  // find تعيد أول عنصر يحقق الشرط، وهنا نبحث عن الفيلم الذي يساوي id الخاص به الرقم القادم من الرابط.
  const selectedItem = items.find(function (item) {
    // === مقارنة صارمة: القيمة والنوع يجب أن يتطابقا.
    return item.id === itemId;
  });

  // عرض رسالة إذا لم يتم العثور على العمل.
  // ! تعني NOT. إذا لم نجد عنصرًا مطابقًا نعرض رسالة ثم نستخدم return لإيقاف بقية الدالة.
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
/* تشغيل وظائف المشروع: كل دالة تتحقق من وجود عناصرها، لذلك يمكن استخدام نفس الملف في جميع الصفحات بأمان. */
showSlider();
addSearch();
showDetails();
