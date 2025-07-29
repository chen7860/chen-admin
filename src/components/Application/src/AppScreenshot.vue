<script lang="tsx">
  import { defineComponent, ref, unref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { ScissorOutlined } from '@ant-design/icons-vue';
  // import AppSearchModal from './AppSearchModal.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { snapdom } from '@zumer/snapdom';

  export default defineComponent({
    name: 'AppSearch',
    setup() {
      const { t } = useI18n();

      async function screenShot() {
        // 创建可重用的截图实例
        const element = document.body;
        const capture = await snapdom(element, {
          scale: 2, // 2倍清晰度
          backgroundColor: '#fff', // 背景色
          embedFonts: true, // 内嵌字体
          compress: true, // 压缩优化
        });

        // 导出不同格式
        // const png = await capture.toPng();
        // const jpg = await capture.toJpg({ quality: 0.9 });

        // 直接触发下载
        await capture.download({
          format: 'png',
          filename: 'chart-report-2024',
        });
      }

      return () => {
        return (
          <div class="p-1" onClick={screenShot}>
            <Tooltip>
              {{
                title: () => t('common.screenshot'),
                default: () => <ScissorOutlined />,
              }}
            </Tooltip>
          </div>
        );
      };
    },
  });
</script>
