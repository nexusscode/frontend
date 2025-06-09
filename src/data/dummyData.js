export const allItems = [ // 이미 등록된 공고들 
    { id: 100, company_name: "네이버", position: "백엔드 개발자", experience_level: "신입/경력", created_at: "2025/05/11", saramin_job_id: "saramin1", stateCoverletter: 0, stateInterview: 0, job_title: "개발자 신입 및 경력 모집" },
    { id: 101, company_name: "카카오", position: "백엔드 개발자", experience_level: "경력", created_at: "2025/05/11", saramin_job_id: "saramin1", stateCoverletter: 1, stateInterview: 1, job_title: "백엔드개발자 신입 및 경력 모집" },
    { id: 102, company_name: "네이버", position: "프론트 개발자", experience_level: "신입", created_at: "2025/05/11", saramin_job_id: "saramin1", stateCoverletter: 2, stateInterview: 2, job_title: "프론트 개발자 신입 모집" },
    ...Array.from({ length: 50 }, (_, i) => ({ 
        id: i,
        company_name: `(주)리더스시스템즈 ${i}`,
        position: "Full Stack 개발자",
        experience_level: "경력/무관",
        job_title: "풀스택 개발자 공채 모집", 
        created_at: "2025/04/02",
        saramin_job_id: "saramin1", // 사람인 공고 id -> 임시로 지정해둠(수정 필요)
        stateCoverletter: 0,
        stateInterview: 0,
}))];

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
export const resume_items = [ // 자소서 피드백 예시
    {
        id: 0,
        resume_item_id : 1,
        feedback_text : '지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.',
        created_at: 1,
    },
    {
        id: 0,
        resume_item_id : 1,
        feedback_text : '지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.',
        created_at: 1,
    },
    {
        id: 0,
        resume_item_id : 1,
        feedback_text : '지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.',
        created_at: 1,
    },
    {
        id: 0,
        resume_item_id : 1,
        feedback_text : '지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.',
        created_at: 1,
    }
];

export const resume_item_feedbacks = [ // 자소서 피드백 예시
    '지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.',
    '지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.',
    '지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.',
    '지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.지원자께서는 전반적으로 진중한 태도로 질문에 성실히 임하셨습니다.',
];