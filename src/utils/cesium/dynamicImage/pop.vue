<template>
  <div id="info_box" class="popup-box-wrap">
    <div class="site-content">
      <!--        <div class="site-title fontColor"><span>{{ tcnumItd }} {{ tcname }}</span></div>-->
      <table>
        <tr>
          <td class="td-left">格点编号:</td>
          <td class="td-right">{{ proxy.$era5data[3] }}</td>
        </tr>
        <tr>
          <td class="td-left">经度:</td>
          <td class="td-right">{{ proxy.$era5data[0] }}</td>
        </tr>
        <tr>
          <td class="td-left">纬度:</td>
          <td class="td-right"
            >{{ proxy.$era5data[1] }}
            <!--              <el-tag :color="tagColor" size="small">{{ tagName }}</el-tag>-->
          </td>
        </tr>
        <tr>
          <td class="td-left">{{
            proxy.$era5data.length === 5 || proxy.$era5data.length === 7 ? '盛行风:' : '要素值:'
          }}</td>
          <td class="td-right">{{
            proxy.$era5data.length === 5 || proxy.$era5data.length === 7
              ? proxy.$era5data[4]
              : proxy.$era5data[2]
          }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import { getCurrentInstance } from 'vue';
  export default {
    name: 'Pop',
    setup() {
      const { proxy } = getCurrentInstance();

      // onMounted(()=>{
      //   console.log('proxy1')
      //   console.log(proxy)
      // })

      return {
        proxy,
      };
    },
  };
</script>

<style scoped lang="less">
  #info_box {
    position: absolute;
    z-index: 2000;
    display: none;
    width: 200px;
    background: #ffffff;
    font-size: 12px;
  }

  .popup-box-wrap {
    position: absolute;
    width: 100%;
    border-radius: 20px;
    border: 1px solid #208aec;
    background: #fff;
    border-image: linear-gradient(
        90deg,
        rgba(57, 161, 235, 0),
        rgba(57, 161, 235, 0.5),
        rgba(57, 161, 235, 0)
      )
      2 2;
    filter: blur(undefinedpx);
    box-shadow: 0 0 10px 2px #208aec;
    animation: slide 0.5s;
    display: flex;
    flex-direction: column;
    padding: 8px;
  }

  .site-content {
    color: #666;
    font-size: 13px;
    margin: 0 auto;

    .site-title {
      width: 100%;
      display: flex;
      justify-content: center;

      span {
        font-size: 16px;
        color: #666;
        font-weight: bold;
      }
    }

    table {
      tr {
        height: 22px;

        .td-right {
          text-align: left;
          width: 123px;
        }

        .td-left {
          text-align: right;
          font-size: 14px;
          font-weight: bold;
          width: 83px;
        }
      }
    }
  }
</style>
