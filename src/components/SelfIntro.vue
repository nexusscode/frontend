<template>
        <div name="all_box" class="pt-[84px] px-[120px] flex flex-col justify-between items-center w-auto">
            <div name="first_box" class="w-2/3 px-16  h-48 flex flex-col justify-evenly items-center rounded-3xl bg-white/50">
                <div class="flex w-full py-4 rounded-lg font-semibold text-lg">
                    자기소개서 <div class="inline-block mt-1.5 ml-4 pb-2 text-xs font-semibold">자기소개서 문서 첨부 및 직접 작성으로 AI 분석을 받아보세요</div>
                </div>
                <a class="flex justify-center w-full py-3 border-[#576edf] border-2 rounded-xl text-center font-semibold text-lg" href="#">
                    <img src="./ima.svg" alt="" class="w-4 h-4 mr-4">
                    자기소개서 문서 추가 
                </a>
                <a class="self-end px-4 py-2 border my-4 text-sm bg-[#4f89fd] rounded-lg text-white" href="#">
                    AI 검사 받기
                </a>
            </div>
            <div class="self-end pr-56 py-4 text-xs font-normal">*자소서 검사는 문항당 최대 10번 가능합니다.</div>
            <div name="main_box" class="w-11/12 px-8 py-4 border border-white rounded-3xl relative top-4 bg-white/30">
                    <div class="flex justify-between text-xs">
                        <div class="flex">
                            <a href="#" class="px-2 py-2 border border-white mr-[5px] text-[13px] font-semibold rounded-lg bg-white/70 ">임시 저장</a>
                            <a href="#" class="px-2 py-2 border border-white text-[13px] font-semibold rounded-lg bg-white">이어쓰기</a>
                        </div>
                        <div class="flex">
                            <a href="#" class="px-4 py-2 border text-[13px] font-semibold rounded-lg bg-white">+ 질문 추가</a>
                            <a href="#" class="flex justify-center px-4 py-2 border ml-[5px] text-[13px] font-semibold rounded-lg bg-[#4f89fd] text-white">
                                <img src="./ima.svg" alt="" class="w-4 h-4 mr-2">
                                검사받기
                            </a>
                        </div>
                    </div>
                    <div class="flex flex-col px-8 pt-10 border-2 mt-4 rounded-xl bg-white">
                        <p class="mb-4 text-[13px] font-semibold">1. 입사하고 싶은 이유와 준비 과정을 구체적으로 적어주세요.</p>
                        <textarea ref="textArea" @input="resize" class="p-3 mb-4 rounded-md text-[11px] border border-gray-200 resize-vertical overflow-y-hidden min-h-[48px]"> 
                        <p class="mb-4 text-[13px] font-semibold">1. 입사하고 싶은 이유와 준비 과정을 구체적으로 적어주세요.</p>
                        <textarea ref="textArea" @input = "resize" class="p-3 mb-4 rounded-md text-[11px] border border-gray-200 resize-none overflow-y-hidden min-h-[48px]"> </textarea>
                        <p class="mb-4 text-[13px] font-semibold">1. 입사하고 싶은 이유와 준비 과정을 구체적으로 적어주세요.</p>
                        <textarea ref="textArea" @input = "resize" class="p-3 mb-4 rounded-md text-[11px] border border-gray-200 resize-none overflow-y-hidden min-h-[48px]"> </textarea>
                    </div>
            </div>
        </div>
</template>
<script>
    export default {
        methods: {
            resize() {
                this.$refs.textArea.style.height = "1px";
                this.$refs.textArea.style.height = this.$refs.textArea.scrollHeight + "px";
            },
        }
    }
</script>
