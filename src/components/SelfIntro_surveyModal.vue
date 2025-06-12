           <template>
           <div class="fixed inset-0 flex justify-center items-center bg-gray-200/60 z-50">
                <div name="modal_box" class="flex flex-col px-12 py-6 rounded-lg bg-white text-start">
                    <p class="self-start font-semibold text-xs py-2 pr-32">현재 DISC 검사와 개발자 성향검사를 하지 않으셨습니다. <br> AI 분석 정확도를 높이기 위해 먼저 검사를 진행하시겠습니까?</p>
                    <p class="self-start text-xs">검사는 약 10분 정도 소요됩니다.</p>
                    <div class="self-end pt-4">
                        <button @click="$emit('close')" class="inline-block px-8 py-1.5 border-btnBlue text-xs rounded-md font-bold">다음에 하기</button>
                        <button @click="evalResume" class="inline-block px-7 py-1.5 border ml-2 text-xs bg-[#4f89fd] rounded-md text-white font-medium">
                            <router-link to='/surveyfirst'>검사 바로받기</router-link>
                        </button>
                    </div>
                </div>
            </div>
            </template>
            <script setup>
            import { useUserStore } from '../stores/user'

            const emit = defineEmits(['postResume']) 

            const evalResume = () => {
                emit('postResume')
            }
            </script>