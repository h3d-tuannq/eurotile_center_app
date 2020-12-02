import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import ScrollableTabView, { ScrollableTabBar,DefaultTabBar  }  from 'react-native-scrollable-tab-view';
import NewsTab from './NewsTab'
import MyCustomizeTabBar from  './tabbar/MyCustomizeTabBar'

import NetNews from '../../net/NetNews'
import Def from '../../def/Def'
import Style from "../../def/Style";

const {width, height} = Dimensions.get('window');


const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2

const news_data =  {
    "tin chuyen nganh": {
        "name_vi" : "Tin chuyên ngành",
        "data" : [
            {
                "id": "30",
                "category": "chinh-tri",
                "link": "https://vov.vn/chinh-tri/lam-tuyen-giao-chua-bao-gio-la-cong-viec-de-dang-1075124.vov",
                "title": "Làm tuyên giáo chưa bao giờ là công việc dễ dàng",
                "reader_link": "",
                "thumbnail": Def.URL_BASE + "/data/eurotileData/1/euHYKYXEj7WPpwH_7eaAv_4QglT5iwe1.png",
                "date": "2020-08-01 22:20:49"

            },
            {
                "id": "14",
                "category": "chinh-tri",
                "link": "https://vov.vn/chinh-tri/ong-tong-the-anh-trung-cu-bi-thu-huyen-uy-yen-chau-son-la-1076661.vov",
                "title": "Ông Tòng Thế Anh trúng cử Bí thư Huyện ủy Yên Châu, Sơn La",
                "reader_link": "",
                "thumbnail": Def.URL_BASE + "/data/eurotileData/1/euHYKYXEj7WPpwH_7eaAv_4QglT5iwe1.png",
                "date": "2020-08-01 22:20:49"
            },
            {
                "id": "22",
                "category": "chinh-tri",
                "link": "https://vov.vn/chinh-tri/ong-huynh-quoc-thai-duoc-bau-giu-chuc-vu-bi-thu-thi-uy-tan-chau-1076131.vov",
                "title": "Ông Huỳnh Quốc Thái được bầu giữ chức vụ Bí thư Thị ủy Tân Châu",
                "reader_link": "",
                "thumbnail": "",
                "date": "2020-08-01 22:20:49"
            },
            {
                "id": "6",
                "category": "chinh-tri",
                "link": "https://vov.vn/chinh-tri/bo-chinh-tri-lam-viec-ve-chuan-bi-dai-hoi-cac-dang-bo-truc-thuoc-tu-1077133.vov",
                "title": "Bộ Chính trị làm việc về chuẩn bị Đại hội các đảng bộ trực thuộc TƯ",
                "reader_link": "",
                "thumbnail": "",
                "date": "2020-08-01 22:20:49"
            },
            {
                "id": "23",
                "category": "chinh-tri",
                "link": "https://vov.vn/chinh-tri/trao-quyet-dinh-cho-quyen-truong-ban-bql-lang-chu-tich-ho-chi-minh-1076060.vov",
                "title": "Trao quyết định cho quyền Trưởng ban BQL Lăng Chủ tịch Hồ Chí Minh",
                "reader_link": "",
                "thumbnail": "",
                "date": "2020-08-01 22:20:49"
            },
            {
                "id": "7",
                "category": "chinh-tri",
                "link": "https://vov.vn/chinh-tri/thu-tuong-kiem-tra-tien-do-thi-cong-cao-toc-trung-luong-my-thuan-1077019.vov",
                "title": "Thủ tướng kiểm tra tiến độ thi công cao tốc Trung Lương - Mỹ Thuận",
                "reader_link": "",
                "thumbnail": "",
                "date": "2020-08-01 22:20:49"
            },
            {
                "id": "24",
                "category": "chinh-tri",
                "link": "https://vov.vn/chinh-tri/pho-thu-tuong-pham-binh-minh-thi-sat-khu-vuc-bien-gioi-tai-lao-cai-1076047.vov",
                "title": "Phó Thủ tướng Phạm Bình Minh thị sát khu vực biên giới tại Lào Cai",
                "reader_link": "",
                "thumbnail": "",
                "date": "2020-08-01 22:20:49"
            },
            {
                "id": "8",
                "category": "chinh-tri",
                "link": "https://vov.vn/chinh-tri/khi-doi-ngu-tri-thuc-van-nghe-sy-vung-manh-se-nang-tam-tri-tue-dan-toc-1076941.vov",
                "title": "Khi đội ngũ trí thức, văn nghệ sỹ vững mạnh sẽ nâng tầm trí tuệ dân tộc",
                "reader_link": "",
                "thumbnail": "",
                "date": "2020-08-01 22:20:49"
            }
        ]
        },
        "tin su kien": {
            "name_vi" : "Tin tức sự kiện",
            "data" : [
                {
                    "id": "309",
                    "category": "cong-nghe",
                    "link": "https://vov.vn/cong-nghe/tim-loi-giai-cho-bai-toan-phat-trien-nguon-thu-cho-bao-chi-viet-nam-1073739.vov",
                    "title": "Tìm lời giải cho bài toán phát triển nguồn thu cho báo chí Việt Nam",
                    "reader_link": "",
                    "thumbnail": "",
                    "date": "2020-08-01 22:20:52"
                },
        {
            "id": "294",
            "category": "cong-nghe",
            "link": "https://vov.vn/cong-nghe/microsoft-tim-cach-mua-lai-tiktok-1077232.vov",
            "title": "Microsoft tìm cách mua lại TikTok",
            "reader_link": "",
            "thumbnail": "",
            "date": "2020-08-01 22:20:52"
        },
        {
            "id": "310",
            "category": "cong-nghe",
            "link": "https://vov.vn/cong-nghe/nhan-vien-robot-phat-dong-lan-song-tu-dong-hoa-trong-nganh-ban-le-1073474.vov",
            "title": "Nhân viên robot: Phát động làn sóng tự động hóa trong ngành bán lẻ",
            "reader_link": "",
            "thumbnail": "",
            "date": "2020-08-01 22:20:52"
        },
        {
            "id": "295",
            "category": "cong-nghe",
            "link": "https://vov.vn/cong-nghe/khau-trang-dien-tu-bluezone-vuot-1-trieu-luot-cai-dat-trong-4-ngay-1076898.vov",
            "title": "“Khẩu trang điện tử” Bluezone vượt 1 triệu lượt cài đặt trong 4 ngày",
            "reader_link": "",
            "thumbnail": "",
            "date": "2020-08-01 22:20:52"
        },
        {
            "id": "311",
            "category": "cong-nghe",
            "link": "https://vov.vn/cong-nghe/smartphone-sieu-nho-ra-mat-nguoi-dung-1073357.vov",
            "title": "Smartphone siêu nhỏ ra mắt người dùng",
            "reader_link": "",
            "thumbnail": "",
            "date": "2020-08-01 22:20:52"
        },
        {
            "id": "296",
            "category": "cong-nghe",
            "link": "https://vov.vn/cong-nghe/google-va-facebook-co-the-bi-phat-hang-tram-trieu-aud-tai-australia-1076860.vov",
            "title": "Google và Facebook có thể bị phạt hàng trăm triệu AUD tại Australia",
            "reader_link": "",
            "thumbnail": "",
            "date": "2020-08-01 22:20:52"
        },
        {
            "id": "312",
            "category": "cong-nghe",
            "link": "https://vov.vn/cong-nghe/bao-chi-dung-cong-nghe-de-tao-ra-doanh-thu-va-gia-tri-moi-cho-minh-1073331.vov",
            "title": "Báo chí dùng công nghệ để tạo ra doanh thu và giá trị mới cho mình",
            "reader_link": "",
            "thumbnail": "",
            "date": "2020-08-01 22:20:52"
        },
        {
            "id": "297",
            "category": "cong-nghe",
            "link": "https://vov.vn/cong-nghe/9-phu-kien-giup-game-thu-chinh-phuc-dinh-cao-moi-1076764.vov",
            "title": "9 phụ kiện giúp game thủ chinh phục đỉnh cao mới",
            "reader_link": "",
            "thumbnail": "",
            "date": "2020-08-01 22:20:52"
        },
        {
            "id": "313",
            "category": "cong-nghe",
            "link": "https://vov.vn/cong-nghe/ha-vien-my-bo-phieu-cam-su-dung-tik-tok-tren-cac-thiet-bi-chinh-phu-1073066.vov",
            "title": "Hạ viện Mỹ bỏ phiếu cấm sử dụng Tik Tok trên các thiết bị Chính phủ",
            "reader_link": "",
            "thumbnail": "",
            "date": "2020-08-01 22:20:52"
        },
        {
            "id": "298",
            "category": "cong-nghe",
            "link": "https://vov.vn/cong-nghe/tik-tok-moi-quan-ngai-chung-cua-google-facebook-va-chinh-phu-my-1076508.vov",
            "title": "Tik Tok – mối quan ngại chung của Google, Facebook và Chính phủ Mỹ",
            "reader_link": "",
            "thumbnail": "",
            "date": "2020-08-01 22:20:52"
        },
        {
            "id": "314",
            "category": "cong-nghe",
            "link": "https://vov.vn/cong-nghe/hang-sieu-xe-mclaren-hop-tac-cung-klipsch-de-san-xuat-tai-nghe-1072777.vov",
            "title": "Hãng siêu xe McLaren hợp tác cùng Klipsch để sản xuất tai nghe",
            "reader_link": "",
            "thumbnail": "",
            "date": "2020-08-01 22:20:52"
        },
        {
            "id": "315",
            "category": "cong-nghe",
            "link": "https://vov.vn/cong-nghe/nhung-camera-dinh-cao-giup-giam-sat-va-bao-ve-an-toan-nha-ban-1072479.vov",
            "title": "Những camera đỉnh cao giúp giám sát và bảo vệ an toàn nhà bạn",
            "reader_link": "",
            "thumbnail": "",
            "date": "2020-08-01 22:20:52"
        },
        {
            "id": "299",
            "category": "cong-nghe",
            "link": "https://vov.vn/cong-nghe/vi-sao-toi-pham-cong-nghe-cao-an-cap-duoc-thong-tin-ca-nhan-1076384.vov",
            "title": "Vì sao tội phạm công nghệ cao “ăn cắp” được thông tin cá nhân?",
            "reader_link": "",
            "thumbnail": "",
            "date": "2020-08-01 22:20:52"
        },
        {
            "id": "316",
            "category": "cong-nghe",
            "link": "https://vov.vn/cong-nghe/samsung-tiep-buoc-apple-loai-bo-bo-sac-di-kem-smartphone-1072187.vov",
            "title": "Samsung tiếp bước Apple loại bỏ bộ sạc đi kèm smartphone",
            "reader_link": "",
            "thumbnail": "",
            "date": "2020-08-01 22:20:52"
        },
    ]}
};

// let dataMenu = [
//     {key: 'tin-thiet-ke',name_vi:'Tin Thiết Kế', hidden:0, data:data},
//     {key: 'tin-chuyen-nganh',name_vi:'Tin Chuyên Ngành', hidden:0, data:data},
// ];

class NewsScreen extends React.Component {


    state = {
        news_data: null,
        stateCount: 0.0,
        configMenu: Def.config_news_menu
    };

    constructor(props){
        super(props);
        // console.log("Def.news", JSON.stringify(Def.news_data));
        this.onNewsSuccess     = this.onNewsSuccess.bind(this);
        this.onNewsFailed     = this.onNewsFailed.bind(this);
        this.formatText    = this.formatText.bind(this);
        this.refresh     = this.refresh.bind(this);
        this.reloadData = this.reloadData.bind(this);

        if(!Def.news_data) {
            NetNews.listNews(this.onNewsSuccess, this.onNewsFailed);
        }
        else if (!Def.config_news_menu) {
            Def.config_news_menu = this.createConfigData(Def.news_data);
            // this.setState({configMenu: Def.config_news_menu});
        }

        this.state = {
            news_data: Def.news_data,
            stateCount: 0.0,
            configMenu: Def.config_news_menu
        };
        Def.mainNavigate = this.props.navigation;
    }

    refresh()
    {
        //NetChannel.listChannel(this.onChannelSuccess,this.onChannelFailed);
        this.setState({ stateCount: Math.random() });
    }

    onNewsSuccess(data){
        Object.entries(data["data"]).map((prop, key) => {
        });
        this.setState({ news_data: data["data"] });
        Def.news_data = data["data"];
        Def.config_news_menu = this.createConfigData(data["data"]) ;
        this.setState({ configMenu: Def.config_news_menu});
    }

    createConfigData(data){

        if(data){
            let configData =  Object.entries(data).map((prop, key) => {
                // console.log("Props : " + JSON.stringify(prop));
                return {key: prop[0],name_vi:prop[1]["name_vi"], hidden:0, data:prop[1]["data"]};
            });
            return configData;
        }

    }

    onNewsFailed(data){
        console.log("false data : " + data);
    }

    formatText(text){
        let rs = text;
        if(text && text.length > 10){
            rs = text.substring(0, 20) ;
        }
        return rs;
    }

    shouldComponentUpdate(){
        // this.setState({ configMenu: Def.config_news_menu});
        // console.log('SortData ddd:' + JSON.stringify(this.props.route));
        return true;
    }

    getNewDataByConfigKey(key){

    }

    componentDidMount(){
        if(!Def.news_data) {
            NetNews.listNews(this.onNewsSuccess, this.onNewsFailed);
        }
        else if (!Def.config_news_menu) {
            Def.config_news_menu = this.createConfigData(Def.news_data);
            this.setState({configMenu: Def.config_news_menu});
        }

    }

    reloadData(){
        if(!Def.news_data) {
            NetNews.listNews(this.onNewsSuccess, this.onNewsFailed);
        }
        else if (!Def.config_news_menu) {
            Def.config_news_menu = this.createConfigData(Def.news_data);
            this.setState({configMenu: Def.config_news_menu});
        }
    }



    render() {
        const {navigation} = this.props;
        const configMenu = Def.config_news_menu;
        return (
            <View style={{flex:1}}>
                {
                    configMenu ?
                    <ScrollableTabView  style={{flex:1}} renderTabBar={() => <MyCustomizeTabBar navigation={navigation}/>}>
                        {
                            configMenu && Object.entries(configMenu).map((prop, key) => {
                                if ((prop[1]["hidden"]) == 0) {
                                    return (
                                        <NewsTab key={prop[0] + "acv"} navigation={navigation} refresh={this.refresh}
                                                 tabLabel={this.formatText(prop[1]["name_vi"])}
                                                 title={this.formatText(prop[1]["name_vi"])} data={prop[1]["data"]}/>
                                    );
                                }
                            })
                        }
                    </ScrollableTabView>
                        :
                            <View style={{justifyContent :'center', alignItems : 'center', width: width, height: height}}>
                                <Text style={{fontSize:Style.TITLE_SIZE, color:'#b3b3b3'}}>
                                    Ứng dụng đang tải dữ liệu.
                                </Text>
                                <TouchableOpacity onPress={this.reloadData}>
                                    <Text style={{fontSize:Style.TITLE_SIZE, marginLeft:5 , color:Style.DEFAUT_RED_COLOR}}>
                                        Tải lại
                                    </Text>
                                </TouchableOpacity>
                            </View>
                }



            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        paddingLeft: 15,
        // justifyContent: 'flex-start',
        // marginVertical : 5,
        marginBottom : 125,
        backgroundColor: '#fff'
    },
    slider: {
        justifyContent: 'center',
        paddingTop: 5,
        padding: 8,
        height: 120,
        borderRadius: 5,
        backgroundColor: "#e6e6e6",
        marginRight : 15
    },
    cardStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width-20,
        height: width/2,

    },
    programListStyle : {

    },
    itemImage: {
        width: PROGRAM_IMAGE_WIDTH -5,
        height : PROGRAM_IMAGE_HEIGHT -5,
        borderRadius: 5,
    },
});

export default NewsScreen;
