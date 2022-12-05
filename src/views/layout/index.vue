<template>
	<div class="relative h-full w-full bg-[#F5F5F5]">
		<div class="relative h-[285px] bg-[#000] z-0"></div>
		<div class="absolute w-full h-full top-0 left-0 flex p-6 pb-0 pr-0">
			<div class="bg-white top-6 left-6 h-[calc(100vh-40px)] w-[250px] rounded-xl">
				<v-sidebar />
			</div>
			<div class="content-box ml-6 w-[calc(100%-274px)] relative">
				<vHeader/>
				<div class="h-[calc(100%-40px)] w-full pr-6 overflow-y-auto pb-6">
					<router-view v-slot="{ Component }">
					<transition name="move" mode="out-in">
						<keep-alive :include="tags.nameList">
							<component :is="Component"></component>
						</keep-alive>
					</transition>
				</router-view>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script setup>
import { useSidebarStore } from '@/store/sidebar';
import { useTagsStore } from '@/store/tags';
import vHeader from './header.vue';
import vSidebar from './sidebar.vue';

const sidebar = useSidebarStore();
const tags = useTagsStore();
</script>
