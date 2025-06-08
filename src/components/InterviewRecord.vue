<!-- 면접 리포트(면접 내용 기록 탭) : 면접 내용 기록 내용 부분 -->
<template>
    <div class="flex flex-col">
        <div class="mb-8">
            <!-- 여기도 for문으로 바꾸기 -->
            <div class="w-full mb-2 rounded-lg px-3 py-1.5 border border-[#D1D1D1] bg-white">
                <span class="font-medium text-black">질문 1.</span>
                <span class="font-medium ml-4 text-black">자기소개를 해주세요</span>
            </div>
            <div class="ml-4 mr-4 flex gap-x-8">
                <span class="w-[60px] text-black">답변 내용</span>
                <div class="flex-1">
                    <!-- 답변 내용 -->
                    <span class="text-black">
                        저는 백엔드 개발자로서 효율적인 시스템 설계와 안정적인 서비스 운영을 중요하게 생각합니다. 저는 백엔드 개발자로서 효율적인 시스템 설계와 안정적인 서비스 운영을 중요하게 생각합니다. 저는 백엔드 개발자로서 효율적인 시스템 설계와 안정적인 서비스 운영을 중요하게 생각합니다. 저는 백엔드 개발자로서 효율적인 시스템 설계와 안정적인 서비스 운영을 중요하게 생각합니다.
                    </span>
                    <!-- 아랫줄 -->
                    <div class="flex justify-between items-center h-8 mt-2">
                        <div class="flex gap-x-6">  
                            <div class="flex items-center justify-center">
                                <span class="flex items-center mr-2">컨닝 의심</span>
                                <div class="flex h-5 items-center w-fit px-2.5 text-sm rounded-full bg-white text-[#434343] border border-[#434343]">
                                    안전 <!-- 여기 수정 필요 -->
                                </div>
                            </div>
                            <div class="flex items-center justify-center">
                                <span class="flex items-center mr-2">미완결 답변</span>
                                <div class="flex h-5 items-center w-fit px-2.5 text-sm rounded-full bg-white text-[#434343] border border-[#434343]">
                                    없음 <!-- 여기 수정 필요 -->
                                </div>
                            </div>
                            <div class="flex items-center justify-center">
                                <span class="flex items-center mr-2">답변 내용</span>
                                <div class="flex h-5 items-center w-fit px-2.5 text-sm rounded-full bg-white text-[#434343] border border-[#434343]">
                                    충족 <!-- 여기 수정 필요 -->
                                </div>
                            </div>
                        </div>
                        <!-- 답변 시간 -->
                        <span class="text-black">1분 34초</span> <!-- 여기 수정 필요 -->
                    </div>
                </div>
            </div>
            <hr class="ml-4 mr-4 my-2 border-black" />
            <div class="flex flex-col gap-y-2 pt-1">
                <div class="ml-4 mr-4 flex gap-x-8">
                    <span class="w-[60px] text-black">답변 요약</span>
                    <div class="flex-1">
                        <!-- 답변 요약 내용 -->
                        <span class="text-black">
                            백엔드 개발자로서 효율성과 안정성을 중시하며, 성능 개선 경험을 바탕으로 확장성 있는 시스템 구축에 기여하고 싶습니다.    
                        </span>
                    </div>
                </div>
                <div class="ml-4 mr-4 flex gap-x-8">
                    <span class="w-[60px] text-black font-medium">AI 분석</span>
                    <div class="flex-1">
                        <!-- AI 분석 내용 -->
                        <span class="text-black font-medium">
                        “해당 답변은 지원자의 직무 관련 역량과 목표가 명확하게 드러나 있으나, 실제 사용 기술 스택이나 프로젝트 사례가 구체적으로 언급되지 않아 신뢰도를 높이기 어렵습니다. 지원자의 백엔드 역량과 성과를 더 설득력 있게 전달하려면, 예를 들어 'Spring Boot와 MySQL을 활용한 주문 처리 시스템 개발'과 같이 구체적인 경험을 삽입하는 것이 좋습니다. 또한, 1인칭 시점을 활용한 간결한 문장 구성으로 가독성을 높일 수 있습니다." 
                        </span>
                    </div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script setup>

</script>
