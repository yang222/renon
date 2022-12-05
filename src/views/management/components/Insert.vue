<template>
  <el-dialog
    title="Equipment distribution"
    :visible.sync="show" :close-on-click-modal="false"
    :modal="false"
    v-if="show"
    width="70%"
  >
    <div class="" style="margin-top: 0px;width: 100%;height: 750px;overflow-y: auto;">
      <div style="display: flex;justify-content:end;width:100%;">
        <el-form
          :inline="true"
          :model="searchForm"
          class="demo-form-inline width150"
          ref="searchForm"
          style="padding: 15px 20px;"
          label-width="80px"
          size="mini"
        >

          <el-form-item label="Type" prop="devtype" size="mini">
            <el-select clearable v-model="searchForm.devtype" filterable placeholder="">
              <el-option :label="item.name" :value="item.value" v-for="(item,index) in devTypeList"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="ID" prop="devId" size="mini">
            <el-input v-model="searchForm.devId" placeholder="ID"></el-input>
          </el-form-item>

           <el-form-item label="DevName" prop="devname" size="mini">
                    <el-input v-model="searchForm.devname" placeholder="DevName"></el-input>
           </el-form-item>

        </el-form>
        <div style="width:120px;margin-top: 12px;">
          <f-button class="search-btn" @click="query">Search</f-button>
        </div>

      </div>


      <el-table :data="data" @selection-change="handleSelectionChange" height="530px" row-key="_id" ref="multipleTable">
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column align="center" label="No." prop="index" width="80"></el-table-column>
        <el-table-column align="center" label="DevId" prop="devid" width=""></el-table-column>
        <el-table-column align="center" label="DevName" prop="devname" width=""></el-table-column>
        <el-table-column align="center" label="Type" prop="devtype" width=""></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div>
        <pagination :total="length" :page.sync="pageIndex" :limit.sync="pageSize"
                    @pagination="handlePageChange"/>
        <div style="text-align:right">
          <el-button style="width:120px;" class="search-btn" @click="onSubmit">Confirm</el-button>
        </div>

      </div>
    </div>

    <span slot="footer" class="dialog-footer">

    <!-- <el-button type="primary" @click="show = false">确 定</el-button> -->
  </span>
  </el-dialog>
</template>

<script>
    import tableMixin from '@/components/Mixin/table';
    import {bindDevice, list, insert, listCount,findSelectList,unBindDevice} from '@/services/device';
    import {createSubUser, updateDevDesc} from "@/services/subusers";
    import {devTypeCount} from "@/services/device_count";
    import {getParents, getRoleId, getUserName,getRoleIdRenon} from "@/utils/auth";
    let rules = {
        // devid: [
        //     { required: true, message: '请输入设备编号', trigger: 'blur' }
        // ],
        // devname: [
        //     { required: true, message: '请输入设备名称', trigger: 'blur' }
        // ],
    };
    export default {
        name: 'insert',
        mixins: [tableMixin],
        components: {},
        data() {
            return {
                searchForm: {
                    username: "",
                    devname:""
                },
                devTypeList: [],
                tableData: [],
                show: false, rules,
                mainDevice: -1,
                username: "",
                selectList: [],
                oriSelectList: [],
                formData: {

                    extra: ""

                }
            };
        },
        mounted() {
            this.loadData()
            this.loadDevType()
        },
        methods: {
            async loadDevType() {
                var res = await devTypeCount();
                if (!res) {
                    return;
                }
                let list = res.data.map(item => {
                    return {"name": item.devtype, "value": item.devtype}
                });
                this.devTypeList = [...list]

            },

            async loadSelect(username) {
                const res = await findSelectList(username);
                console.log(res, "44");
                res.data.forEach(item => {
                    this.$refs.multipleTable.toggleRowSelection(item,);
                })
                this.oriSelectList = res.data;
                this.query()

            },
            handleSelectionChange(select) {
                console.log(select);
                this.selectList = select;
            },
            queryList(page, size, searchData) {
                let search = {}
                if (searchData.devId) {
                    search.devid = {"$regex": searchData.devId, "$options": "i"};
                }
                if (searchData.devtype) {
                    search.devtype = searchData.devtype;
                }
                if (searchData.devname) {
                    search.devname = searchData.devname;
                }


                let parents =getParents().length;
                if(parents!=1){
                    search["subusers"]=getUserName();
                }
                if(parents==1){
                     let level=`\\"level\\":${parents}`;
                    search["$or"]=[{"desc":{"$regex":level,"$options":"i"}}, {"desc":{"$not":{"$regex":"level","$options":"i"}}},{"desc":{"$regex":'\\"'+this.username+'\\"',"$options":"i"}}];
                }else{
                    let level=`\\"level\\":${parents}`;
                    search["$or"]=[{"desc":{"$regex":level,"$options":"i"}},{"desc":{"$regex":'\\"'+this.username+'\\"',"$options":"i"}}]
                }

                return list({skip: (page - 1) * size, limit: size, filter: JSON.stringify(search)}) 
            },
            async loadCount(searchData) {
                let search = {}
                if (searchData.devId) {
                    search.devid = {"$regex": searchData.devId, "$options": "i"};
                }
                if (searchData.devtype) {
                    search.devtype = searchData.devtype;
                }
                 if (searchData.devname) {
                    search.devname = searchData.devname;
                }
                let parents =getParents().length;
                if(parents==1){
                     let level=`\\"level\\":${parents}`;
                    search["$or"]=[{"desc":{"$regex":level,"$options":"i"}}, {"desc":{"$not":{"$regex":"level","$options":"i"}}},{"desc":{"$regex":'\\"'+this.username+'\\"',"$options":"i"}}];
                }else{
                    let level=`\\"level\\":${parents}`;
                    search["$or"]=[{"desc":{"$regex":level,"$options":"i"}},{"desc":{"$regex":'\\"'+this.username+'\\"',"$options":"i"}}]
                }
                
                if(getRoleIdRenon()!=0){
                    search["subusers"]=getUserName()
                }
                
               
                
                let res = await listCount(JSON.stringify(search));
                if (res) {
                    this.length = res.count;
                }
            },
            getSearchData() {
                return {...this.searchForm}
            },

            async showModal(username) {
                this.show = true;
                this.formData.extra = ''
                this.username = username;
                this.loadSelect(username);
                this.loadCount(username)


            },
            async onSubmit() {

          if (this.selectList.length !== 0) {


                let bindList = this.selectList.filter(item => {
                    return this.oriSelectList.find(item2 => {
                        return item._id == item2._id
                    }) === undefined;
                })
console.log(bindList,"bindList",this.oriSelectList)
                if(bindList.length!=0){
                          const res = await bindDevice(this.username, bindList.map(item => {
                          return item._id;
                      }));
                      if (res) {
                          this.$message({
                              message: 'distribution success',
                              type: 'success',
                              showClose: true,
                              duration: 2000,
                              // offset:230
                          });

                         }

                     
               
          }

                     this.selectList.forEach(async (item) => {
                          let desc = {};
                          try {
                              desc = JSON.parse(item["desc"]);
                              desc["test"]="test";
                               delete  desc["test"];
                          } catch (e) {
                                     desc={};   
                          }
                         
                          let parent= getParents();
                          parent.push(this.username)
                          console.log(parent,desc["level"],'desc["level"]')
                          if(desc["level"] &&  desc["level"]>parent.length){
                              return;
                          }

                          desc["parent"] =parent;
                          desc["level"] = desc["parent"].length;
                          
                           await updateDevDesc(item["devid"],item["devtype"],JSON.stringify(desc));
                          
                      });


                      
            }

                   //解绑
                let result = [];
                for (let i = 0; i < this.oriSelectList.length; i++) {
                    let isExist = false;
                    for (let j = 0; j < this.selectList.length; j++) {
                        if (this.oriSelectList[i]._id === this.selectList[j]._id) {
                            isExist = true;
                            break;
                        }
                    }
                    if (!isExist) {
                        result.push(this.oriSelectList[i]);
                    }
                }

                // console.log(result,'result')

                result.forEach(async (item) => {
                    let desc = {};
                    try {
                        desc = JSON.parse(item["desc"])
                    } catch (e) {

                    }
                    let parent= getParents();
                    desc["parent"] =parent;
                    desc["level"] = desc["parent"].length;
                   const res1= await updateDevDesc(item["devid"],item["devtype"],JSON.stringify(desc));

                });
               const res2= await unBindDevice(this.username,result.map(item => {
                    return item._id;
                }))
                this.show = false;

            }
        }
    };
</script>

<style scoped>
  .search-btn {
    background-color: #56C271 !important;
    border-color: #56C271 !important;
    border-radius: 8px;
    box-shadow: none;
    color: #fff !important;
  }
</style>
