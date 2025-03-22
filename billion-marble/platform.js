/**********************************************
 *
 *  - util_Global.js에서 아래 Platform.init()을 호출함.
 *  - 각플랙폼별 내용을 기재한다. *
 * file name 	platform.js
 *
 **********************************************/

var Platform =	{}

Platform.init = function()
{
	////////////////////////////////////버전발행시 체크사항 1.  app_release의 "RELEASE"여부 //////////////////////////////////////////
	glo.app_release = "RELEASE";
	//glo.app_release = "TEST";

	////////////////////////////////////버전발행시 체크사항 2.  플랫폼의 정확한 표기 KT인가 SKB인가? 등 //////////////////////////////////////////

	glo.platform = glo.PLATFORM.AZE; //아제리온

	////////////////////////////////////버전발행시 체크사항 3.  버전명 표기 등 최신 update했는가 //////////////////////////////////////////
	switch(glo.platform)
	{


		case glo.PLATFORM.AZE:	
							//AZE향을 PC에서 실행 할려면
							//1.platform.js파일에서 platform을 AZE로 변경한다.
							//2.index.html이 아니라 index_bal.html을 실행한다.
							//3.브라우저에서 f12를 눌러 디버깅창에서 모바일을 눌러 모바일로 실행하게 한다.
							glo.URL_prefix = "http://14.63.197.40:8018/BM_AZE/";
							glo.app_name   = "BILLION_MARBLE_AZE";
							glo.version		 = "BM.min_20230817_2030";	
							//DEFINE.MONTH_MAX_PAYMENT = 0; 
							glo.mouse.use = 1; //Android Mobile은 touch전용이다. 여기에 명시하지 않으면 default는 0값을 가진다.  	
							break

	}

	//플랫폼이 정해졌다면, 플랫폼에 맞는 goods를 define하라.
////	DEFINE.goods(); 

}	