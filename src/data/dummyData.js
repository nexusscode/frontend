
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

    export const users = 
        {
            id: 1000, // 고유
            email:`wwww@ddd.com`,
            password: `aaaaaaa`, 
            name: "김민지", 
            role: `USER`, 
            created_at: "2025/04/02"
        }
    ;

    export const job_applications =  // 하나만 넘겨받는다고 가정
        { 
            id: 10000, // 고유
            user_id: users.id, // 한명만 있다고 가정
            company_name: `네이버`, 
            job_title: "김민지", 
            status: `IN_PROGRESS`,  // enum
            saramin_job_id: "abc",
            experience_level: `경력/무관`,
            required_education_level: `대졸`,
            expiration_date : "2025/05/22/12:02:02",
            job_code: `교육컨텐츠개발`,
            job_type: `정규직`,
            created_at: "2025/04/02",
            modified_at: "2025/05/20",
        }
    ;

    export const resumes = {
            id: 100,
            application_id: job_applications.id,
            title: `실행력있는 개발자`,
            resumeItems: [],
            created_at: "2025/05/18",
            modified_at: "2025/05/20", 
    };

    export const resume_items = [
        {
            id: 1,
            resume_id: resumes.id,
            question: "입사하고 싶은 이유와 준비 과정을 구체적으로 작성해주세요.",
            answer: "a",
            seq: 1,
        },
        {
            id: 2,
            resume_id: resumes.id,
            question: "본인이 끝까지 파고들어 본 가장 의미있었던 개발 경험 또는 개발 활동에 대해 얘기해 주세요. 그 개발 경험 또는 개발 활동을 통해 배운 점이 무엇인지, 본인의 '어떤 부분이 성장'했는지에 대해 작성해 주세요.",
            answer: "a",
            seq: 2,
        },
        {
            id: 3,
            resume_id: resumes.id,
            question: "입사하고 싶은 이유와 준비 과정을 통상적으로 작성해주세요.",
            answer: "a",
            seq: 3,
        },
        {
            id: 4,
            resume_id: resumes.id,
            question: "입사하고 싶은 이유와 준비 과정을 역설적으로 작성해주세요.",
            answer: "a",
            seq: 4,
        },
    ];

    export const resume_item_feedbacks = [
        {
            id: 11,
            resume_item_id : resume_items.id,
            feedback_text : `자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 `,
            created_at:"2025/05/18",
        },
        {
            id: 22,
            resume_item_id : resume_items.id,
            feedback_text : `자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 `,
            created_at:"2025/05/18",
        },
        {
            id: 33,
            resume_item_id : resume_items.id,
            feedback_text : `자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 `,
            created_at:"2025/05/18",
        },
        {
            id: 44,
            resume_item_id : resume_items.id,
            feedback_text : `자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 자기소개서 피드백 `,
            created_at:"2025/05/18",
        },
    ]