import type { CampaignApplication } from './model';
import { vehicleCatalog } from './data';
const env=(import.meta as ImportMeta & {env:Record<string,string|undefined>}).env;
export const previewMode=!env.VITE_FINANCING_API_URL;
export const campaignMetadata=Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].flatMap(key=>{const value=new URLSearchParams(window.location.search).get(key);return value?[[key,value]]:[];}));
export async function submitApplication(application:CampaignApplication):Promise<'preview'|'success'> {
 if(previewMode)return 'preview';
 if(vehicleCatalog.isFixture)throw new Error('تعذر إرسال الطلب: يجب إعداد بيانات السيارات الفعلية أولًا. بياناتك محفوظة في هذه الصفحة؛ يرجى المحاولة بعد إعداد الخدمة.');
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
 try {const response=await fetch(env.VITE_FINANCING_API_URL!,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...application,...(env.VITE_API_SUPPORTS_UTM==='true'?{campaign:campaignMetadata}:{})}),signal:controller.signal});if(!response.ok)throw new Error();return 'success';}
 catch {throw new Error('تعذر إرسال الطلب. تحقق من الاتصال وحاول مرة أخرى. بياناتك ما زالت موجودة في النموذج.');}finally{clearTimeout(timer);}
}
