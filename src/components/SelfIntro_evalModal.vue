           <template>
           <div class="fixed inset-0 flex justify-center items-center bg-gray-200/50 z-30">
                <div name="modal_box" class="flex flex-col px-12 py-8 rounded-2xl bg-white">
                    <p class="self-start font-bold text-lg">{{ companyName }} - {{ jobTitle }}</p>
                    <p class="self-start font-semibold text-xs py-4 pr-60">AI 자소서 검사를 받으시겠습니까?</p>
                    <div class="self-end">
                        <button @click="$emit('close')" class="inline-block px-9 py-1 border-btnBlue text-xs rounded-md">취소하기</button>
                        <button @click="evalResume" class="inline-block px-5 py-1 border ml-2 text-xs bg-[#4f89fd] rounded-md text-white">
                            자소서 검사받기
                        </button>
                    </div>
                </div>
            </div>
            </template>
            <script setup>
            const Props = defineProps({
                companyName: {
                    type: String,
                    required: true
                },
                jobTitle: {
                    type: String,
                    required: true
                }
            })
            const emit = defineEmits(['postResume'])

            const evalResume = () => {
                emit('postResume')
            }
            </script>