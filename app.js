/* ==========================================
   FridgeMaster - Core Application Logic
   ========================================== */

// 1. 확장된 기본 내장 레시피 데이터 (한식, 일식, 중식, 양식 각 4종, 총 16종)
const DEFAULT_RECIPES = [
    // --- [한식] ---
    {
        id: "recipe_kimchi_fried_rice",
        name: "스팸 김치볶음밥",
        category: "한식",
        time: 15,
        description: "매콤한 김치와 짭조름한 스팸이 조화를 이루는 국민 간단 요리",
        emoji: "🍳",
        ingredients: ["김치", "계란", "스팸", "대파", "즉석밥"],
        steps: [
            { desc: "대파를 송송 썰고, 스팸과 김치는 먹기 좋은 크기로 다듬어 둡니다.", time: 3 },
            { desc: "팬에 식용유를 두르고 대파를 볶아 향긋한 파기름을 냅니다.", time: 2 },
            { desc: "파향이 올라오면 스팸과 김치를 함께 넣고 김치가 나른해질 때까지 볶습니다.", time: 5 },
            { desc: "불을 약하게 줄인 후 밥을 넣고 양념이 골고루 배도록 볶아줍니다.", time: 3 },
            { desc: "다른 팬에 계란 프라이를 부쳐 볶음밥 위에 얹어 완성합니다.", time: 2 }
        ]
    },
    {
        id: "recipe_kimchi_stew",
        name: "돼지고기 김치찌개",
        category: "한식",
        time: 25,
        description: "푹 끓인 김치와 큼직한 돼지고기로 밥 한 그릇 뚝딱 밥도둑 김치찌개",
        emoji: "🍲",
        ingredients: ["김치", "돼지고기", "두부", "대파", "물"],
        steps: [
            { desc: "냄비에 돼지고기와 김치를 넣고 중불에서 고기 표면이 익을 때까지 달달 볶습니다.", time: 5 },
            { desc: "고기가 익으면 물을 붓고 찌개가 끓어오를 때까지 센 불에서 가열합니다.", time: 5 },
            { desc: "끓기 시작하면 중약불로 줄이고 김치가 푹 익도록 은근히 끓여 줍니다.", time: 10 },
            { desc: "두부와 대파를 큼직하게 썰어 넣고 소금/국간장으로 간을 맞추며 한 번 더 끓여 완성합니다.", time: 5 }
        ]
    },
    {
        id: "recipe_tteokbokki",
        name: "매콤달콤 국물 떡볶이",
        category: "한식",
        time: 15,
        description: "고추장 소스에 쫀득한 떡과 어묵이 촉촉하게 배어든 대표 길거리 간식",
        emoji: "🍡",
        ingredients: ["떡", "어묵", "고추장", "대파", "물"],
        steps: [
            { desc: "떡은 물에 헹구어 건져두고 어묵과 대파는 한입 크기로 썰어 줍니다.", time: 2 },
            { desc: "냄비에 물을 붓고 고추장과 설탕을 잘 풀어 소스를 끓입니다.", time: 3 },
            { desc: "끓기 시작하면 준비한 떡과 어묵을 넣고 소스가 살짝 걸쭉해질 때까지 끓여 줍니다.", time: 7 },
            { desc: "마지막으로 대파를 넣고 한소끔 끓여 마무리합니다.", time: 3 }
        ]
    },
    {
        id: "recipe_egg_roll",
        name: "포슬포슬 야채 계란말이",
        category: "한식",
        time: 12,
        description: "다진 파를 송송 넣어 보기 좋고 영양 가득한 달콤 고소 계란말이",
        emoji: "🥚",
        ingredients: ["계란", "대파", "식용유"],
        steps: [
            { desc: "볼에 계란을 풀고, 대파를 잘게 다져 넣어 섞은 뒤 소금 한 꼬집으로 간을 합니다.", time: 3 },
            { desc: "팬에 식용유를 얇게 두르고 약불에서 계란물 1/3을 부어 얇게 폅니다.", time: 2 },
            { desc: "계란이 반쯤 익으면 가볍게 접기 시작하여 끝으로 밀어 넣습니다.", time: 3 },
            { desc: "남은 계란물을 이어 부어가며 돌돌 말아 도톰한 계란말이를 성형하고, 식힌 후 썹니다.", time: 4 }
        ]
    },

    // --- [일식] ---
    {
        id: "recipe_katsudon",
        name: "촉촉한 가츠동 (돈가스덮밥)",
        category: "일식",
        time: 15,
        description: "간장 소스에 졸인 아삭한 양파와 부드러운 달걀 옷을 입힌 돈가스 덮밥",
        emoji: "🍱",
        ingredients: ["돈가스", "계란", "양파", "즉석밥", "간장"],
        steps: [
            { desc: "돈가스는 에어프라이어에 튀겨 한입 크기로 썰고 양파는 얇게 채 썹니다.", time: 5 },
            { desc: "팬에 물 1/2컵, 간장 2큰술, 설탕 1큰술을 넣고 끓이다가 양파를 넣어 투명해질 때까지 졸입니다.", time: 4 },
            { desc: "양파가 익으면 썰어둔 돈가스를 얹고 그 위에 푼 계란을 둘러 부어 줍니다.", time: 3 },
            { desc: "계란이 반숙으로 익으면 밥 위에 통째로 미끄러뜨리듯 얹어 냅니다.", time: 3 }
        ]
    },
    {
        id: "recipe_yakiudon",
        name: "굴소스 삼겹살 야끼우동",
        category: "일식",
        time: 15,
        description: "우동 면에 돼지고기와 야채를 듬뿍 넣고 볶아낸 고소한 볶음우동",
        emoji: "🍜",
        ingredients: ["우동면", "돼지고기", "양배추", "양파", "간장"],
        steps: [
            { desc: "끓는 물에 우동 면을 살짝 데쳐 찬물에 헹군 뒤 체에 밭쳐 둡니다.", time: 3 },
            { desc: "팬에 삼겹살(돼지고기)을 볶아 고기 기름이 나오면 채 썬 양파와 양배추를 넣어 함께 볶습니다.", time: 4 },
            { desc: "야채가 숨이 죽으면 우동면을 넣고 간장과 굴소스로 간을 하여 강불에서 빠르게 볶아냅니다.", time: 5 },
            { desc: "접시에 담고 가쓰오부시나 파를 얹어 냅니다.", time: 3 }
        ]
    },
    {
        id: "recipe_okonomiyaki",
        name: "초간단 양배추 오꼬노미야끼",
        category: "일식",
        time: 20,
        description: "채 썬 양배추에 부침 가루와 베이컨을 올려 바삭하게 지진 일본식 전",
        emoji: "🥞",
        ingredients: ["양배추", "베이컨", "밀가루", "계란", "물"],
        steps: [
            { desc: "양배추를 얇게 채 썰어 씻은 뒤 물기를 빼고 베이컨은 한입 크기로 썹니다.", time: 4 },
            { desc: "볼에 채 썬 양배추, 계란, 밀가루 3큰술, 물 2큰술을 넣어 질척하게 섞어 반죽을 만듭니다.", time: 4 },
            { desc: "달궈진 팬에 반죽을 도톰하고 둥글게 얹고, 그 위에 베이컨을 가지런히 올립니다.", time: 4 },
            { desc: "아랫면이 노릇해지면 조심스레 뒤집어 베이컨이 바삭하게 익을 때까지 약불에서 굽습니다.", time: 5 },
            { desc: "마요네즈와 데리야끼 소스를 뿌려 완성합니다.", time: 3 }
        ]
    },
    {
        id: "recipe_shoyu_butter_rice",
        name: "간장 버터 계란밥",
        category: "일식",
        time: 5,
        description: "어릴 적 즐겨 먹던 반숙 계란 프라이와 버터, 간장의 극강 고소 조합",
        emoji: "🍚",
        ingredients: ["계란", "즉석밥", "버터", "간장"],
        steps: [
            { desc: "즉석밥을 따뜻하게 데워 대접에 담습니다.", time: 2 },
            { desc: "팬에 식용유를 살짝 두르고 노른자가 터지지 않게 반숙으로 계란 프라이를 만듭니다.", time: 2 },
            { desc: "따뜻한 밥 위에 버터 1조각을 올린 뒤, 갓 구운 뜨거운 계란 프라이를 얹고 간장 한 스푼을 둘러 비벼 줍니다.", time: 1 }
        ]
    },

    // --- [중식] ---
    {
        id: "recipe_mapo_tofu",
        name: "초간단 마파두부",
        category: "중식",
        time: 15,
        description: "두부의 부드러움과 매콤한 다진 고기 소스가 스며든 덮밥 요리",
        emoji: "🍲",
        ingredients: ["두부", "돼지고기", "대파", "고추장", "마늘"],
        steps: [
            { desc: "두부는 깍둑썰기하고, 대파와 마늘은 곱게 다져 둡니다.", time: 3 },
            { desc: "팬에 기름을 넉넉히 두르고 파와 마늘을 볶다가 돼지고기를 넣어 하얗게 익을 때까지 볶습니다.", time: 3 },
            { desc: "물 1컵에 고추장, 간장, 설탕을 잘 섞어 소스를 만들고 팬에 부어 보글보글 끓입니다.", time: 4 },
            { desc: "소스가 끓으면 썰어둔 두부를 넣고 뭉개지지 않게 살살 저어준 뒤 양념이 스며들면 전분물로 농도를 맞춥니다.", time: 5 }
        ]
    },
    {
        id: "recipe_chinese_fried_rice",
        name: "황금 파기름 계란볶음밥",
        category: "중식",
        time: 10,
        description: "대파 향 가득한 파기름에 계란을 코팅하듯 볶아낸 고슬고슬 볶음밥",
        emoji: "🍚",
        ingredients: ["즉석밥", "계란", "대파", "간장", "식용유"],
        steps: [
            { desc: "대파를 얇게 쫑쫑 썰고 계란은 미리 그릇에 풀어 둡니다.", time: 2 },
            { desc: "팬에 식용유를 두르고 대파를 볶아 고소한 파기름 향을 뿜어냅니다.", time: 2 },
            { desc: "파기름 한편에 계란물을 붓고 젓가락으로 빠르게 휘저어 스크램블을 만듭니다.", time: 2 },
            { desc: "밥을 넣고 국자로 꾹꾹 눌러가며 뭉친 밥을 풀고, 간장 1큰술을 팬 테두리에 태우듯 부어 불향을 가미해 볶아냅니다.", time: 4 }
        ]
    },
    {
        id: "recipe_tomato_egg",
        name: "토마토 달걀 볶음 (토달볶)",
        category: "중식",
        time: 8,
        description: "새콤달콤한 토마토와 부드러운 계란이 만나 가볍고 영양 가득한 아침 식사",
        emoji: "🍅",
        ingredients: ["토마토", "계란", "대파", "식용유"],
        steps: [
            { desc: "토마토는 한입 크기로 큼직하게 썰고 대파는 쫑쫑 썰어 줍니다.", time: 2 },
            { desc: "팬에 풀어둔 계란물을 넣고 몽글몽글하게 스크램블을 만들어 따로 접시에 덜어둡니다.", time: 2 },
            { desc: "팬을 닦고 다시 식용유를 둘러 파를 볶다가 토마토를 넣어 즙이 살짝 나올 때까지 볶아줍니다.", time: 2 },
            { desc: "구워둔 스크램블 에그를 다시 합치고 소금, 설탕을 살짝 넣어 가볍게 섞어 볶아 마무리합니다.", time: 2 }
        ]
    },
    {
        id: "recipe_jjambbong_ramen",
        name: "얼큰 삼겹살 짬뽕라면",
        category: "중식",
        time: 12,
        description: "삼겹살과 야채를 볶다 라면을 넣어 끓인 불맛 짬뽕 라면",
        emoji: "🍜",
        ingredients: ["라면", "양배추", "대파", "돼지고기", "물"],
        steps: [
            { desc: "팬에 삼겹살(돼지고기)과 썬 대파를 볶아 기름을 냅니다.", time: 3 },
            { desc: "채 썬 양배추와 라면 수프를 넣고 야채가 흐물흐물해질 때까지 강불에서 볶아 불맛을 입힙니다.", time: 3 },
            { desc: "뜨거운 물을 조심히 붓고 끓어오르면 라면 면발을 넣고 쫄깃하게 끓여냅니다.", time: 6 }
        ]
    },

    // --- [양식] ---
    {
        id: "recipe_aglio_olio",
        name: "갈릭 파스타 (알리오 올리오)",
        category: "양식",
        time: 15,
        description: "올리브유에 구운 마늘 향이 일품인 초간단 오일 파스타",
        emoji: "🍝",
        ingredients: ["파스타면", "마늘", "올리브유", "물"],
        steps: [
            { desc: "끓는 물에 소금 1큰술을 넣고 파스타 면을 약 8분간 삶아 건져둡니다 (면수 버리지 말 것).", time: 8 },
            { desc: "마늘을 얇게 편 썰어 둡니다.", time: 2 },
            { desc: "팬에 올리브유를 넉넉히 두르고 마늘을 약불에서 황금빛이 돌 때까지 볶아 향을 냅니다.", time: 3 },
            { desc: "마늘 향이 올라오면 삶아둔 면과 면수 반 컵을 넣고 강불에서 오일과 면수가 잘 섞이도록 볶아줍니다.", time: 2 }
        ]
    },
    {
        id: "recipe_french_toast",
        name: "촉촉한 프렌치 토스트",
        category: "양식",
        time: 10,
        description: "계란물에 적셔 버터 향이 물씬 풍기는 부드러운 아침 토스트",
        emoji: "🍞",
        ingredients: ["식빵", "계란", "우유", "버터"],
        steps: [
            { desc: "넓은 볼에 계란과 우유, 설탕 한 꼬집을 넣고 잘 섞어 계란물을 만듭니다.", time: 2 },
            { desc: "식빵을 계란물에 푹 적셔 빵 속까지 촉촉하게 스며들게 합니다.", time: 2 },
            { desc: "팬에 버터를 녹인 후 계란물 입힌 식빵을 올려 약불에서 노릇하게 굽습니다.", time: 4 },
            { desc: "뒤집어서 반대쪽도 노릇하게 구워준 후 기호에 따라 시럽이나 설탕을 뿌립니다.", time: 2 }
        ]
    },
    {
        id: "recipe_bacon_cream_pasta",
        name: "베이컨 크림 파스타",
        category: "양식",
        time: 20,
        description: "우유와 치즈를 졸여 만든 고소하고 묵직한 크림 스파게티",
        emoji: "🍝",
        ingredients: ["파스타면", "베이컨", "우유", "마늘", "올리브유"],
        steps: [
            { desc: "파스타 면을 8분간 삶아 건져 둡니다.", time: 8 },
            { desc: "마늘은 편 썰고, 베이컨은 한입 두께로 도톰하게 썰어 놓습니다.", time: 2 },
            { desc: "올리브유를 두른 팬에 편마늘과 베이컨을 볶아 노릇하게 만듭니다.", time: 3 },
            { desc: "우유 1.5컵과 슬라이스 치즈(선택)를 넣고 졸이다가 끓어오르면 파스타 면을 넣어 농도가 꾸덕해질 때까지 졸입니다.", time: 7 }
        ]
    },
    {
        id: "recipe_tomato_bruschetta",
        name: "토마토 바질 부르스케타",
        category: "양식",
        time: 10,
        description: "바삭하게 구운 빵 위에 올리브유에 버무린 상큼한 토마토를 얹은 전채요리",
        emoji: "🥖",
        ingredients: ["식빵", "토마토", "마늘", "올리브유"],
        steps: [
            { desc: "토마토는 씨를 제거하고 잘게 깍둑썰기해 올리브유 1큰술, 소금 한 꼬집과 섞어 둡니다.", time: 3 },
            { desc: "식빵을 먹기 좋은 조각으로 자른 뒤 마늘 단면을 빵 표면에 슥슥 문질러 향을 냅니다.", time: 2 },
            { desc: "팬에 버터나 올리브유를 살짝 두르고 식빵을 노릇하고 바삭하게 구워 냅니다.", time: 3 },
            { desc: "구워진 바삭한 빵 위에 양념한 토마토를 예쁘게 숟가락으로 얹어 마무리합니다.", time: 2 }
        ]
    }
];

// 2. 초기 로드 시 제공될 기본 재료 데이터 (다채로운 매칭을 위해 확장)
const getSeedIngredients = () => {
    const today = new Date();
    
    // 날짜 계산 헬퍼
    const addDays = (days) => {
        const d = new Date(today);
        d.setDate(today.getDate() + days);
        return d.toISOString().split('T')[0];
    };

    return [
        { id: "ing_seed_1", name: "김치", category: "vegetable", expDate: addDays(15), storage: "cold" },
        { id: "ing_seed_2", name: "계란", category: "dairy", expDate: addDays(4), storage: "cold" },
        { id: "ing_seed_3", name: "대파", category: "vegetable", expDate: addDays(2), storage: "cold" },
        { id: "ing_seed_4", name: "라면", category: "grain", expDate: addDays(120), storage: "room" },
        { id: "ing_seed_5", name: "마늘", category: "vegetable", expDate: addDays(1), storage: "cold" },
        { id: "ing_seed_6", name: "식빵", category: "grain", expDate: addDays(-1), storage: "cold" }, // 상한 재료
        { id: "ing_seed_7", name: "즉석밥", category: "grain", expDate: addDays(90), storage: "room" },
        { id: "ing_seed_8", name: "베이컨", category: "meat", expDate: addDays(6), storage: "cold" },
        { id: "ing_seed_9", name: "올리브유", category: "sauce", expDate: addDays(180), storage: "room" },
        { id: "ing_seed_10", name: "양파", category: "vegetable", expDate: addDays(5), storage: "cold" }
    ];
};

// 3. 애플리케이션 상태 관리 객체
const state = {
    ingredients: [],
    customRecipes: [],
    activeTab: "all",
    // 타이머 관련 상태
    timerInterval: null,
    timerRemaining: 0,
    timerTotal: 0,
    activeRecipe: null,
    activeStepIndex: -1
};

// ==========================================
// 4. 초기화 및 로컬 스토리지 데이터 로드
// ==========================================
function initApp() {
    // 로컬 스토리지에서 식재료 로드 또는 시드 데이터 생성
    const savedIngs = localStorage.getItem("fridge_ingredients");
    if (savedIngs) {
        state.ingredients = JSON.parse(savedIngs);
    } else {
        state.ingredients = getSeedIngredients();
        saveIngredientsToStorage();
    }

    // 로컬 스토리지에서 커스텀 레시피 로드
    const savedRecipes = localStorage.getItem("fridge_custom_recipes");
    if (savedRecipes) {
        state.customRecipes = JSON.parse(savedRecipes);
    } else {
        state.customRecipes = [];
    }

    // 오늘 날짜 인풋 기본값으로 내일 날짜 지정
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById("ingExpDate").value = tomorrow.toISOString().split('T')[0];

    // 첫 렌더링
    renderIngredients();
    renderRecipes();
    setupEventListeners();
}

// 스토리지 저장 헬퍼
function saveIngredientsToStorage() {
    localStorage.setItem("fridge_ingredients", JSON.stringify(state.ingredients));
    updateFridgeCount();
}

function saveCustomRecipesToStorage() {
    localStorage.setItem("fridge_custom_recipes", JSON.stringify(state.customRecipes));
}

function updateFridgeCount() {
    document.getElementById("fridgeItemCount").textContent = `${state.ingredients.length}개 재료`;
}

// ==========================================
// 5. 날짜 연산 및 D-Day 계산 알고리즘
// ==========================================
function calculateDDay(expDateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expDate = new Date(expDateStr);
    expDate.setHours(0, 0, 0, 0);

    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return {
            text: `기한지남 (D+${Math.abs(diffDays)})`,
            class: "expired",
            daysLeft: diffDays
        };
    } else if (diffDays === 0) {
        return {
            text: "D-Day",
            class: "urgent",
            daysLeft: 0
        };
    } else if (diffDays <= 2) {
        return {
            text: `D-${diffDays}`,
            class: "urgent",
            daysLeft: diffDays
        };
    } else if (diffDays <= 5) {
        return {
            text: `D-${diffDays}`,
            class: "warning",
            daysLeft: diffDays
        };
    } else {
        return {
            text: `D-${diffDays}`,
            class: "safe",
            daysLeft: diffDays
        };
    }
}

// ==========================================
// 6. 식재료 관련 이벤트 & 렌더링 로직
// ==========================================
function renderIngredients() {
    const shelfGrid = document.getElementById("fridgeShelfGrid");
    const emptyMsg = document.getElementById("emptyFridgeMsg");
    
    const filtered = state.ingredients.filter(item => {
        if (state.activeTab === "all") return true;
        return item.storage === state.activeTab;
    });

    shelfGrid.innerHTML = "";

    if (filtered.length === 0) {
        emptyMsg.style.display = "flex";
        return;
    } else {
        emptyMsg.style.display = "none";
    }

    filtered.sort((a, b) => {
        const ddayA = calculateDDay(a.expDate).daysLeft;
        const ddayB = calculateDDay(b.expDate).daysLeft;
        return ddayA - ddayB;
    });

    filtered.forEach(item => {
        const ddayInfo = calculateDDay(item.expDate);
        const card = document.createElement("div");
        card.className = "ingredient-card";
        
        let categoryKorean = "";
        switch(item.category) {
            case "vegetable": categoryKorean = "채소"; break;
            case "meat": categoryKorean = "육류"; break;
            case "seafood": categoryKorean = "해산물"; break;
            case "dairy": categoryKorean = "유제품"; break;
            case "sauce": categoryKorean = "양념"; break;
            case "grain": categoryKorean = "곡류"; break;
            default: categoryKorean = "기타";
        }

        let storageKorean = "";
        if (item.storage === "cold") storageKorean = "냉장";
        else if (item.storage === "freeze") storageKorean = "냉동";
        else storageKorean = "실온";

        card.innerHTML = `
            <div class="card-top">
                <span class="category-dot cat-${item.category}">${categoryKorean}</span>
                <button class="delete-ing-btn" data-id="${item.id}" title="삭제">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <div class="card-mid">
                <span class="ing-card-name">${escapeHtml(item.name)}</span>
            </div>
            <div class="card-bottom">
                <span class="storage-badge">${storageKorean}</span>
                <span class="dday-badge ${ddayInfo.class}">${ddayInfo.text}</span>
            </div>
        `;

        card.querySelector(".delete-ing-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            deleteIngredient(item.id);
        });

        shelfGrid.appendChild(card);
    });

    lucide.createIcons();
}

function addIngredient(name, category, expDate, storage) {
    if (!name.trim()) {
        alert("재료 이름을 입력해 주세요!");
        return;
    }
    
    const dateObj = new Date(expDate);
    if (isNaN(dateObj.getTime())) {
        alert("올바르지 않은 유통기한 날짜 형식입니다.");
        return;
    }

    const newIng = {
        id: "ing_" + Date.now() + Math.random().toString(36).substr(2, 5),
        name: name.trim(),
        category,
        expDate,
        storage
    };

    state.ingredients.push(newIng);
    saveIngredientsToStorage();
    renderIngredients();
    renderRecipes();
}

function deleteIngredient(id) {
    state.ingredients = state.ingredients.filter(item => item.id !== id);
    saveIngredientsToStorage();
    renderIngredients();
    renderRecipes();
}

// ==========================================
// 7. 레시피 추천 엔진 (핵심 알고리즘)
// ==========================================
function getAllRecipes() {
    return [...DEFAULT_RECIPES, ...state.customRecipes];
}

function renderRecipes() {
    const recipeGrid = document.getElementById("recipeGrid");
    const searchVal = document.getElementById("recipeSearchInput").value.toLowerCase();
    const sortVal = document.getElementById("recipeSortSelect").value;

    const allRecipes = getAllRecipes();
    const evaluatedRecipes = [];
    const userIngNames = state.ingredients.map(i => i.name.trim().toLowerCase());

    allRecipes.forEach(recipe => {
        let matchedCount = 0;
        const matchedList = [];
        const missingList = [];

        recipe.ingredients.forEach(reqIng => {
            const reqIngClean = reqIng.trim().toLowerCase();
            const isMatched = userIngNames.some(userIng => 
                userIng.includes(reqIngClean) || reqIngClean.includes(userIng)
            );

            if (isMatched) {
                matchedCount++;
                matchedList.push(reqIng);
            } else {
                missingList.push(reqIng);
            }
        });

        const matchRate = recipe.ingredients.length > 0
            ? (matchedCount / recipe.ingredients.length) * 100
            : 0;

        let parmBonus = 0;
        let hasExpiringIngredient = false;

        recipe.ingredients.forEach(reqIng => {
            const reqIngClean = reqIng.trim().toLowerCase();
            const matchedUserIngs = state.ingredients.filter(i => 
                i.name.trim().toLowerCase().includes(reqIngClean) || reqIngClean.includes(i.name.trim().toLowerCase())
            );

            matchedUserIngs.forEach(userIng => {
                const dday = calculateDDay(userIng.expDate).daysLeft;
                if (dday <= 3) {
                    parmBonus += 30;
                    hasExpiringIngredient = true;
                }
            });
        });

        evaluatedRecipes.push({
            ...recipe,
            matchRate,
            matchedIngredients: matchedList,
            missingIngredients: missingList,
            parmBonusScore: matchRate + parmBonus,
            hasExpiringIngredient
        });
    });

    let filteredRecipes = evaluatedRecipes.filter(r => {
        const nameMatch = r.name.toLowerCase().includes(searchVal);
        const ingMatch = r.ingredients.some(ing => ing.toLowerCase().includes(searchVal));
        const categoryMatch = r.category.toLowerCase().includes(searchVal);
        return nameMatch || ingMatch || categoryMatch;
    });

    if (sortVal === "match") {
        filteredRecipes.sort((a, b) => {
            if (b.matchRate !== a.matchRate) return b.matchRate - a.matchRate;
            return a.time - b.time;
        });
    } else if (sortVal === "parm") {
        filteredRecipes.sort((a, b) => {
            if (b.parmBonusScore !== a.parmBonusScore) return b.parmBonusScore - a.parmBonusScore;
            return b.matchRate - a.matchRate;
        });
    } else if (sortVal === "time") {
        filteredRecipes.sort((a, b) => {
            if (a.time !== b.time) return a.time - b.time;
            return b.matchRate - a.matchRate;
        });
    }

    recipeGrid.innerHTML = "";

    if (filteredRecipes.length === 0) {
        recipeGrid.innerHTML = `
            <div class="empty-state">
                <i data-lucide="compass" class="empty-icon"></i>
                <p>검색 조건에 맞는 레시피가 없습니다.<br>새로운 요리 레시피를 직접 등록해 보세요!</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    filteredRecipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        
        let matchClass = "";
        if (recipe.matchRate === 100) matchClass = "high";
        else if (recipe.matchRate >= 40) matchClass = "mid";

        const haveText = recipe.matchedIngredients.length > 0 
            ? `<span class="ing-have">${recipe.matchedIngredients.join(", ")}</span>` 
            : "없음";
        const missingText = recipe.missingIngredients.length > 0 
            ? `<span class="ing-missing">${recipe.missingIngredients.join(", ")}</span>` 
            : "없음(완벽!)";

        const parmBadge = (sortVal === "parm" && recipe.hasExpiringIngredient)
            ? `<div class="parm-indicator">파먹기 추천! 🔥</div>`
            : "";

        card.innerHTML = `
            ${parmBadge}
            <div class="recipe-img-placeholder">${recipe.emoji || "🍽️"}</div>
            <div class="recipe-info">
                <div class="recipe-card-header">
                    <h3>${escapeHtml(recipe.name)}</h3>
                    <span class="matching-score-badge ${matchClass}">매칭 ${Math.round(recipe.matchRate)}%</span>
                </div>
                <p class="recipe-card-desc">${escapeHtml(recipe.description)}</p>
                <div class="recipe-ingredients-preview">
                    <div><span class="ing-preview-label">보유:</span> ${haveText}</div>
                    <div><span class="ing-preview-label">부족:</span> ${missingText}</div>
                </div>
                <div class="recipe-card-footer">
                    <div class="recipe-meta-tags">
                        <span class="recipe-category-tag">${recipe.category}</span>
                        <span><i data-lucide="clock" style="width:12px;height:12px;"></i> ${recipe.time}분</span>
                    </div>
                </div>
            </div>
        `;

        card.addEventListener("click", () => {
            openCookingModal(recipe);
        });

        recipeGrid.appendChild(card);
    });

    lucide.createIcons();
}

// ==========================================
// 8. 모달창 제어 및 인터랙티브 요리 모드
// ==========================================
function openCookingModal(recipe) {
    state.activeRecipe = recipe;
    
    document.getElementById("guideTitle").textContent = recipe.name;
    document.getElementById("guideCategory").textContent = recipe.category;
    document.getElementById("guideTime").innerHTML = `<i data-lucide="clock"></i> ${recipe.time}분`;
    document.getElementById("guideDescription").textContent = recipe.description;

    const ingListEl = document.getElementById("guideIngredientsList");
    ingListEl.innerHTML = "";

    const userIngNames = state.ingredients.map(i => i.name.trim().toLowerCase());

    recipe.ingredients.forEach(reqIng => {
        const reqIngClean = reqIng.trim().toLowerCase();
        const isMatched = userIngNames.some(userIng => 
            userIng.includes(reqIngClean) || reqIngClean.includes(userIng)
        );

        const itemEl = document.createElement("div");
        itemEl.className = `guide-ing-item ${isMatched ? "have" : "missing"}`;
        itemEl.textContent = reqIng;
        ingListEl.appendChild(itemEl);
    });

    const stepsListEl = document.getElementById("guideStepsList");
    stepsListEl.innerHTML = "";

    recipe.steps.forEach((step, idx) => {
        const card = document.createElement("div");
        card.className = "guide-step-card";
        
        let timerButtonHtml = "";
        if (step.time) {
            timerButtonHtml = `
                <button class="step-timer-launch-btn" data-time="${step.time}" data-step-idx="${idx}">
                    <i data-lucide="alarm-clock"></i> 타이머 시작 (${step.time}분)
                </button>
            `;
        }

        card.innerHTML = `
            <div class="step-badge">${idx + 1}</div>
            <div class="step-card-text">
                <p>${escapeHtml(step.desc)}</p>
                ${timerButtonHtml}
            </div>
        `;

        if (step.time) {
            card.querySelector(".step-timer-launch-btn").addEventListener("click", (e) => {
                const minutes = parseInt(e.currentTarget.getAttribute("data-time"));
                const stepIdx = parseInt(e.currentTarget.getAttribute("data-step-idx"));
                startTimer(minutes, stepIdx);
            });
        }

        stepsListEl.appendChild(card);
    });

    const finishBtn = document.getElementById("finishCookingBtn");
    if (recipe.matchRate === 0) {
        finishBtn.textContent = "요리 완료! (보유 재료 없음)";
    } else {
        finishBtn.textContent = "요리 완료! 냉장고 재료 소모하기";
    }

    document.getElementById("cookingGuideModal").classList.add("active");
    lucide.createIcons();
}

function closeCookingModalFunc() {
    document.getElementById("cookingGuideModal").classList.remove("active");
    stopTimerInterval();
    document.getElementById("timerWidget").style.display = "none";
    state.activeRecipe = null;
    state.activeStepIndex = -1;
}

function finishCookingAndConsume() {
    if (!state.activeRecipe) return;

    const recipe = state.activeRecipe;
    const consumedIds = [];

    recipe.ingredients.forEach(reqIng => {
        const reqIngClean = reqIng.trim().toLowerCase();
        const matchedItems = state.ingredients
            .filter(i => (i.name.trim().toLowerCase().includes(reqIngClean) || reqIngClean.includes(i.name.trim().toLowerCase())) && !consumedIds.includes(i.id))
            .sort((a, b) => new Date(a.expDate) - new Date(b.expDate));

        if (matchedItems.length > 0) {
            consumedIds.push(matchedItems[0].id);
        }
    });

    if (consumedIds.length > 0) {
        state.ingredients = state.ingredients.filter(item => !consumedIds.includes(item.id));
        saveIngredientsToStorage();
        renderIngredients();
        renderRecipes();
        alert(`요리 완료! 레시피에 사용된 냉장고 식재료 ${consumedIds.length}개가 소모되었습니다. 🎉`);
    } else {
        alert("요리 완료! (소모할 냉장고 식재료가 없었습니다.)");
    }

    closeCookingModalFunc();
}

// ==========================================
// 9. 인터랙티브 요리 타이머 엔진
// ==========================================
function startTimer(minutes, stepIdx) {
    stopTimerInterval();

    state.activeStepIndex = stepIdx;
    state.timerTotal = minutes * 60;
    state.timerRemaining = state.timerTotal;

    const timerWidget = document.getElementById("timerWidget");
    timerWidget.style.display = "flex";
    
    document.getElementById("timerStepTitle").textContent = `${stepIdx + 1}단계 요리 타이머`;
    updateTimerDisplay();

    const playPauseBtn = document.getElementById("timerStartPauseBtn");
    playPauseBtn.innerHTML = `<i data-lucide="pause"></i> 일시정지`;
    
    runTimerInterval();
    lucide.createIcons();
}

function runTimerInterval() {
    state.timerInterval = setInterval(() => {
        state.timerRemaining--;
        updateTimerDisplay();

        if (state.timerRemaining <= 0) {
            stopTimerInterval();
            playBeepSound();
            alert("⏰ 설정된 요리 타이머가 종료되었습니다!");
            document.getElementById("timerWidget").style.display = "none";
        }
    }, 1000);
}

function stopTimerInterval() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

function updateTimerDisplay() {
    const mins = Math.floor(state.timerRemaining / 60);
    const secs = state.timerRemaining % 60;

    document.getElementById("timerMinutes").textContent = String(mins).padStart(2, '0');
    document.getElementById("timerSeconds").textContent = String(secs).padStart(2, '0');

    const progressPercent = (state.timerRemaining / state.timerTotal) * 100;
    document.getElementById("timerProgressBar").style.width = `${progressPercent}%`;
}

function playBeepSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        
        const playTone = (time, freq, duration) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, time);
            
            gain.gain.setValueAtTime(0.3, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + duration - 0.05);
            
            osc.start(time);
            osc.stop(time + duration);
        };

        const now = ctx.currentTime;
        playTone(now, 880, 0.3);
        playTone(now + 0.4, 880, 0.3);
        playTone(now + 0.8, 1200, 0.5);
    } catch(e) {
        console.warn("웹 오디오 경고음 출력 실패:", e);
    }
}

// ==========================================
// 10. 커스텀 레시피 메이커 로직
// ==========================================
function openRecipeMaker() {
    document.getElementById("customRecipeForm").reset();
    const container = document.getElementById("makerStepsContainer");
    container.innerHTML = `
        <div class="maker-step-row">
            <span class="step-num">1</span>
            <input type="text" class="maker-step-desc" placeholder="예: 양파와 대파를 먹기 좋게 썹니다." required>
            <input type="number" class="maker-step-time" placeholder="타이머 (분)">
        </div>
    `;
    document.getElementById("recipeMakerModal").classList.add("active");
}

function closeRecipeMaker() {
    document.getElementById("recipeMakerModal").classList.remove("active");
}

function addMakerStep() {
    const container = document.getElementById("makerStepsContainer");
    const stepCount = container.children.length + 1;

    const row = document.createElement("div");
    row.className = "maker-step-row";
    row.innerHTML = `
        <span class="step-num">${stepCount}</span>
        <input type="text" class="maker-step-desc" placeholder="다음 조리 단계를 입력하세요." required>
        <input type="number" class="maker-step-time" placeholder="타이머 (분)">
    `;
    container.appendChild(row);
}

function saveCustomRecipe(e) {
    e.preventDefault();

    const title = document.getElementById("customRecipeTitle").value.trim();
    const category = document.getElementById("customRecipeCategory").value;
    const time = parseInt(document.getElementById("customRecipeTime").value);
    const desc = document.getElementById("customRecipeDesc").value.trim();
    const rawIngs = document.getElementById("customRecipeIngredients").value;

    const ingredients = rawIngs.split(",")
        .map(ing => ing.trim())
        .filter(ing => ing.length > 0);

    if (ingredients.length === 0) {
        alert("최소 한 개 이상의 재료를 쉼표(,)로 구분해 입력해 주세요.");
        return;
    }

    const stepRows = document.querySelectorAll("#makerStepsContainer .maker-step-row");
    const steps = [];
    
    stepRows.forEach(row => {
        const descVal = row.querySelector(".maker-step-desc").value.trim();
        const timeVal = row.querySelector(".maker-step-time").value;
        steps.push({
            desc: descVal,
            time: timeVal ? parseInt(timeVal) : null
        });
    });

    const newRecipe = {
        id: "recipe_custom_" + Date.now(),
        name: title,
        category,
        time,
        description: desc,
        emoji: "👨‍🍳",
        ingredients,
        steps
    };

    state.customRecipes.push(newRecipe);
    saveCustomRecipesToStorage();
    renderRecipes();
    closeRecipeMaker();
    alert(`나만의 레시피 [${title}]이(가) 등록되었습니다!`);
}

// ==========================================
// 11. 데이터 백업 / 복원 (파일 입출력)
// ==========================================
function exportData() {
    const dataStr = JSON.stringify({
        ingredients: state.ingredients,
        customRecipes: state.customRecipes
    }, null, 2);

    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'fridgemaster_backup.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const data = JSON.parse(evt.target.result);
            
            if (data.ingredients && Array.isArray(data.ingredients)) {
                state.ingredients = data.ingredients;
                saveIngredientsToStorage();
            }
            if (data.customRecipes && Array.isArray(data.customRecipes)) {
                state.customRecipes = data.customRecipes;
                saveCustomRecipesToStorage();
            }

            renderIngredients();
            renderRecipes();
            alert("냉장고 데이터 및 레시피가 완벽하게 복원되었습니다! 📥");
        } catch(err) {
            alert("유효하지 않은 백업 파일 형식이거나 파일이 손상되었습니다.");
        }
    };
    reader.readAsText(file);
    e.target.value = "";
}

function resetApp() {
    if (confirm("정말 스마트 냉장고를 초기화하시겠습니까?\n모든 보관 식재료와 커스텀 레시피가 삭제되고 시드 데이터로 복구됩니다.")) {
        localStorage.clear();
        state.ingredients = getSeedIngredients();
        state.customRecipes = [];
        saveIngredientsToStorage();
        saveCustomRecipesToStorage();
        renderIngredients();
        renderRecipes();
        alert("냉장고가 초기화되었습니다.");
    }
}

// ==========================================
// 12. 이벤트 리스너 바인딩
// ==========================================
function setupEventListeners() {
    const themeBtn = document.getElementById("themeToggleBtn");
    themeBtn.addEventListener("click", () => {
        const body = document.body;
        const sunIcon = themeBtn.querySelector(".theme-icon-sun");
        const moonIcon = themeBtn.querySelector(".theme-icon-moon");

        if (body.classList.contains("light-mode")) {
            body.classList.replace("light-mode", "dark-mode");
            sunIcon.style.display = "none";
            moonIcon.style.display = "block";
        } else {
            body.classList.replace("dark-mode", "light-mode");
            sunIcon.style.display = "block";
            moonIcon.style.display = "none";
        }
    });

    document.getElementById("exportDataBtn").addEventListener("click", exportData);
    document.getElementById("importDataFile").addEventListener("change", importData);
    document.getElementById("resetAppBtn").addEventListener("click", resetApp);

    document.getElementById("apiSettingsBtn").addEventListener("click", () => {
        const currentKey = localStorage.getItem("gemini_api_key") || "";
        const maskKey = currentKey ? currentKey.substring(0, 6) + "..." + currentKey.substring(currentKey.length - 4) : "없음";
        const msg = currentKey 
            ? `현재 API 키가 등록되어 있습니다 (값: ${maskKey}).\n새로운 API 키를 입력하시거나, 키를 삭제하려면 비워두고 확인을 누르세요:`
            : "구글 Gemini API 키를 입력해 주세요 (안전하게 브라우저 로컬 스토리지에만 저장됩니다):";
        const keyInput = prompt(msg, currentKey);
        if (keyInput === null) return;
        if (keyInput.trim() === "") {
            localStorage.removeItem("gemini_api_key");
            alert("저장된 API 키가 삭제되었습니다.");
        } else {
            localStorage.setItem("gemini_api_key", keyInput.trim());
            alert("API 키가 성공적으로 저장되었습니다!");
        }
    });

    document.getElementById("addIngredientForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("ingName").value;
        const category = document.getElementById("ingCategory").value;
        const expDate = document.getElementById("ingExpDate").value;
        const storage = document.getElementById("ingStorage").value;

        addIngredient(name, category, expDate, storage);
        document.getElementById("ingName").value = "";
    });

    const tabBtns = document.querySelectorAll(".fridge-tabs .tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            tabBtns.forEach(b => b.classList.remove("active"));
            e.currentTarget.classList.add("active");
            state.activeTab = e.currentTarget.getAttribute("data-tab");
            renderIngredients();
        });
    });

    document.getElementById("recipeSearchInput").addEventListener("input", renderRecipes);
    document.getElementById("recipeSortSelect").addEventListener("change", renderRecipes);
    document.getElementById("closeCookingModal").addEventListener("click", closeCookingModalFunc);
    document.getElementById("finishCookingBtn").addEventListener("click", finishCookingAndConsume);

    document.getElementById("closeTimerBtn").addEventListener("click", () => {
        stopTimerInterval();
        document.getElementById("timerWidget").style.display = "none";
    });

    document.getElementById("timerStartPauseBtn").addEventListener("click", (e) => {
        const btn = e.currentTarget;
        if (state.timerInterval) {
            stopTimerInterval();
            btn.innerHTML = `<i data-lucide="play"></i> 계속`;
        } else {
            runTimerInterval();
            btn.innerHTML = `<i data-lucide="pause"></i> 일시정지`;
        }
        lucide.createIcons();
    });

    document.getElementById("timerResetBtn").addEventListener("click", () => {
        state.timerRemaining = state.timerTotal;
        updateTimerDisplay();
    });

    document.getElementById("openRecipeMakerBtn").addEventListener("click", openRecipeMaker);
    document.getElementById("closeRecipeMakerModal").addEventListener("click", closeRecipeMaker);
    document.getElementById("addMakerStepBtn").addEventListener("click", addMakerStep);
    document.getElementById("customRecipeForm").addEventListener("submit", saveCustomRecipe);

    window.addEventListener("click", (e) => {
        const cookingModal = document.getElementById("cookingGuideModal");
        const makerModal = document.getElementById("recipeMakerModal");
        if (e.target === cookingModal) {
            closeCookingModalFunc();
        }
        if (e.target === makerModal) {
            closeRecipeMaker();
        }
    });
}

function escapeHtml(str) {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

window.onload = initApp;

// ==========================================
// [추가] 구글 Gemini API 연동 엔진
// ==========================================
async function fetchGeminiRecipeSuggestion(userIngredients) {
    let GEMINI_API_KEY = localStorage.getItem("gemini_api_key");
    
    // API 키가 없으면 사용자에게 입력을 유도
    if (!GEMINI_API_KEY) {
        const keyInput = prompt("✨ AI 추천 서비스를 이용하려면 구글 Gemini API 키가 필요합니다.\n입력하신 API 키는 다른 사람에게 절대 공유되지 않으며, 브라우저 로컬 저장소(localStorage)에만 안전하게 보존됩니다.\n\nAPI 키를 입력해 주세요:");
        if (!keyInput || !keyInput.trim()) {
            alert("API 키가 입력되지 않아 AI 추천 기능을 취소합니다.");
            return null;
        }
        GEMINI_API_KEY = keyInput.trim();
        localStorage.setItem("gemini_api_key", GEMINI_API_KEY);
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

    const promptText = `
    당신은 최고의 요리사입니다. 유저가 가진 냉장고 재료 리스트를 바탕으로 온라인상의 다양한 레시피를 참고하여 만들 수 있는 맛있는 요리를 딱 1개만 추천해 주세요.
    반드시 아래의 JSON 양식으로만 답변해야 하며, 다른 부연 설명이나 마크다운 지정어(\`\`\`json 같은 것)는 절대 포함하지 마세요.

    [유저 재료 리스트]: ${userIngredients.join(", ")}

    [반드시 지켜야 할 JSON 출력 양식]:
    {
        "id": "recipe_gemini_${Date.now()}",
        "name": "요리 이름",
        "category": "한식, 일식, 중식, 양식 중 선택",
        "time": 15,
        "description": "요리에 대한 짧은 한 줄 설명",
        "emoji": "🍳",
        "ingredients": ["필요한", "재료", "리스트"],
        "steps": [
            {"desc": "1단계 조리 설명", "time": 3},
            {"desc": "2단계 조리 설명", "time": 5}
        ]
    }
    `;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });

        const data = await response.json();
        
        // 구글 서버 에러 체크
        if (data.error) {
            if (data.error.message.includes("API key") || data.error.status === "INVALID_ARGUMENT") {
                alert(`구글 API 키 인증 실패: ${data.error.message}\n\n저장된 API 키가 유효하지 않아 자동 삭제됩니다. 상단 'AI 키' 버튼을 누르시거나 다음 요리 추천 클릭 시 다시 입력해 주세요.`);
                localStorage.removeItem("gemini_api_key");
            } else {
                alert(`구글 API 에러 발생: ${data.error.message}`);
            }
            return null;
        }

        if (!data.candidates || data.candidates.length === 0) {
            alert("구글 AI가 답변을 생성하지 못했습니다. 다시 시도해 주세요.");
            return null;
        }

        const responseText = data.candidates[0].content.parts[0].text.trim();
        
        // JSON 문자열 다듬기 (간혹 마크다운 블록이 붙어 나올 때 대비)
        let cleanText = responseText;
        if (cleanText.startsWith("```")) {
            cleanText = cleanText.replace(/^```json/, "").replace(/^```/, "").replace(/```$/, "").trim();
        }
        
        const aiRecipe = JSON.parse(cleanText);
        return aiRecipe;
    } catch (error) {
        console.error("Gemini API 호출 실패:", error);
        alert("네트워크 연결 실패 또는 AI 서버에 접속할 수 없습니다.");
        return null;
    }
}

// AI 버튼 작동 로직
window.addEventListener("load", () => {
    const aiBtn = document.getElementById("aiRecommendBtn");
    if (aiBtn) {
        aiBtn.addEventListener("click", async () => {
            const userIngNames = state.ingredients.map(i => i.name.trim());
            
            if (userIngNames.length === 0) {
                alert("냉장고에 재료가 없습니다. 재료를 먼저 등록해 주세요!");
                return;
            }

            aiBtn.textContent = "AI가 온라인 레시피 탐색 중... 👨‍🍳";
            aiBtn.disabled = true;

            const newAiRecipe = await fetchGeminiRecipeSuggestion(userIngNames);

            if (newAiRecipe) {
                state.customRecipes.unshift(newAiRecipe); 
                saveCustomRecipesToStorage();
                renderRecipes(); 
                alert(`AI가 온라인 데이터를 바탕으로 [${newAiRecipe.name}] 레시피를 추천했습니다!`);
            }

            aiBtn.textContent = "✨ AI 냉장고 파먹기 추천";
            aiBtn.disabled = false;
        });
    }
});