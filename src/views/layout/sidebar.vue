<template>
  <div class="sidebar h-full pb-10">
    <div class="pt-6 text-center">
      <img
        src="@/assets/images/logo.png"
        class="w-[50%] block mx-auto"
        alt=""
      />
      <p class="text-black text-[15px] my-3 font-bold leading-6" v-if="role==4">End User</p>
      <p class="text-black text-[15px] my-3 font-bold leading-6" v-if="role==3">Installer</p>
      <p class="text-black text-[15px] my-3 font-bold leading-6" v-if="role==1">Agent I</p>
      <p class="text-black text-[15px] my-3 font-bold leading-6" v-if="role==2">Agent II</p>
      <img src="@/assets/images/icon/line.png" class="block mx-auto" alt="" />
    </div>
    <ul class="pr-4 mt-9">
      <li v-for="(item, index) in items" :key="index" class="mb-4">
        <div
          :class="`${
              routes.path == item.index ? 'bg-gray-200' : ''
            } flex items-center cursor-pointer py-2 pl-3`"
          @click="jump(item)"
        >
          <img v-if="item.icon" :src="item.icon" alt="" />
          <span class="flex-1 text-black font-bold text-base pl-2">{{
            item.title
          }}</span>
          <el-icon
            :class="`transition ${item.collapse ? 'rotate-[180deg]' : ''}`"
            size="14"
            v-if="item.subs"
            ><ArrowDownBold
          /></el-icon>
        </div>
        <ul
          :class="`max-h-0 transition overflow-hidden ${
            item.collapse ? '!max-h-[300px]' : ''
          }`"
        >
          <li
            @click="jump(sub)"
            :class="`${
              routes.path == sub.index ? 'bg-gray-200' : ''
            } pl-[56px] cursor-pointer hover:bg-gray-200 leading-[42px] rounded-md text-sm text-[#6C757D]`"
            v-for="(sub, subIndex) in item.subs"
            :key="subIndex"
          >
            {{ sub.title }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useSidebarStore } from "@/store/sidebar";
import { useRoute, useRouter } from "vue-router";
import Icon from "@/assets/images/icon/Icon.png";
import Icon1 from "@/assets/images/icon/Icon1.png";
import Icon2 from "@/assets/images/icon/Icon2.png";
import Icon3 from "@/assets/images/icon/Icon3.png";
import { getUserInfo,getRoleId } from "@/utils/data";

const routes = useRoute();
const role =  getRoleId()
let sideData = [
  {
    icon: Icon,
    index: "1",
    title: "Home",
    permiss: "2",
    collapse: true,
    subs: [
      {
        index: "/home",
        title: "My plants",
        permiss: "3",
      },
    ],
  },
  {
    icon: Icon1,
    index: "2",
    title: "Device",
    permiss: "2",
    collapse: false,
    subs: [
       {
          index: "/device-list",
          title: "Device List",
          permiss: "3",
        },
      {
        index: "/event",
        title: "Event",
        permiss: "3",
      },
      {
        index: "/setting",
        title: "Parameter Setting",
        permiss: "3",
      },
      {
        index: "/upgrade",
        title: "Upgrade",
        permiss: "3",
      },
    ],
  },
  {
    icon: Icon2,
    index: "3",
    title: "Account",
    permiss: "2",
    collapse: false,
    subs: [
      {
        index: "/person-info",
        title: "Personal Information",
        permiss: "3",
      },
    ],
  },
];

if (role == 3) {
  sideData = [
    {
      icon: Icon,
      index: "/home",
      title: "Home",
      permiss: "2",
      collapse: true,
    },
    {
      icon: Icon1,
      index: "2",
      title: "Device",
      permiss: "2",
      collapse: false,
      subs: [
        {
          index: "/device",
          title: "Monitoring Device",
          permiss: "3",
        },
        {
          index: "/device-list",
          title: "Device List",
          permiss: "3",
        },
        {
          index: "/setting",
          title: "Parameter Setting",
          permiss: "3",
        },
        {
          index: "/event",
          title: "Event",
          permiss: "3",
        },
        {
          index: "/upgrade",
          title: "Upgrade",
          permiss: "3",
        },
      ],
    },
    {
      icon: Icon3,
      index: "4",
      title: "User Management",
      permiss: "2",
      collapse: false,
      subs:[
         {
          index: "/user-management",
          title: "End-User Management",
          permiss: "3",
        },
      ]
    },
    {
      icon: Icon2,
      index: "3",
      title: "Account",
      permiss: "2",
      collapse: false,
      subs: [
        {
          index: "/person-info",
          title: "Personal Information",
          permiss: "3",
        },
      ],
    },
  ];
}else if (role == 1 || role  == 2) {
  sideData = [
    {
      icon: Icon,
      index: "/home",
      title: "Home",
      permiss: "2",
      collapse: true,
    },
    {
      icon: Icon1,
      index: "2",
      title: "Device Management",
      permiss: "2",
      collapse: false,
      subs: [
        {
          index: "/home/device",
          title: "Monitoring Device",
          permiss: "3",
        },
        {
          index: "/device-list",
          title: "Device List",
          permiss: "3",
        },
        {
          index: "/setting",
          title: "Parameter Setting",
          permiss: "3",
        },
        {
          index: "/event",
          title: "Event",
          permiss: "3",
        },
        {
          index: "/upgrade",
          title: "Upgrade",
          permiss: "3",
        },
      ],
    },
    {
      icon: Icon3,
      index: "3",
      title: "User Management",
      permiss: "2",
      collapse: false,
		subs: [
        {
          index: "/management",
          title: "User Management",
          permiss: "3",
        },
      ],
    },
    {
      icon: Icon2,
      index: "3",
      title: "Account",
      permiss: "2",
      collapse: false,
      subs: [
        {
          index: "/person-info",
          title: "Personal Information",
          permiss: "3",
        },
      ],
    },
  ];
}

const items = ref(sideData);

const route = useRoute();
const router = useRouter();
const onRoutes = computed(() => {
  return route.path;
});

const sidebar = useSidebarStore();
const jump = (item) => {
	if(item.subs){
		item.collapse = !item.collapse
	}else{
		router.push(item.index);
	}
  
};
const handleItem = () => {
  items.value.forEach((item) => {
	if(item.subs){
		let obj = item.subs.find((item2) => route.path.indexOf(item2.index) > -1);
		if (obj) {
		item.collapse = true;
		} else {
		item.collapse = false;
		}
	}else{
		if(route.path == item.index){
			item.collapse = true;
		}
	}
    
  });
};
onMounted(()=>{
	handleItem();
})
</script>

<style>
.sidebar {
  display: block;
  overflow-y: auto;
  background: url("@/assets/images/logo2.png") no-repeat center 100%;
  background-size: 100% auto;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.el-sub-menu {
  display: block !important;
}
.el-menu-item {
  display: flex !important;
  align-items: center;
}
.transition {
  transition: all 0.5s;
}
</style>
