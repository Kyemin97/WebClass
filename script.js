document.addEventListener("DOMContentLoaded", function() {
    // 개강일과 현재 날짜를 기반으로 주차 계산
    const startDate = new Date("2026-09-01"); 
    const today = new Date();
    
    // 개강일로부터 며칠이 지났는지 계산
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // 현재 주차 계산
    let currentWeek = Math.floor(diffDays / 7) + 1;
    if (currentWeek < 1) currentWeek = 1;
    if (currentWeek > 15) currentWeek = 15;

    const weeksList = document.getElementById("weeksList");

    for (let i = 1; i <= 15; i++) {
        const li = document.createElement("li");
        const docNum = String(i).padStart(2, '0');

        if (i <= currentWeek) {
            // 1. 현재 주차가 도달한 경우 (완료/진행중 상태)
            li.className = "completed";
            
            // a 태그 요소 생성
            const aTag = document.createElement("a");
            aTag.href = `doc${docNum}.html`;
            aTag.textContent = `${i}주차`;
            
            // 추가
            li.appendChild(aTag);
        } else {
            // 2. 미래의 주차인 경우 (예정 상태 - 링크 없음)
            li.className = "planned";
            li.textContent = `${i}주차(예정)`;
        }

        weeksList.appendChild(li);
    }

    // [A-02] 위로 가기 버튼 및 [A-06] 스크롤 진행률 표시바 통합 로직
    const topBtn = document.getElementById("topBtn");
    const myBar = document.getElementById("myBar"); // 진행률 표시바 요소 가져오기

    // 스크롤 이벤트 감지 리스너 등록
    window.addEventListener("scroll", function() {
        // 1. 위로 가기 버튼 로직
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }

        // 2. 스크롤 진행률 표시 로직
        // 현재 스크롤한 높이
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        // 전체 문서의 스크롤 가능한 높이
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        // 퍼센트 계산
        const scrolled = (winScroll / height) * 100;
        // 바의 너비에 적용
        if (myBar) {
            myBar.style.width = scrolled + "%";
        }
    });

    // 버튼 클릭 시 최상단으로 부드럽게 이동
    topBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // [A-03] 메시지 폼 전송 이벤트
    const msgForm = document.getElementById("msgForm");
    if (msgForm) {
        msgForm.addEventListener("submit", function(event) {
            // 1. 폼의 기본 동작(서버로 전송하며 페이지 새로고침) 차단
            event.preventDefault(); 
            
            // 2. 입력된 이름 가져오기
            const visitorName = document.getElementById("visitor-name").value;
            
            // 3. 알림창 띄우기 (프론트엔드 동작 증명)
            alert(`감사합니다, ${visitorName}님!\n메시지가 성공적으로 전송되었습니다.\n(※ 현재는 프론트엔드 UI만 제공합니다.)`);
            
            // 4. 전송 완료 후 폼 입력칸 깨끗하게 초기화
            msgForm.reset(); 
        });
    }

    // [A-04] 다크 모드 토글 로직
    const themeToggle = document.getElementById("themeToggle");
    
    themeToggle.addEventListener("click", function() {
        // body 태그에 dark-mode 클래스를 넣었다 뺐다 함
        document.body.classList.toggle("dark-mode");
        
        // 현재 다크 모드인지 확인하여 버튼 아이콘 변경
        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️";
        } else {
            themeToggle.textContent = "🌙";
        }
    });
});