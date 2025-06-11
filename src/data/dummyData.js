
    
export const recruits = [ // 사람인 api로 받아오는 공고들
    ...Array.from({ length: 7 }, (_, i) => ({ 
        id: `saramin${i}`,
        company_name: `사람인 ${i}`,
        position: "신입 백엔드 개발자", 
        experience_level: "신입", // 경력
        required_education_level: "4년제 졸업", // 학력
        created_at: "2025/05/10", // 공고 등록일 -> 수정 필요
        end_date: "2025/04/03", // 공고 마감일 -> 수정 필요
        salary: "5,340만원", // 연봉
        location: "서울시 강남구", // 위치
        title: "풀스택 개발자 공채 모집", // 공고 제목
        job_type: "정규직", // 근무형태명, 직업 형태
        job_code: "인터넷 교육, 교육기획, 교육컨설턴트", // 직업 코드(태그)

}))];

export const users = [ // 사용자
    ...Array.from({ length: 3 }, (_, i) => ({ 
        id: `user${i}`,
        email: `user${i}@gmail.com`,
        password: "qwer1234",
        name: `김민지${i}`,
        role: "user",
        created_at: "2025/05/10",
}))];

export const resumes = [ // 자소서
    ...Array.from({ length: 7 }, (_, i) => ({ 
        id: `resume${i}`,
        application_id: 100, // 일단 임시로 네이버/백엔드 지정해둠 -> 수정 필요
        title: `실행력있는 개발자${i}`, 
        resumeItems: "", 
        created_at: "2025/05/18", 
        modified_at: "2025/05/20",
}))];

export const interview_sessions = [ // 면접 세션(1회 면접 흐름)
    ...Array.from({ length: 10 }, (_, i) => ({ 
        id: `interviewSession${i}`,
        application_id: 100, // 일단 임시로 네이버/백엔드 지정해둠 -> 수정 필요
        title: `모의면접 ${i}회차`, 
        started_at: "2025/05/20", 
        ended_at: "2025/05/21", // 면접 종료 시간
        interview_type: "", // 면접 종류
}))];

export const interview_questions = [ // 면접 질문
    ...Array.from({ length: 6 }, (_, i) => ({ 
        id: `interviewQuestion${i}`,
        session_id: "interviewSession0", // 임시로 첫번째 면접 세션으로 지정해둠 -> 수정 필요
        question_text: "개발 중에 어려운 문제가 생겼을 때, 어떻게 해결했나요?",
        tts_url: "", // TTS 음성 파일 경로
        intent_text: `${i+1}. 문제해결능력을 보기 위해서`, // 질문 의도
        order: "", // 질문 순서
}))];

export const interview_answers = [ // 사용자 답변
    ...Array.from({ length: 10 }, (_, i) => ({ 
        id: `answer${i}`,
        question_id: "interviewQuestion0", // 임시로 첫번째 질문으로 지정해둠 -> 수정 필요
        user_id: "user0",
        audio_url: "", // 음성 파일 경로
        transcript: "사용자의 답변입니다. 사용자의 답변입니다. 사용자의 답변입니다. 사용자의 답변입니다.", // 텍스트 결과
        created_at: `${i*10}`, // 응답 시간 -> 수정 필요
}))];

export const answer_feedbacks = [ // 면접 답변 피드백


];

export const interview_summary = [ // 면접 요약
    ...Array.from({ length: 3 }, (_, i) => ({ 
        id: `review${i}`,
        session_id: `interviewSession${i}`, // 임시로 첫번째 면접 세션으로 지정해둠 -> 수정 필요
        user_id: `user${i}`,
        summary: "지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다. 자신의 경험을 바탕으로 진솔하게 답변하려는 노력이 느껴졌습니다. 다만 일부 표현에서 반복 사용되는 어휘가 있어 전달력에 아쉬움이 있었습니다. 또한 문장 구성에서 주어와 서술어의 연결이 다소 어색한 부분이 관찰되었습니다. 표현력과 논리적인 구성력을 보완하신다면 더욱 설득력 있는 커뮤니케이션이 가능할 것으로 기대됩니다.", // 면접에 대한 전반적인 요약
        created_at: "", 
}))];
export const resumeItems = [
        {
            resumeItemId: 11,
            resumeId: 1,
            question: "학습 또는 프로젝트 경험을 한다고 가정을 하면 리드하는 사람이 없을 때 리더의 부재로 의사결정이 어렵고 방향성이 모호해지는 상황이라면 어떻게 행동할 것입니까?(300자 이상)",
            answer: "우선 최대한 소통의 기회를 많이 만드려고 노력할 것 같습니다. 결국 팀프로젝트에 리더의 존재도 중요하지만 팀원 간의 소통을 통해 공통된 합의에 의한 종합적인 의사결정이 이루어지지 않으면 누가 리더를 맡는 지에 상관없이 방향 설정이 힘들 것 입니다. 그러다 보면 주로 먼저 결정 의사를 제시하는 팀원이 리더 격의 역할을 맡는 상황이 가장 이상적이겠지만 여러 아이디어가 제시됐음에도 아이디어 선정에 팀원 간 갈등이 생기거나 팀원들의 의사 표출이 소극적인 등의 상황이 와서 결정이 쉽사리 나지 않는다면 비밀 투표 방식을 어떻게든 활용 할 것 같습니다. 보통 의사 표현이 소극적인 경우는 결정을 못 내리는 것보단 다른 팀원과의 대립을 원치 않은 경우가 대부분 이기에 간접적으로라도 모든 팀원의 의견을 동일하게 얻는 것이 중요하다고 생각합니다.",
            aiCount: 0,
        },
        {
            resumeItemId: 22,
            resumeId: 1,
            question: "지금까지 프로그래밍 공부를 어떻게 했고, 과정에 참여해서는 어떻게 공부를 할 계획인지 알려주세요.(300자 이상)",
            answer: "지금까지는 대학교 과제나 자격증 시험 등을 통해서 처음 프로그래밍을 접했고 티스토리, github 같은 개인 사이트나 유튜브를 통한 지식 습득의 기회만 있었습니다. 웹이 발전하면서 모두 쉽게 접할 수 있던 것들이지만  동시에 개발자에겐 지식 못지않게 커뮤니케이팅능력도 매우 중요함을 배웠습니다. 하지만 대학교에서 했던 프로젝트들은 코딩이 메인인 과가 아니었기에 개인프로젝트가 대부분이었고 나머지 공부도 충분히 혼자서 할 수 있었습니다. 이전까지는 기회가 없었지만 제가 배운 지식들을 제대로 이해했는지 또는 개발 과정에서의 방향을 제대로 잡고 있는지에 대해서 멘토링 과정을 통한 검증을 받고 싶습니다. 또한, 결국 서로의 공통적인 최종 목적은 취직이겠지만 이전까지는 겪어보지 못했던 다른 개발 학습자분들과의 프로젝트 협업 경험을 통해 서로가 한 층 더 성장 할 수 있는 계기가 되었으면 합니다. ",
            aiCount: 0,
        },
        {
            resumeItemId: 33,
            resumeId: 1,
            question: "풀스택 분야를 선택한 동기 및 앞으로 어떤 개발자가 되고 싶은지 작성해 주세요.",
            answer: "처음 개발자를 진로로 잡았을 때 관련 정보들을 찾아보면서 본 현직 종사자분들의 인터뷰에서 거의 대부분 공통적으로 말씀하시는, 빠르게 변화하고 그에 맞춰 끊임없이 배우고 배우고 공부해야 오랫동안 일하고 살아남을 수 있다는 점에 주목했습니다. 본 과정에서 배우는 웹 개발은 대표적으로 백과 프론트로 분야가 나뉘지만 두 분야가 어느 정도 연계되는 부분도 있을 뿐더러 처음 입문 할 때에 최대한 많은 것을 배우고 싶은 마음에 진로를 풀스택 개발자로 정했습니다. 간단한 코딩 경험은 있지만 c언어와 python같은 백엔드 언어만 다뤄보고 프론트 분야는 간단한 지식 습득만 했기 때문에 본 과정을 통해 프로젝트 개발 경험을 충분히 기르고 싶습니다. ",
            aiCount: 0,
        },
        {
            resumeItemId: 44,
            resumeId: 1,
            question: "입사하고 싶은 이유와 준비 과정을 입체적으로 작성해주세요.",
            answer: "a",
            aiCount: 0,
        },
    ];

export const resumeItemFeedbacks = [ // 자소서 피드백 예시
    {
        feedbackId: 111,
        resumeItemId : 1,
        feedbackText: '효율적인 시스템 설계와 안정적인 서비스 운영, 백엔드 시스템의 확장성과 성능 최적화" (더 구체적인 키워드)실제 성과(예: API 응답 속도 30% 단축) 추가 면접관이 성과를 빠르게 파악할 수 있음. "대규모 트래픽” 같은 키워드 추가 확장성과 실무 경험을 강조 ',
    },
    {
        feedbackId: 222,
        resumeItemId : 2,
        feedbackText: '강점은 구체적인 사례(예: DB 인덱싱 적용 후 쿼리 속도 50% 향상)를 추가하면 더 신뢰도가 높아짐, 약점은 단순히 문제를 나열하는 것이 아니라, 이를 해결하기 위한 노력(예: 기술 블로그 운영, 사이드 프로젝트 적용)을 추가',
    },
    {
        feedbackId: 333,
        resumeItemId : 3,
        feedbackText: '개발자에 대한 진로 설정 이유, 빠르게 변하고 그에 맞춰 끊임없이" (더 구체적인 키워드)실제 성과(예: 수상 실적 및 프로젝트 참가 경험) 이 경우 면접관에게 성과를 직관적으로 어필 할 수 있는 기회가 됨. "협업, 커뮤니케이션” 같은 키워드 추가 소통능력과 팀워크를 강조 ',
    },
    {
        feedbackId: 444,
        resumeItemId : 4,
        feedbackText: '일단 임시로 네이버/백엔드 지정해둠.',
    },
]
