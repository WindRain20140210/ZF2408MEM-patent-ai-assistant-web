import { ref } from 'vue';
const useSSE = ( url ) => {

    const source = ref(null);

    //接收到的sse数据
    const sseData = ref({});

    // sse状态
    const readyState = ref({ key: 0, value: "正在链接中" });

    const creatSource = () => {
        const stateArr = [
            { key: 0, value: "正在链接中" },
            { key: 1, value: "已经链接并且可以通讯" },
            { key: 2, value: "连接已关闭或者没有链接成功" },
          ];

        try {
            source.value= new EventSource(url);
            source.value.onopen = (e) => {
              readyState.value = stateArr[source.value?.readyState ?? 0];
            };
      
            source.value.onerror = (e) => {
              readyState.value = stateArr[source.value?.readyState ?? 0];
            };
            source.value.onmessage = (e) => {
              e.data && (sseData.value = { ...JSON.parse(e.data) });
            };
          } catch (error) {
            console.log(error);
        }
      
    }

    const sourceInit = () => {
        if (!source.value|| source.value.readyState === 2) {
            creatSource();
          }
    }

    //  关闭 WebSocket
    const closeSource = () => {
        source.value?.close();
    }


    //重连
    const reconnectSSE = () => {
        try {
        closeSource();
        source.value= null;
        creatSource();
        } catch (e) {
        console.log(e);
        }
    };

    return {
        sseData,
        readyState,
        sourceInit,
        closeSource,
        reconnectSSE,
      };
    
 
}

export default useSSE;
