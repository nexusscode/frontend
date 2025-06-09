           <template>
           <div class="fixed inset-0 flex justify-center items-center bg-gray-200/50 z-50">
                <div name="modal_box" class="flex flex-col px-12 py-8 rounded-2xl bg-white">
                    <p class="self-start font-bold">문서 등록</p>
                    <p class="self-start font-semibold text-[11px] py-4 pr-72">자기소개서 문서 첨부 및 직접 작성으로 AI 분석을 받아보세요</p>
                    <input type="text"  class="flex justify-center w-full py-1.5 border-[#576edf] border-2 mb-4 rounded-lg text-center font-semibold" href="#"> <!--api?-->
                        <img src="./ima.svg" alt="" class="w-4 h-4 mr-4">
                        자기소개서 문서 추가 
                    </input>
                    <button @click="evalResume" class="self-end px-4 py-1.5 border text-sm bg-[#4f89fd] rounded-md text-white" href="#">
                        <router-link to='/coverletter/result'>AI 검사 받기</router-link>
                    </button>
                </div>
            </div>
            </template>
            <script setup>
            
            const emit = defineEmits(['postResume'])

            const evalResume = () => {
                emit('postResume')
            }
            </script>