THREE.Container=function(){
    //顺序号
    this.SN="";
    //箱公司
    this.ContainerCompany=null;
    //提单号
    this.BillOfLadingNumber=null;
    //铅封号
    this.SealNum="";
    //内外贸易
    this.Trade="";
    //箱号
    this.ContainerNumber="";
    //尺寸,两种（20ft,40ft）
    this.Size="";
    //卸货港
    this.UnloadingPort="";
    //目的港
    this.DestinationPort="";
    //装货港
    this.LoadingPort="黄石新港";
    //贝位:A0106212  A01(堆场号)06(行号)21(列号)2(堆高层数)
    this.BayNo="";
    //尺寸40的二号贝位
    this.BayNo40="";
    //车辆分配
    this.CarNum=null;
    //运输顺序
    this.SX=0;
    //颜色
    this.Colors="";
    //类型
    this.Types="";
    //空箱Full或重箱Empty
    this.EmptyOrheavyContainer=null;
    //重量
    this.Weight=0.0;
    //内贸（True）或外贸（False）
    this.DomesticOrForeignTrade=null;
    // //集装箱离港自然时间
    // this.DepartureTime=new Date(2017,12,25,20,25,59);
    // //集装箱在堆场堆存时间,单位h
    // this.ContainerCY_Time=0;
    // //卸船开始时间,相对时间，假定第一个集装箱开始卸载时间为0,单位s
    // this.UnloadShipStartTime=0;
    //到船时间
    this.LoadShipStartTime=0;
    //this.LoadShipEndTime=0;
    //堆场到码头时间
    this.CYtoWharfStartTime=0;
    //this.CYtoWharfEndTime=0;
    //火车到堆场
    this.RailwayToCYStartTime=0;
    //this.RailwayToCYEndTime=0;
    //this.myzone=null;
    //火车到达时间
    this.TrainArrivedTime=new Date(2017,12,25,20,25,59);
    //火车装载开始时间
    this.TrainUnloadStartTime=0;
    //this,TrainUnloadEndTime=0;
    //集装箱 时间
    this.ContainerCY_Time=10;
    //移动卡车时间
    this.LiftToTruckStartTime=0;
    //船到达时间
    this.TShipArrivedTime=new Date(2017,12,25,10,55,1);
    //装载到船时间
    this.LoadShipStartTime=0;
    //this.LoadShipEndTime=0;
    //集装箱龙门吊用时
    this.GantryCraneTime=0;
}
//三个枚举类
     //目的类别
if(typeof Case=="undefined"){
    var Case={}
        chukou=0;//出口
        jinkou=1;//进口
        cunchu=2;//存储
        zhongzhuan=3;//中转

}
//交通方式
if(typeof Road=="undefined"){
    var Road={}
        gonglu=0;
        shuilu=1;
        tielu=2;
}
//方式
if(typeof Style=="undefined"){
    var Style={}
        chuanbo=0;//船舶
        huoche=1;//火车
}

THREE.ContainTruck=function(){
    this.Truck=null;
    this.getToCraneTime=0;//到达吊车时间
}
var ContainerNum = 50;//集装箱总数
var InitContainerList = new Array(); //集装箱数组
var TuckList= new Array();//卡车数组


ContainTruckSchedule=function() {
    //火车,集卡调度策略

    var ContainTruckNum = 4; //集卡数量
    TuckList [0]=0;
    //创建集装箱
    for (var i =0; i < ContainerNum; i++) {
        InitContainerList[i] = new THREE.Container();
    }
    //堆场、火车时间调度策略
    for (var i=0;i<ContainerNum;i++){
        InitContainerList[i].TrainUnloadStartTime=8*i;
        InitContainerList[i].TrainUnloadEndTime=InitContainerList[i].TrainUnloadStartTime+8;

        TuckList[i+1]=TuckList[i]+20;


        if(InitContainerList[i].TrainUnloadEndTime>TuckList[i]){
            InitContainerList[i].RailwayToCYStartTime=InitContainerList[i].TrainUnloadEndTime;
            InitContainerList[i].RailwayToCYEndTime=InitContainerList[i].RailwayToCYStartTime+20;
            TuckList[i]=InitContainerList[i].RailwayToCYStartTime;

        }
        else {
            InitContainerList[i].RailwayToCYStartTime=TuckList[i];
            InitContainerList[i].RailwayToCYEndTime=InitContainerList[i].RailwayToCYStartTime+20;
        }

        InitContainerList[i].CYtoWharfStartTime=30*Math.floor(i/ContainTruckNum);
        InitContainerList[i].CYtoWharfEndTime=InitContainerList[i].CYtoWharfStartTime+30;

    }

    //堆场、岸桥时间调度策略


    for(var i=0;i<ContainerNum;i++){
        InitContainerList[i].LiftToTruckStartTime=i*InitContainerList[i].ContainerCY_Time;
        InitContainerList[i].LiftToTruckEndTime=InitContainerList[i].LiftToTruckStartTime+InitContainerList[i].ContainerCY_Time;

    }


    for(var i=0;i<ContainerNum;i++) {
        InitContainerList[i].LoadShipStartTime = 10 * Math.floor(i / 2);
        InitContainerList[i].LoadShipEndTime = 10 * Math.floor(i / 2 + 1);
    }

    //常规信息初始化
    for(var i=0;i<ContainerNum;i++){
        InitContainerList[i].SN=""+(i+100);
        InitContainerList[i].ContainerShip=75431;
        InitContainerList[i].ContainerCompany="武汉理工大学";
        InitContainerList[i].CarNum="null";
        InitContainerList[i].ContainerNumber="HCIU2091"+(i+100);
        InitContainerList[i].Types="GP";
        InitContainerList[i].SealNum="W3"+(i+100)+""+(i+10);
        InitContainerList[i].Trade="内贸";



        if(i<40){
            InitContainerList[i].BillOfLadingNumber="1000X";
            InitContainerList[i].Size="20";
            InitContainerList[i].EmptyOrheavyContainer="F";
            InitContainerList[i].DomesticOrForeignTrade =true;
            InitContainerList[i].Type=chukou;
            InitContainerList[i].Source=tielu;
            InitContainerList[i].Whereabouts=chuanbo;

        }
        else{
            InitContainerList[i].BillOfLadingNumber="1001W";
            InitContainerList[i].Size="40";
            InitContainerList[i].EmptyOrheavyContainer="E";
            InitContainerList[i].DomesticOrForeignTrade =false;
            InitContainerList[i].Type=jinkou;
            InitContainerList[i].Source=shuilu;
            InitContainerList[i].Whereabouts=chuanbo;
        }
        if(InitContainerList[i].Size == 40){
            InitContainerList[i].BayNo40="null";
        }
        InitContainerList[i].UnloadingPort="上港九区";
        InitContainerList[i].DestinationPort="上海港";
        InitContainerList[i].LoadingPort="黄石新港";
        InitContainerList[i].BayNo="null";
        if(InitContainerList[i].Size=="20"){
            InitContainerList[i].Weight=100.5;
        }
        else{
            InitContainerList[i].Weight=180.5;
        }

        //color设置

        switch (i%3) {
            case 0:InitContainerList[i].Colors="Red";
                break;
            case 1:InitContainerList[i].Colors="Green";
                break;
            case 2:InitContainerList[i].Colors="Blue";
                break;
            default:alert("switch出错");break;
        }
    }
    for(var i=0;i<20;i++){
        var BW ="B030"+(parseInt(i/6)+1)+"080";
        InitContainerList[i].BayNo = BW + (i%6+1);
    }
    for(var i=0;i<20;i++){
        var BW ="A040"+(parseInt(i/6)+1)+"080";
        InitContainerList[i+20].BayNo = BW + (i%6+1);
    }
    for(var i=0;i<10;i++){
        var BW ="A030"+(parseInt(i/6)+1)+"130";
        var BW2 ="A030"+(parseInt(i/6)+1)+"140";
        InitContainerList[i+40].BayNo = BW + (i%6+1);
        InitContainerList[i+40].BayNo40 = BW2 + (i%6+1);
    }


}