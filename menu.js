"use strict";

/* ============================================================
   달빛 카페 메뉴판 · QR 주문
   - 메뉴 데이터 / 카테고리 필터 / 옵션 선택 / 장바구니 / 주문
   - 사진은 Unsplash 무료 사진 (가격·산지 정보는 수업용 가상 데이터)
   ============================================================ */

const CATEGORIES = [
    { id: "filter",    label: "필터",      note: "산지와 가공 방식이 다른 원두를 핸드드립으로 내립니다." },
    { id: "coffee",    label: "커피",      note: "필터 외의 클래식한 커피 메뉴." },
    { id: "signature", label: "시그니처",  note: "달빛 카페의 대표 메뉴, 말차와 흑임자." },
    { id: "tea",       label: "논커피/티", note: "커피가 어려운 분들을 위한 차." },
    { id: "dessert",   label: "디저트",    note: "필터 커피와 어울리는 디저트, 그리고 말차·흑임자 디저트." }
];

/* 옵션 묶음: 같은 메뉴 안에서 고르는 선택지 */
const TEMP_HOT_ICE = {
    key: "온도",
    choices: [{ label: "HOT", price: 0 }, { label: "ICE", price: 0 }]
};
const SHOT = {
    key: "샷",
    choices: [{ label: "기본", price: 0 }, { label: "샷 추가", price: 500 }]
};

/* 메뉴 데이터
   - summary: 목록에 보이는 한 줄 (필터는 산지)
   - spec: 상세 시트에 보이는 정보 (필터는 산지·농장·품종·가공 등 전체)
   - fixed: 선택이 아닌 고정 조건 (예: ICE 전용)
   - photoByChoice: 옵션에 따라 사진을 바꿀 때 사용 */
const MENU = [
    /* ---------- 필터 ---------- */
    {
        id: "f1", category: "filter", name: "에티오피아 게뎁 와테 단체 레드 허니", en: "Ethiopia Gedeb Wate Danche Red Honey",
        price: 14000, photo: "1759259639356-7c6e74eed1ec", imageAlt: "V60 드리퍼에 물을 붓는 핸드드립",
        summary: "에티오피아 · 게뎁 · 와테 단체 스테이션 · 레드 허니",
        desc: "열매의 과육을 남겨 말려 단맛과 과일 향을 살린 레드 허니 프로세스 커피.",
        spec: {
            "국가": "에티오피아", "지역": "예가체프 게뎁(Gedeb)", "농장·생산처": "와테 단체(Wate Danche) 워싱 스테이션",
            "품종": "에티오피아 재래종(Landrace)", "가공": "레드 허니", "고도": "약 2,200m", "향미": "허니 가공의 단맛과 과일 향"
        },
        options: [TEMP_HOT_ICE]
    },
    {
        id: "f2", category: "filter", name: "콜롬비아 우일라 부에나비스타", en: "Colombia Huila Buenavista",
        price: 15000, photo: "1620051524446-5160985790e1", imageAlt: "저울 위에서 핸드드립으로 커피를 내리는 모습",
        summary: "콜롬비아 · 우일라 라 플라타 · 핑크 버번 워시드",
        desc: "딸기와 시트러스, 꽃향이 어우러지는 핑크 버번의 화사한 맛.",
        spec: {
            "국가": "콜롬비아", "지역": "우일라 라 플라타(La Plata, Huila)", "농장·생산처": "핀카 부에나비스타(Finca Buenavista)",
            "품종": "핑크 버번(Pink Bourbon)", "가공": "워시드", "고도": "약 1,860m", "향미": "딸기 · 시트러스 · 플로럴"
        },
        options: [TEMP_HOT_ICE]
    },
    {
        id: "f3", category: "filter", name: "케냐 니에리 가토모야 AA", en: "Kenya Nyeri Gatomboya AA",
        price: 14000, photo: "1729277133095-bff46b56c29a", imageAlt: "드리퍼로 커피를 내리는 모습",
        summary: "케냐 · 니에리 · 가토모야 워싱 스테이션 · 워시드",
        desc: "선명한 산미와 묵직한 바디감이 인상적인 케냐 커피.",
        spec: {
            "국가": "케냐", "지역": "니에리(Nyeri)", "농장·생산처": "가토모야(Gatomboya) 워싱 스테이션 · 바리추 농협",
            "품종": "SL28 · SL34 · 루이루 11 · 바티안", "등급": "AA", "가공": "워시드", "고도": "약 1,650~1,800m",
            "향미": "블랙커런트 · 토마토 · 흑설탕"
        },
        options: [TEMP_HOT_ICE]
    },
    {
        id: "f4", category: "filter", name: "파나마 보케테 라 에스메랄다 게이샤", en: "Panama Boquete La Esmeralda Geisha",
        price: 30000, photo: "1522012188892-24beb302783d", imageAlt: "내린 커피를 머그잔에 따르는 모습",
        summary: "파나마 · 보케테 · 아시엔다 라 에스메랄다 · 워시드",
        desc: "재스민과 베르가못 향이 피어오르는 한정 수량의 게이샤.",
        spec: {
            "국가": "파나마", "지역": "보케테(Boquete)", "농장·생산처": "아시엔다 라 에스메랄다(Hacienda La Esmeralda) · 피터슨 가문",
            "품종": "게이샤(Geisha)", "가공": "워시드", "고도": "약 1,600~1,800m", "향미": "재스민 · 베르가못 · 복숭아", "비고": "한정 수량"
        },
        options: [TEMP_HOT_ICE],
        badge: "한정"
    },
    {
        id: "f5", category: "filter", name: "에티오피아 예가체프 코체레 아다도", en: "Ethiopia Yirgacheffe Kochere Adado",
        price: 14000, photo: "1758221054731-744af4bf4d68", imageAlt: "진한 커피를 컵에 붓는 모습",
        summary: "에티오피아 · 예가체프 코체레 · 아다도 · 워시드",
        desc: "레몬과 재스민 향이 맑게 이어지는 깔끔한 워시드.",
        spec: {
            "국가": "에티오피아", "지역": "예가체프 코체레(Kochere)", "농장·생산처": "아다도(Adado) 워싱 스테이션",
            "품종": "에티오피아 에얼룸(Heirloom)", "가공": "워시드", "고도": "1,800m 이상", "향미": "레몬 · 재스민 · 아이스티"
        },
        options: [TEMP_HOT_ICE]
    },
    {
        id: "f6", category: "filter", name: "과테말라 우에우에테낭고 엘 인헤르토", en: "Guatemala Huehuetenango El Injerto",
        price: 15000, photo: "1447933601403-0c6688de566e", imageAlt: "볶은 커피 원두",
        summary: "과테말라 · 우에우에테낭고 · 핀카 엘 인헤르토 · 워시드",
        desc: "다크 초콜릿과 오렌지, 견과의 고소함이 균형 잡힌 커피.",
        spec: {
            "국가": "과테말라", "지역": "우에우에테낭고(Huehuetenango)", "농장·생산처": "핀카 엘 인헤르토(Finca El Injerto)",
            "품종": "부르봉(Bourbon)", "가공": "워시드", "고도": "약 1,500~1,900m", "향미": "다크 초콜릿 · 오렌지 · 견과", "사진": "원두 사진"
        },
        options: [TEMP_HOT_ICE]
    },

    /* ---------- 커피 ---------- */
    {
        id: "c1", category: "coffee", name: "카페 라떼", en: "Caffe Latte",
        price: 6500, photo: "1760163178873-7644a924519e", imageAlt: "라떼 아트가 올라간 카페 라떼",
        summary: "에스프레소 + 스팀 밀크",
        desc: "고소한 에스프레소에 부드럽게 스팀한 우유를 더했습니다.",
        spec: {},
        options: [TEMP_HOT_ICE, SHOT]
    },
    {
        id: "c2", category: "coffee", name: "플랫 화이트", en: "Flat White",
        price: 7000, photo: "1497636577773-f1231844b336", imageAlt: "라떼 아트가 있는 플랫 화이트",
        summary: "진한 에스프레소 + 얇은 우유 거품",
        desc: "라떼보다 진한 커피 맛과 얇은 우유 거품이 어우러집니다.",
        spec: {},
        options: [TEMP_HOT_ICE, SHOT]
    },
    {
        id: "c3", category: "coffee", name: "카푸치노", en: "Cappuccino",
        price: 6500, photo: "1762402519375-a29d7971a761", imageAlt: "라떼 아트가 있는 카푸치노",
        summary: "에스프레소 + 풍성한 우유 거품",
        desc: "풍성한 우유 거품과 진한 에스프레소의 균형.",
        spec: {},
        options: [TEMP_HOT_ICE, SHOT]
    },
    {
        id: "c4", category: "coffee", name: "콜드브루", en: "Cold Brew",
        price: 7000, photo: "1759259639356-6eee63241869", imageAlt: "얼음이 담긴 유리병의 콜드브루",
        summary: "12시간 저온 추출 · ICE",
        desc: "찬물로 천천히 우려 깔끔하고 부드러운 커피.",
        spec: { "추출": "12시간 저온 추출" },
        fixed: { "온도": "ICE" },
        options: []
    },

    /* ---------- 시그니처 ---------- */
    {
        id: "s1", category: "signature", name: "말차 라떼", en: "Matcha Latte",
        price: 8000, photo: "1766426910014-63a302fa137e", imageAlt: "라떼 아트가 있는 말차 라떼",
        photoByChoice: { key: "온도", photos: { "ICE": ["1785711571852-8edfd71e92ef", "얼음 위에 말차 가루를 얹은 아이스 말차 라떼"] } },
        summary: "진한 말차 + 우유",
        desc: "진한 말차에 고소한 우유를 더한 달빛 카페의 대표 메뉴.",
        spec: { "특징": "시그니처 · 말차" },
        options: [TEMP_HOT_ICE],
        badge: "시그니처"
    },
    {
        id: "s2", category: "signature", name: "말차 크림 라떼", en: "Matcha Cream Latte",
        price: 9000, photo: "1717603545758-88cc454db69b", imageAlt: "우유와 말차가 층을 이룬 말차 크림 라떼",
        summary: "말차 + 크림 · ICE",
        desc: "달콤한 크림과 쌉싸름한 말차가 층층이 쌓인 음료.",
        spec: { "특징": "시그니처 · 말차" },
        fixed: { "온도": "ICE" },
        options: [],
        badge: "시그니처"
    },
    {
        id: "s3", category: "signature", name: "흑임자 라떼", en: "Black Sesame Latte",
        price: 8500, photo: "1771250850243-0b82ffdfd90a", imageAlt: "회색빛 라떼 아트가 올라간 라떼",
        summary: "고소한 흑임자 + 우유",
        desc: "고소하게 볶은 흑임자를 갈아 만든 크리미한 라떼.",
        spec: { "특징": "시그니처 · 흑임자", "사진": "비슷한 색의 회색 라떼 사진" },
        options: [TEMP_HOT_ICE],
        badge: "시그니처"
    },

    /* ---------- 논커피/티 ---------- */
    {
        id: "t1", category: "tea", name: "얼그레이 티", en: "Earl Grey Tea",
        price: 6500, photo: "1563911892317-47551470aed8", imageAlt: "찻잎과 찻잔",
        summary: "베르가못 향의 홍차",
        desc: "베르가못 향이 은은한 클래식 홍차.",
        spec: {},
        options: [TEMP_HOT_ICE]
    },
    {
        id: "t2", category: "tea", name: "호지차", en: "Hojicha",
        price: 6500, photo: "1597334130152-80bf2824d003", imageAlt: "유리 찻잔에 담긴 호지차",
        summary: "구수하게 볶은 녹차",
        desc: "볶은 찻잎의 구수한 향이 편안한, 카페인이 적은 차.",
        spec: {},
        options: [TEMP_HOT_ICE]
    },

    /* ---------- 디저트 ---------- */
    {
        id: "d1", category: "dessert", name: "버터 크루아상", en: "Butter Croissant",
        price: 5500, photo: "1623334044303-241021148842", imageAlt: "갓 구운 버터 크루아상",
        summary: "필터 커피와 함께",
        desc: "겹겹이 바삭한 결이 필터 커피와 잘 어울립니다.",
        spec: { "페어링": "필터 커피" }, options: []
    },
    {
        id: "d2", category: "dessert", name: "바스크 치즈케이크", en: "Basque Cheesecake",
        price: 8500, photo: "1759303380841-55c09244fd2b", imageAlt: "바스크 치즈케이크 한 조각",
        summary: "산미 있는 필터 커피와 함께",
        desc: "겉은 진하게 그을리고 속은 촉촉한 치즈케이크.",
        spec: { "페어링": "필터 커피(산미 있는 원두)" }, options: []
    },
    {
        id: "d3", category: "dessert", name: "레몬 파운드케이크", en: "Lemon Pound Cake",
        price: 6500, photo: "1767032778094-1edb984e5b23", imageAlt: "접시에 놓인 레몬 파운드케이크 두 조각",
        summary: "필터 커피와 함께",
        desc: "상큼한 레몬 향이 커피의 단맛을 끌어올립니다.",
        spec: { "페어링": "필터 커피" }, options: []
    },
    {
        id: "d4", category: "dessert", name: "스콘", en: "Scone",
        price: 6000, photo: "1763390896467-1ca4a95c6261", imageAlt: "잼과 크림을 곁들인 스콘",
        summary: "잼 · 크림 곁들임",
        desc: "잼과 크림을 곁들이는 담백한 스콘.",
        spec: { "페어링": "필터 커피" }, options: []
    },
    {
        id: "d5", category: "dessert", name: "말차 케이크", en: "Matcha Cake",
        price: 9000, photo: "1759324351433-c5a1063f8ac6", imageAlt: "말차 시트와 크림이 층을 이룬 케이크",
        summary: "말차 시트 + 크림",
        desc: "말차 시트와 크림을 겹겹이 쌓은 케이크.",
        spec: { "특징": "시그니처 · 말차" }, options: [], badge: "시그니처"
    },
    {
        id: "d6", category: "dessert", name: "흑임자 트위스트 페이스트리", en: "Black Sesame Twist",
        price: 5500, photo: "1587591556974-3ff089a61c90", imageAlt: "참깨를 얹은 트위스트 페이스트리",
        summary: "흑임자를 넣어 고소하게 구운 페이스트리",
        desc: "흑임자와 참깨를 넣어 고소하게 구운 트위스트 페이스트리.",
        spec: { "특징": "시그니처 · 흑임자", "사진": "참깨 페이스트리 사진" }, options: [], badge: "시그니처"
    }
];

/* ---------- 상태 ---------- */
const STORAGE_KEY = "moonlight-cafe-cart";
let currentCategory = "all";
let cart = loadCart();
let selected = null;      /* 상세 시트에서 고르는 중인 메뉴 */

/* ---------- 요소 ---------- */
const $ = id => document.getElementById(id);
const menuList = $("menu-list");
const tabs = document.querySelectorAll(".tab");
const itemModal = $("item-modal");
const cartModal = $("cart-modal");
const cartBar = $("cart-bar");

/* ---------- 도우미 ---------- */
function photoUrl(id, width) {
    return "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&q=75&w=" + width;
}

function won(price) {
    return price.toLocaleString("ko-KR") + "원";
}

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function findItem(id) {
    return MENU.find(item => item.id === id);
}

function loadCart() {
    try {
        const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved.filter(line => findItem(line.id)) : [];
    } catch (e) {
        return [];
    }
}

function saveCart() {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
        /* 저장이 막혀 있어도 주문은 계속 가능 */
    }
}

/* QR 주소의 ?table=7 에서 테이블 번호 읽기 */
function tableFromUrl() {
    const value = parseInt(new URLSearchParams(location.search).get("table"), 10);
    return value >= 1 && value <= 99 ? value : null;
}

/* ---------- 메뉴 목록 ---------- */
function createRow(item) {
    const row = el("button", "item");
    row.type = "button";
    row.dataset.id = item.id;

    const text = el("span", "item-text");
    const title = el("span", "item-name", item.name);
    /* 시그니처 카테고리 안에서는 뱃지가 중복이라 숨김 */
    if (item.badge && item.category !== "signature") title.appendChild(el("span", "badge", item.badge));
    text.append(
        title,
        el("span", "item-en", item.en),
        el("span", "item-summary", item.summary),
        el("span", "item-price", won(item.price))
    );

    const photo = el("span", "item-photo");
    const img = document.createElement("img");
    img.src = photoUrl(item.photo, 240);
    img.alt = item.imageAlt;
    img.loading = "lazy";
    img.width = 240;
    img.height = 240;
    img.addEventListener("error", () => img.classList.add("is-broken"));
    photo.appendChild(img);

    row.append(text, photo);
    return row;
}

function renderMenu() {
    menuList.replaceChildren();
    CATEGORIES.forEach(category => {
        if (currentCategory !== "all" && currentCategory !== category.id) return;

        const section = el("section", "group");
        section.appendChild(el("h2", "group-title", category.label));
        section.appendChild(el("p", "group-note", category.note));

        const list = el("div", "group-items");
        MENU.filter(item => item.category === category.id).forEach(item => list.appendChild(createRow(item)));
        section.appendChild(list);
        menuList.appendChild(section);
    });
}

function selectTab(category) {
    currentCategory = category;
    tabs.forEach(tab => {
        const active = tab.dataset.category === category;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
    });
    renderMenu();
    window.scrollTo({ top: 0 });
}

/* ---------- 메뉴 상세 시트 ---------- */
function openItem(item) {
    selected = { item: item, choices: {}, qty: 1 };
    item.options.forEach(group => { selected.choices[group.key] = group.choices[0].label; });

    $("item-category").textContent = CATEGORIES.find(c => c.id === item.category).label;
    $("item-name").textContent = item.name;
    $("item-en").textContent = item.en;
    $("item-desc").textContent = item.desc;
    $("item-qty").textContent = "1";

    /* 산지·농장 등 상세 정보 (고정 조건 포함) */
    const spec = $("item-spec");
    spec.replaceChildren();
    Object.entries(Object.assign({}, item.fixed || {}, item.spec)).forEach(([key, value]) => {
        const row = el("div");
        row.append(el("dt", "", key), el("dd", "", value));
        spec.appendChild(row);
    });
    spec.hidden = spec.children.length === 0;

    renderOptions();
    updateItemView();
    itemModal.showModal();
    itemModal.scrollTop = 0;
}

function renderOptions() {
    const box = $("item-options");
    box.replaceChildren();
    selected.item.options.forEach(group => {
        const fieldset = el("fieldset", "option-group");
        fieldset.appendChild(el("legend", "", group.key));

        const chips = el("div", "chips");
        group.choices.forEach(choice => {
            const label = el("label", "chip");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "opt-" + group.key;
            input.value = choice.label;
            input.checked = selected.choices[group.key] === choice.label;
            input.addEventListener("change", () => {
                selected.choices[group.key] = choice.label;
                updateItemView();
            });
            const text = el("span", "", choice.label + (choice.price ? " +" + choice.price.toLocaleString("ko-KR") : ""));
            label.append(input, text);
            chips.appendChild(label);
        });
        fieldset.appendChild(chips);
        box.appendChild(fieldset);
    });
    box.hidden = selected.item.options.length === 0;
}

/* 선택한 옵션에 맞는 단가 */
function unitPrice(item, choices) {
    return item.options.reduce((sum, group) => {
        const choice = group.choices.find(c => c.label === choices[group.key]);
        return sum + (choice ? choice.price : 0);
    }, item.price);
}

function updateItemView() {
    const item = selected.item;

    /* 옵션에 따라 사진이 바뀌는 메뉴 */
    let photo = item.photo;
    let alt = item.imageAlt;
    if (item.photoByChoice) {
        const alt2 = item.photoByChoice.photos[selected.choices[item.photoByChoice.key]];
        if (alt2) { photo = alt2[0]; alt = alt2[1]; }
    }
    const img = $("item-image");
    img.src = photoUrl(photo, 900);
    img.alt = alt;

    const unit = unitPrice(item, selected.choices);
    $("item-price").textContent = won(unit);
    $("add-btn").textContent = "담기 · " + won(unit * selected.qty);
}

function changeSelectedQty(delta) {
    selected.qty = Math.min(20, Math.max(1, selected.qty + delta));
    $("item-qty").textContent = String(selected.qty);
    updateItemView();
}

function optionText(item, choices) {
    const parts = [];
    if (item.fixed) parts.push(...Object.values(item.fixed));
    item.options.forEach(group => parts.push(choices[group.key]));
    return parts.join(" · ");
}

function addToCart() {
    const item = selected.item;
    const key = item.id + "|" + JSON.stringify(selected.choices);
    const existing = cart.find(line => line.key === key);
    if (existing) {
        existing.qty = Math.min(20, existing.qty + selected.qty);
    } else {
        cart.push({ key: key, id: item.id, choices: Object.assign({}, selected.choices), qty: selected.qty });
    }
    saveCart();
    itemModal.close();
    updateCartBar();
}

/* ---------- 장바구니 · 주문 ---------- */
function lineTotal(line) {
    const item = findItem(line.id);
    return unitPrice(item, line.choices) * line.qty;
}

function cartCount() {
    return cart.reduce((sum, line) => sum + line.qty, 0);
}

function cartTotal() {
    return cart.reduce((sum, line) => sum + lineTotal(line), 0);
}

function updateCartBar() {
    const count = cartCount();
    cartBar.hidden = count === 0;
    document.body.classList.toggle("has-cart", count > 0);
    $("cart-bar-count").textContent = String(count);
    $("cart-bar-total").textContent = won(cartTotal());
}

function renderCart() {
    const list = $("cart-lines");
    list.replaceChildren();

    cart.forEach(line => {
        const item = findItem(line.id);
        const row = el("li", "cart-line");

        const info = el("div", "cart-line-info");
        info.appendChild(el("p", "cart-line-name", item.name));
        const opt = optionText(item, line.choices);
        if (opt) info.appendChild(el("p", "cart-line-opt", opt));
        info.appendChild(el("p", "cart-line-price", won(lineTotal(line))));

        const qty = el("div", "qty qty-small");
        const minus = el("button", "", "−");
        minus.type = "button";
        minus.setAttribute("aria-label", item.name + " 하나 빼기");
        minus.addEventListener("click", () => changeLineQty(line.key, -1));
        const plus = el("button", "", "+");
        plus.type = "button";
        plus.setAttribute("aria-label", item.name + " 하나 더하기");
        plus.addEventListener("click", () => changeLineQty(line.key, 1));
        qty.append(minus, el("span", "", String(line.qty)), plus);

        row.append(info, qty);
        list.appendChild(row);
    });

    $("cart-total").textContent = won(cartTotal());
}

function changeLineQty(key, delta) {
    const line = cart.find(l => l.key === key);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) cart = cart.filter(l => l.key !== key);
    if (line.qty > 20) line.qty = 20;
    saveCart();
    updateCartBar();
    if (cart.length === 0) {
        cartModal.close();
    } else {
        renderCart();
    }
}

function openCart() {
    $("order-view").hidden = false;
    $("done-view").hidden = true;
    $("table-error").hidden = true;
    renderCart();
    cartModal.showModal();
    cartModal.scrollTop = 0;
}

function placeOrder() {
    const tableValue = parseInt($("table-input").value, 10);
    if (!(tableValue >= 1 && tableValue <= 99)) {
        $("table-error").hidden = false;
        $("table-input").focus();
        return;
    }

    const number = String(Math.floor(Math.random() * 900) + 100);
    const summary = $("done-lines");
    summary.replaceChildren();
    cart.forEach(line => {
        const item = findItem(line.id);
        const opt = optionText(item, line.choices);
        summary.appendChild(el("li", "", item.name + (opt ? " (" + opt + ")" : "") + " × " + line.qty));
    });

    $("done-number").textContent = "No. " + number;
    $("done-table").textContent = "TABLE " + String(tableValue).padStart(2, "0");
    $("done-total").textContent = won(cartTotal());

    cart = [];
    saveCart();
    updateCartBar();
    $("order-view").hidden = true;
    $("done-view").hidden = false;
    cartModal.scrollTop = 0;
}

/* ---------- 이벤트 ---------- */
tabs.forEach(tab => tab.addEventListener("click", () => selectTab(tab.dataset.category)));

menuList.addEventListener("click", event => {
    const row = event.target.closest(".item");
    if (row) openItem(findItem(row.dataset.id));
});

$("qty-minus").addEventListener("click", () => changeSelectedQty(-1));
$("qty-plus").addEventListener("click", () => changeSelectedQty(1));
$("add-btn").addEventListener("click", addToCart);
cartBar.addEventListener("click", openCart);
$("order-btn").addEventListener("click", placeOrder);
$("done-close").addEventListener("click", () => cartModal.close());
$("table-input").addEventListener("input", () => { $("table-error").hidden = true; });

document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => button.closest("dialog").close());
});

/* 시트 바깥(어두운 배경)을 누르면 닫기 */
[itemModal, cartModal].forEach(dialog => {
    dialog.addEventListener("click", event => {
        if (event.target === dialog) dialog.close();
    });
});

/* ---------- 시작 ---------- */
const table = tableFromUrl();
if (table) {
    $("table-label").textContent = "TABLE " + String(table).padStart(2, "0");
    $("table-input").value = String(table);
} else {
    $("table-label").textContent = "QR로 접속하면 테이블 번호가 표시됩니다";
}

renderMenu();
updateCartBar();
