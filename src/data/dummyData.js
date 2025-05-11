
    export const allItems = [
        { id: 100, company: "네이버", position: "백엔드 개발자", career: "신입", createdAt: "2025/05/11", stateCoverletter: 0, stateInterview: 0 },
        { id: 101, company: "카카오", position: "백엔드 개발자", career: "경력", createdAt: "2025/05/11", stateCoverletter: 1, stateInterview: 2 },
        { id: 102, company: "네이버", position: "프론트 개발자", career: "신입", createdAt: "2025/05/11", stateCoverletter: 2, stateInterview: 3 },
        ...Array.from({ length: 70 }, (_, i) => ({ 
            id: i,
            company: `(주)리더스시스템즈 ${i + 1}`,
            position: "Full Stack 개발자",
            career: "경력/무관",
            createdAt: "2025/04/02",
            stateCoverletter: 0,
            stateInterview: 0,
    }))];
    