<template>
    <div class="absolute top-[100px] left-[160px] right-[160px]">
        <div name="main_box" class="flex w-11/12 px-3 py-6 border border-white mx-auto rounded-3xl bg-white/30">
            <div class="w-3/4">
                <div class="flex justify-between text-xs">
                    <a href="#" class="px-2 py-1 border  text-[14px] font-semibold rounded-lg bg-white/30 ">자소서 분석 결과</a>
                    <a href="#" class="flex justify-center px-4 py-1 border text-[13px] font-medium rounded-lg bg-[#4f89fd] text-white"> 수정하기</a>
                </div>
                <div class="flex flex-col h-auto px-8 pt-6 border-2 mt-4 rounded-xl bg-white">
                    <p class="mb-2 text-[13px] font-semibold">1. 입사하고 싶은 이유와 준비 과정을 구체적으로 적어주세요.</p> <!-- 글자수 세기 추가 할 것 --> 
                    <textarea spellcheck="false" ref="intros" @input="resize" class="p-3 mb-4 rounded-md text-[10px] border border-gray-200 resize-none overflow-y-hidden min-h-[48px]"></textarea>
                    <p class="mb-2 text-[13px] font-semibold">1. 입사하고 싶은 이유와 준비 과정을 구체적으로 적어주세요.</p>
                    <textarea spellcheck="false" ref="intros" @input="resize" class="p-3 mb-4 rounded-md text-[10px] border border-gray-200 resize-none overflow-y-hidden min-h-[48px]"> </textarea>
                    <p class="mb-2 text-[13px] font-semibold">1. 입사하고 싶은 이유와 준비 과정을 구체적으로 적어주세요.</p>
                    <textarea spellcheck="false" ref="intro" @input="resize" class="p-3 mb-4 rounded-md text-[10px] border border-gray-200 resize-none overflow-y-hidden min-h-[48px]"> </textarea>
                </div>
            </div> 
            <div class="w-1/4 flex flex-col">
                <a href="#" id="save" class="self-end px-3 py-1 border mr-2 text-[13px] font-semibold rounded-lg text-white bg-linear-to-r from-[#4653E4] to-[#AB4DFE]">AI 코칭 저장하기</a>
                <div class="flex flex-col justify-between h-full mt-3.5 mx-2">
                    <p class="p-4 shadow-sm border border-gray-200 bg-white font-semibold text-[11px] text-[#4f89fd] rounded-xl">'자기소개서에 대한 조언을 넣는 자리 자기소개서에 대한 조언을 넣는 자리 자기소개서에 대한 조언을 넣는 자리 자기소개서에 대한 조언을 넣는 자리'</p>
                    <p class="p-4 shadow-sm border border-gray-200 bg-white font-semibold text-[11px] text-[#4f89fd] rounded-xl">'자기소개서에 대한 조언을 넣는 자리 자기소개서에 대한 조언을 넣는 자리 자기소개서에 대한 조언을 넣는 자리 자기소개서에 대한 조언을 넣는 자리'</p>
                    <p class="p-4 shadow-sm border border-gray-200 bg-white font-semibold text-[11px] text-[#4f89fd] rounded-xl">'자기소개서에 대한 조언을 넣는 자리 자기소개서에 대한 조언을 넣는 자리 자기소개서에 대한 조언을 넣는 자리 자기소개서에 대한 조언을 넣는 자리'</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            resize() { // textarea 높이 늘어나도록 수정 할 것
                this.$refs.intros.style.height = "1px";
                this.$refs.intros.style.height = this.$refs.intros.scrollHeight + "px";
            },
        }
    }
</script>
<style>
    #save {
        background: linear-gradient(to right,  #4653e4 0%,#ab4dfe 100%);
        opacity: 80%;
    }
</style>