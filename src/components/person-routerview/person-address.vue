<template>
<div class="container">
    <div class="row">
        <div class="col-xs-12 address-pa" v-for="(item,index) in addressList">
            <span>收货人：<strong>{{item.name}}</strong></span>
            <span>收货地址：<strong>{{item.shen}}{{item.shi}}{{item.qu}}{{item.address}}</strong></span>
            <span style="float: right;margin-left: 20px" class="cursor"><strong @click="boxshow(item.aid)">修改</strong> <strong @click="deladdress(item.aid)">删除</strong></span>
            <span style="float: right">手机号码：<strong>{{item.phone}}</strong></span>
        </div>
    </div>


    <div class="row" style="margin-top: 50px">
        <div class="col-xs-12 cpb" id="addAddress" style="display: none">
            <div class="col-lg-6">
                姓名
                <input type="text" class="my-input-cp" v-model.lazy="addressDetails.name">
            </div>
            <div class="col-lg-6">
                你的手机号*
                <input type="text" class="my-input-cp" placeholder="例如：136 1000 0000" v-model="addressDetails.phone">
            </div>
            <div class="col-lg-6 cp-flex">
                <div >
                    省份 *
                    <select name="uaddress" v-model.lazy="addressDetails.shen" class="cp-option">
                        <option :value=item.value v-for="(item,index) in ssq">{{item.value}}</option>
                    </select>
                </div>
                <div >
                    城市 *
                    <select name="uaddress" class="cp-option" v-model.lazy="addressDetails.shi">
                        <option :value=item.value v-for="(item,index) in ssqshi">{{item.value}}</option>
                    </select>
                </div>
                <div >
                    区 *
                    <select name="uaddress" class="cp-option" v-model.lazy="addressDetails.qu">
                        <option :value=item.value v-for="(item,index) in ssqqu">{{item.value}}</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-6">
                固定电话
                <input type="text" class="my-input-cp" placeholder="例如：0755-123-456" v-model.lazy="addressDetails.tel">
            </div>
            <div class="col-lg-6">
                详细地址 *
                <input type="text" class="my-input-cp" v-model.lazy="addressDetails.address">
            </div>
            <div class="col-lg-6">
                邮编
                <input type="text" class="my-input-cp" placeholder="例如：20000" v-model.lazy="addressDetails.mail">
            </div>
            <div class="col-xs-12">
                <span class="my-button-sc-pd cursor" @click="addressSave()">保存</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default{
        data(){
            return {
                urlAdree:this.carousel.data().address,
                uid:0,
                user:{username:'nobabdy',userid:'0',phone:'123'},
                addressList:[],
                data:'{"code":1,"msg":"获取成功！","data":[{"label":"11","value":"北京市","children":[{"label":"1101","value":"市辖区","children":[{"label":"110101","value":"东城区"},{"label":"110102","value":"西城区"},{"label":"110105","value":"朝阳区"},{"label":"110106","value":"丰台区"},{"label":"110107","value":"石景山区"},{"label":"110108","value":"海淀区"},{"label":"110109","value":"门头沟区"},{"label":"110111","value":"房山区"},{"label":"110112","value":"通州区"},{"label":"110113","value":"顺义区"},{"label":"110114","value":"昌平区"},{"label":"110115","value":"大兴区"},{"label":"110116","value":"怀柔区"},{"label":"110117","value":"平谷区"},{"label":"110118","value":"密云区"},{"label":"110119","value":"延庆区"}]}]},{"label":"12","value":"天津市","children":[{"label":"1201","value":"市辖区","children":[{"label":"120101","value":"和平区"},{"label":"120102","value":"河东区"},{"label":"120103","value":"河西区"},{"label":"120104","value":"南开区"},{"label":"120105","value":"河北区"},{"label":"120106","value":"红桥区"},{"label":"120110","value":"东丽区"},{"label":"120111","value":"西青区"},{"label":"120112","value":"津南区"},{"label":"120113","value":"北辰区"},{"label":"120114","value":"武清区"},{"label":"120115","value":"宝坻区"},{"label":"120116","value":"滨海新区"},{"label":"120117","value":"宁河区"},{"label":"120118","value":"静海区"},{"label":"120119","value":"蓟州区"}]}]},{"label":"13","value":"河北省","children":[{"label":"1301","value":"石家庄市","children":[{"label":"130102","value":"长安区"},{"label":"130104","value":"桥西区"},{"label":"130105","value":"新华区"},{"label":"130107","value":"井陉矿区"},{"label":"130108","value":"裕华区"},{"label":"130109","value":"藁城区"},{"label":"130110","value":"鹿泉区"},{"label":"130111","value":"栾城区"},{"label":"130121","value":"井陉县"},{"label":"130123","value":"正定县"},{"label":"130125","value":"行唐县"},{"label":"130126","value":"灵寿县"},{"label":"130127","value":"高邑县"},{"label":"130128","value":"深泽县"},{"label":"130129","value":"赞皇县"},{"label":"130130","value":"无极县"},{"label":"130131","value":"平山县"},{"label":"130132","value":"元氏县"},{"label":"130133","value":"赵县"},{"label":"130183","value":"晋州市"},{"label":"130184","value":"新乐市"},{"label":"130181","value":"辛集市"}]},{"label":"1302","value":"唐山市","children":[{"label":"130202","value":"路南区"},{"label":"130203","value":"路北区"},{"label":"130204","value":"古冶区"},{"label":"130205","value":"开平区"},{"label":"130207","value":"丰南区"},{"label":"130208","value":"丰润区"},{"label":"130209","value":"曹妃甸区"},{"label":"130223","value":"滦县"},{"label":"130224","value":"滦南县"},{"label":"130225","value":"乐亭县"},{"label":"130227","value":"迁西县"},{"label":"130229","value":"玉田县"},{"label":"130281","value":"遵化市"},{"label":"130283","value":"迁安市"}]},{"label":"1303","value":"秦皇岛市","children":[{"label":"130302","value":"海港区"},{"label":"130303","value":"山海关区"},{"label":"130304","value":"北戴河区"},{"label":"130306","value":"抚宁区"},{"label":"130321","value":"青龙满族自治县"},{"label":"130322","value":"昌黎县"},{"label":"130324","value":"卢龙县"}]},{"label":"1304","value":"邯郸市","children":[{"label":"130402","value":"邯山区"},{"label":"130403","value":"丛台区"},{"label":"130404","value":"复兴区"},{"label":"130406","value":"峰峰矿区"},{"label":"130421","value":"邯郸县"},{"label":"130423","value":"临漳县"},{"label":"130424","value":"成安县"},{"label":"130425","value":"大名县"},{"label":"130426","value":"涉县"},{"label":"130427","value":"磁县"},{"label":"130428","value":"肥乡县"},{"label":"130429","value":"永年县"},{"label":"130430","value":"邱县"},{"label":"130431","value":"鸡泽县"},{"label":"130432","value":"广平县"},{"label":"130433","value":"馆陶县"},{"label":"130434","value":"魏县"},{"label":"130435","value":"曲周县"},{"label":"130481","value":"武安市"}]},{"label":"1305","value":"邢台市","children":[{"label":"130502","value":"桥东区"},{"label":"130503","value":"桥西区"},{"label":"130521","value":"邢台县"},{"label":"130522","value":"临城县"},{"label":"130523","value":"内丘县"},{"label":"130524","value":"柏乡县"},{"label":"130525","value":"隆尧县"},{"label":"130526","value":"任县"},{"label":"130527","value":"南和县"},{"label":"130528","value":"宁晋县"},{"label":"130529","value":"巨鹿县"},{"label":"130530","value":"新河县"},{"label":"130531","value":"广宗县"},{"label":"130532","value":"平乡县"},{"label":"130533","value":"威县"},{"label":"130534","value":"清河县"},{"label":"130535","value":"临西县"},{"label":"130581","value":"南宫市"},{"label":"130582","value":"沙河市"}]},{"label":"1306","value":"保定市","children":[{"label":"130602","value":"竞秀区"},{"label":"130606","value":"莲池区"},{"label":"130607","value":"满城区"},{"label":"130608","value":"清苑区"},{"label":"130609","value":"徐水区"},{"label":"130623","value":"涞水县"},{"label":"130624","value":"阜平县"},{"label":"130626","value":"定兴县"},{"label":"130627","value":"唐县"},{"label":"130628","value":"高阳县"},{"label":"130629","value":"容城县"},{"label":"130630","value":"涞源县"},{"label":"130631","value":"望都县"},{"label":"130632","value":"安新县"},{"label":"130633","value":"易县"},{"label":"130634","value":"曲阳县"},{"label":"130635","value":"蠡县"},{"label":"130636","value":"顺平县"},{"label":"130637","value":"博野县"},{"label":"130638","value":"雄县"},{"label":"130681","value":"涿州市"},{"label":"130683","value":"安国市"},{"label":"130684","value":"高碑店市"}]},{"label":"1307","value":"张家口市","children":[{"label":"130702","value":"桥东区"},{"label":"130703","value":"桥西区"},{"label":"130705","value":"宣化区"},{"label":"130706","value":"下花园区"},{"label":"130708","value":"万全区"},{"label":"130709","value":"崇礼区"},{"label":"130722","value":"张北县"},{"label":"130723","value":"康保县"},{"label":"130724","value":"沽源县"},{"label":"130725","value":"尚义县"},{"label":"130726","value":"蔚县"},{"label":"130727","value":"阳原县"},{"label":"130728","value":"怀安县"},{"label":"130730","value":"怀来县"},{"label":"130731","value":"涿鹿县"},{"label":"130732","value":"赤城县"}]},{"label":"1308","value":"承德市","children":[{"label":"130802","value":"双桥区"},{"label":"130803","value":"双滦区"},{"label":"130804","value":"鹰手营子矿区"},{"label":"130821","value":"承德县"},{"label":"130822","value":"兴隆县"},{"label":"130823","value":"平泉县"},{"label":"130824","value":"滦平县"},{"label":"130825","value":"隆化县"},{"label":"130826","value":"丰宁满族自治县"},{"label":"130827","value":"宽城满族自治县"},{"label":"130828","value":"围场满族蒙古族自治县"}]},{"label":"1309","value":"沧州市","children":[{"label":"130902","value":"新华区"},{"label":"130903","value":"运河区"},{"label":"130921","value":"沧县"},{"label":"130922","value":"青县"},{"label":"130923","value":"东光县"},{"label":"130924","value":"海兴县"},{"label":"130925","value":"盐山县"},{"label":"130926","value":"肃宁县"},{"label":"130927","value":"南皮县"},{"label":"130928","value":"吴桥县"},{"label":"130929","value":"献县"},{"label":"130930","value":"孟村回族自治县"},{"label":"130981","value":"泊头市"},{"label":"130982","value":"任丘市"},{"label":"130983","value":"黄骅市"},{"label":"130984","value":"河间市"}]},{"label":"1310","value":"廊坊市","children":[{"label":"131002","value":"安次区"},{"label":"131003","value":"广阳区"},{"label":"131022","value":"固安县"},{"label":"131023","value":"永清县"},{"label":"131024","value":"香河县"},{"label":"131025","value":"大城县"},{"label":"131026","value":"文安县"},{"label":"131028","value":"大厂回族自治县"},{"label":"131081","value":"霸州市"},{"label":"131082","value":"三河市"}]},{"label":"1311","value":"衡水市","children":[{"label":"131102","value":"桃城区"},{"label":"131103","value":"冀州区"},{"label":"131121","value":"枣强县"},{"label":"131122","value":"武邑县"},{"label":"131123","value":"武强县"},{"label":"131124","value":"饶阳县"},{"label":"131125","value":"安平县"},{"label":"131126","value":"故城县"},{"label":"131127","value":"景县"},{"label":"131128","value":"阜城县"},{"label":"131182","value":"深州市"}]},{"label":"1390","value":"省直辖县级","children":[{"label":"139001","value":"定州市"}]}]},{"label":"14","value":"山西省","children":[{"label":"1401","value":"太原市","children":[{"label":"140105","value":"小店区"},{"label":"140106","value":"迎泽区"},{"label":"140107","value":"杏花岭区"},{"label":"140108","value":"尖草坪区"},{"label":"140109","value":"万柏林区"},{"label":"140110","value":"晋源区"},{"label":"140121","value":"清徐县"},{"label":"140122","value":"阳曲县"},{"label":"140123","value":"娄烦县"},{"label":"140181","value":"古交市"}]},{"label":"1402","value":"大同市","children":[{"label":"140202","value":"城区"},{"label":"140203","value":"矿区"},{"label":"140211","value":"南郊区"},{"label":"140212","value":"新荣区"},{"label":"140221","value":"阳高县"},{"label":"140222","value":"天镇县"},{"label":"140223","value":"广灵县"},{"label":"140224","value":"灵丘县"},{"label":"140225","value":"浑源县"},{"label":"140226","value":"左云县"},{"label":"140227","value":"大同县"}]},{"label":"1403","value":"阳泉市","children":[{"label":"140302","value":"城区"},{"label":"140303","value":"矿区"},{"label":"140311","value":"郊区"},{"label":"140321","value":"平定县"},{"label":"140322","value":"盂县"}]},{"label":"1404","value":"长治市","children":[{"label":"140402","value":"城区"},{"label":"140411","value":"郊区"},{"label":"140421","value":"长治县"},{"label":"140423","value":"襄垣县"},{"label":"140424","value":"屯留县"},{"label":"140425","value":"平顺县"},{"label":"140426","value":"黎城县"},{"label":"140427","value":"壶关县"},{"label":"140428","value":"长子县"},{"label":"140429","value":"武乡县"},{"label":"140430","value":"沁县"},{"label":"140431","value":"沁源县"},{"label":"140481","value":"潞城市"}]},{"label":"1405","value":"晋城市","children":[{"label":"140502","value":"城区"},{"label":"140521","value":"沁水县"},{"label":"140522","value":"阳城县"},{"label":"140524","value":"陵川县"},{"label":"140525","value":"泽州县"},{"label":"140581","value":"高平市"}]},{"label":"1406","value":"朔州市","children":[{"label":"140602","value":"朔城区"},{"label":"140603","value":"平鲁区"},{"label":"140621","value":"山阴县"},{"label":"140622","value":"应县"},{"label":"140623","value":"右玉县"},{"label":"140624","value":"怀仁县"}]},{"label":"1407","value":"晋中市","children":[{"label":"140702","value":"榆次区"},{"label":"140721","value":"榆社县"},{"label":"140722","value":"左权县"},{"label":"140723","value":"和顺县"},{"label":"140724","value":"昔阳县"},{"label":"140725","value":"寿阳县"},{"label":"140726","value":"太谷县"},{"label":"140727","value":"祁县"},{"label":"140728","value":"平遥县"},{"label":"140729","value":"灵石县"},{"label":"140781","value":"介休市"}]},{"label":"1408","value":"运城市","children":[{"label":"140802","value":"盐湖区"},{"label":"140821","value":"临猗县"},{"label":"140822","value":"万荣县"},{"label":"140823","value":"闻喜县"},{"label":"140824","value":"稷山县"},{"label":"140825","value":"新绛县"},{"label":"140826","value":"绛县"},{"label":"140827","value":"垣曲县"},{"label":"140828","value":"夏县"},{"label":"140829","value":"平陆县"},{"label":"140830","value":"芮城县"},{"label":"140881","value":"永济市"},{"label":"140882","value":"河津市"}]},{"label":"1409","value":"忻州市","children":[{"label":"140902","value":"忻府区"},{"label":"140921","value":"定襄县"},{"label":"140922","value":"五台县"},{"label":"140923","value":"代县"},{"label":"140924","value":"繁峙县"},{"label":"140925","value":"宁武县"},{"label":"140926","value":"静乐县"},{"label":"140927","value":"神池县"},{"label":"140928","value":"五寨县"},{"label":"140929","value":"岢岚县"},{"label":"140930","value":"河曲县"},{"label":"140931","value":"保德县"},{"label":"140932","value":"偏关县"},{"label":"140981","value":"原平市"}]},{"label":"1410","value":"临汾市","children":[{"label":"141002","value":"尧都区"},{"label":"141021","value":"曲沃县"},{"label":"141022","value":"翼城县"},{"label":"141023","value":"襄汾县"},{"label":"141024","value":"洪洞县"},{"label":"141025","value":"古县"},{"label":"141026","value":"安泽县"},{"label":"141027","value":"浮山县"},{"label":"141028","value":"吉县"},{"label":"141029","value":"乡宁县"},{"label":"141030","value":"大宁县"},{"label":"141031","value":"隰县"},{"label":"141032","value":"永和县"},{"label":"141033","value":"蒲县"},{"label":"141034","value":"汾西县"},{"label":"141081","value":"侯马市"},{"label":"141082","value":"霍州市"}]},{"label":"1411","value":"吕梁市","children":[{"label":"141102","value":"离石区"},{"label":"141121","value":"文水县"},{"label":"141122","value":"交城县"},{"label":"141123","value":"兴县"},{"label":"141124","value":"临县"},{"label":"141125","value":"柳林县"},{"label":"141126","value":"石楼县"},{"label":"141127","value":"岚县"},{"label":"141128","value":"方山县"},{"label":"141129","value":"中阳县"},{"label":"141130","value":"交口县"},{"label":"141181","value":"孝义市"},{"label":"141182","value":"汾阳市"}]}]},{"label":"15","value":"内蒙古","children":[{"label":"1501","value":"呼和浩特市","children":[{"label":"150102","value":"新城区"},{"label":"150103","value":"回民区"},{"label":"150104","value":"玉泉区"},{"label":"150105","value":"赛罕区"},{"label":"150121","value":"土默特左旗"},{"label":"150122","value":"托克托县"},{"label":"150123","value":"和林格尔县"},{"label":"150124","value":"清水河县"},{"label":"150125","value":"武川县"}]},{"label":"1502","value":"包头市","children":[{"label":"150202","value":"东河区"},{"label":"150203","value":"昆都仑区"},{"label":"150204","value":"青山区"},{"label":"150205","value":"石拐区"},{"label":"150206","value":"白云鄂博矿区"},{"label":"150207","value":"九原区"},{"label":"150221","value":"土默特右旗"},{"label":"150222","value":"固阳县"},{"label":"150223","value":"达尔罕茂明安联合旗"}]},{"label":"1503","value":"乌海市","children":[{"label":"150302","value":"海勃湾区"},{"label":"150303","value":"海南区"},{"label":"150304","value":"乌达区"}]},{"label":"1504","value":"赤峰市","children":[{"label":"150402","value":"红山区"},{"label":"150403","value":"元宝山区"},{"label":"150404","value":"松山区"},{"label":"150421","value":"阿鲁科尔沁旗"},{"label":"150422","value":"巴林左旗"},{"label":"150423","value":"巴林右旗"},{"label":"150424","value":"林西县"},{"label":"150425","value":"克什克腾旗"},{"label":"150426","value":"翁牛特旗"},{"label":"150428","value":"喀喇沁旗"},{"label":"150429","value":"宁城县"},{"label":"150430","value":"敖汉旗"}]},{"label":"1505","value":"通辽市","children":[{"label":"150502","value":"科尔沁区"},{"label":"150521","value":"科尔沁左翼中旗"},{"label":"150522","value":"科尔沁左翼后旗"},{"label":"150523","value":"开鲁县"},{"label":"150524","value":"库伦旗"},{"label":"150525","value":"奈曼旗"},{"label":"150526","value":"扎鲁特旗"},{"label":"150581","value":"霍林郭勒市"}]},{"label":"1506","value":"鄂尔多斯市","children":[{"label":"150602","value":"东胜区"},{"label":"150603","value":"康巴什区"},{"label":"150621","value":"达拉特旗"},{"label":"150622","value":"准格尔旗"},{"label":"150623","value":"鄂托克前旗"},{"label":"150624","value":"鄂托克旗"},{"label":"150625","value":"杭锦旗"},{"label":"150626","value":"乌审旗"},{"label":"150627","value":"伊金霍洛旗"}]},{"label":"1507","value":"呼伦贝尔市","children":[{"label":"150702","value":"海拉尔区"},{"label":"150703","value":"扎赉诺尔区"},{"label":"150721","value":"阿荣旗"},{"label":"150722","value":"莫力达瓦达斡尔族自治旗"},{"label":"150723","value":"鄂伦春自治旗"},{"label":"150724","value":"鄂温克族自治旗"},{"label":"150725","value":"陈巴尔虎旗"},{"label":"150726","value":"新巴尔虎左旗"},{"label":"150727","value":"新巴尔虎右旗"},{"label":"150781","value":"满洲里市"},{"label":"150782","value":"牙克石市"},{"label":"150783","value":"扎兰屯市"},{"label":"150784","value":"额尔古纳市"},{"label":"150785","value":"根河市"}]},{"label":"1508","value":"巴彦淖尔市","children":[{"label":"150802","value":"临河区"},{"label":"150821","value":"五原县"},{"label":"150822","value":"磴口县"},{"label":"150823","value":"乌拉特前旗"},{"label":"150824","value":"乌拉特中旗"},{"label":"150825","value":"乌拉特后旗"},{"label":"150826","value":"杭锦后旗"}]},{"label":"1509","value":"乌兰察布市","children":[{"label":"150902","value":"集宁区"},{"label":"150921","value":"卓资县"},{"label":"150922","value":"化德县"},{"label":"150923","value":"商都县"},{"label":"150924","value":"兴和县"},{"label":"150925","value":"凉城县"},{"label":"150926","value":"察哈尔右翼前旗"},{"label":"150927","value":"察哈尔右翼中旗"},{"label":"150928","value":"察哈尔右翼后旗"},{"label":"150929","value":"四子王旗"},{"label":"150981","value":"丰镇市"}]},{"label":"1522","value":"兴安盟","children":[{"label":"152201","value":"乌兰浩特市"},{"label":"152202","value":"阿尔山市"},{"label":"152221","value":"科尔沁右翼前旗"},{"label":"152222","value":"科尔沁右翼中旗"},{"label":"152223","value":"扎赉特旗"},{"label":"152224","value":"突泉县"}]},{"label":"1525","value":"锡林郭勒盟","children":[{"label":"152501","value":"二连浩特市"},{"label":"152502","value":"锡林浩特市"},{"label":"152522","value":"阿巴嘎旗"},{"label":"152523","value":"苏尼特左旗"},{"label":"152524","value":"苏尼特右旗"},{"label":"152525","value":"东乌珠穆沁旗"},{"label":"152526","value":"西乌珠穆沁旗"},{"label":"152527","value":"太仆寺旗"},{"label":"152528","value":"镶黄旗"},{"label":"152529","value":"正镶白旗"},{"label":"152530","value":"正蓝旗"},{"label":"152531","value":"多伦县"}]},{"label":"1529","value":"阿拉善盟","children":[{"label":"152921","value":"阿拉善左旗"},{"label":"152922","value":"阿拉善右旗"},{"label":"152923","value":"额济纳旗"}]}]},{"label":"21","value":"辽宁省","children":[{"label":"2101","value":"沈阳市","children":[{"label":"210102","value":"和平区"},{"label":"210103","value":"沈河区"},{"label":"210104","value":"大东区"},{"label":"210105","value":"皇姑区"},{"label":"210106","value":"铁西区"},{"label":"210111","value":"苏家屯区"},{"label":"210112","value":"浑南区"},{"label":"210113","value":"沈北新区"},{"label":"210114","value":"于洪区"},{"label":"210115","value":"辽中区"},{"label":"210123","value":"康平县"},{"label":"210124","value":"法库县"},{"label":"210181","value":"新民市"}]},{"label":"2102","value":"大连市","children":[{"label":"210202","value":"中山区"},{"label":"210203","value":"西岗区"},{"label":"210204","value":"沙河口区"},{"label":"210211","value":"甘井子区"},{"label":"210212","value":"旅顺口区"},{"label":"210213","value":"金州区"},{"label":"210214","value":"普兰店区"},{"label":"210224","value":"长海县"},{"label":"210281","value":"瓦房店市"},{"label":"210283","value":"庄河市"}]},{"label":"2103","value":"鞍山市","children":[{"label":"210302","value":"铁东区"},{"label":"210303","value":"铁西区"},{"label":"210304","value":"立山区"},{"label":"210311","value":"千山区"},{"label":"210321","value":"台安县"},{"label":"210323","value":"岫岩满族自治县"},{"label":"210381","value":"海城市"}]},{"label":"2104","value":"抚顺市","children":[{"label":"210402","value":"新抚区"},{"label":"210403","value":"东洲区"},{"label":"210404","value":"望花区"},{"label":"210411","value":"顺城区"},{"label":"210421","value":"抚顺县"},{"label":"210422","value":"新宾满族自治县"},{"label":"210423","value":"清原满族自治县"}]},{"label":"2105","value":"本溪市","children":[{"label":"210502","value":"平山区"},{"label":"210503","value":"溪湖区"},{"label":"210504","value":"明山区"},{"label":"210505","value":"南芬区"},{"label":"210521","value":"本溪满族自治县"},{"label":"210522","value":"桓仁满族自治县"}]},{"label":"2106","value":"丹东市","children":[{"label":"210602","value":"元宝区"},{"label":"210603","value":"振兴区"},{"label":"210604","value":"振安区"},{"label":"210624","value":"宽甸满族自治县"},{"label":"210681","value":"东港市"},{"label":"210682","value":"凤城市"}]},{"label":"2107","value":"锦州市","children":[{"label":"210702","value":"古塔区"},{"label":"210703","value":"凌河区"},{"label":"210711","value":"太和区"},{"label":"210726","value":"黑山县"},{"label":"210727","value":"义县"},{"label":"210781","value":"凌海市"},{"label":"210782","value":"北镇市"}]},{"label":"2108","value":"营口市","children":[{"label":"210802","value":"站前区"},{"label":"210803","value":"西市区"},{"label":"210804","value":"鲅鱼圈区"},{"label":"210811","value":"老边区"},{"label":"210881","value":"盖州市"},{"label":"210882","value":"大石桥市"}]},{"label":"2109","value":"阜新市","children":[{"label":"210902","value":"海州区"},{"label":"210903","value":"新邱区"},{"label":"210904","value":"太平区"},{"label":"210905","value":"清河门区"},{"label":"210911","value":"细河区"},{"label":"210921","value":"阜新蒙古族自治县"},{"label":"210922","value":"彰武县"}]},{"label":"2110","value":"辽阳市","children":[{"label":"211002","value":"白塔区"},{"label":"211003","value":"文圣区"},{"label":"211004","value":"宏伟区"},{"label":"211005","value":"弓长岭区"},{"label":"211011","value":"太子河区"},{"label":"211021","value":"辽阳县"},{"label":"211081","value":"灯塔市"}]},{"label":"2111","value":"盘锦市","children":[{"label":"211102","value":"双台子区"},{"label":"211103","value":"兴隆台区"},{"label":"211104","value":"大洼区"},{"label":"211122","value":"盘山县"}]},{"label":"2112","value":"铁岭市","children":[{"label":"211202","value":"银州区"},{"label":"211204","value":"清河区"},{"label":"211221","value":"铁岭县"},{"label":"211223","value":"西丰县"},{"label":"211224","value":"昌图县"},{"label":"211281","value":"调兵山市"},{"label":"211282","value":"开原市"}]},{"label":"2113","value":"朝阳市","children":[{"label":"211302","value":"双塔区"},{"label":"211303","value":"龙城区"},{"label":"211321","value":"朝阳县"},{"label":"211322","value":"建平县"},{"label":"211324","value":"喀喇沁左翼蒙古族自治县"},{"label":"211381","value":"北票市"},{"label":"211382","value":"凌源市"}]},{"label":"2114","value":"葫芦岛市","children":[{"label":"211402","value":"连山区"},{"label":"211403","value":"龙港区"},{"label":"211404","value":"南票区"},{"label":"211421","value":"绥中县"},{"label":"211422","value":"建昌县"},{"label":"211481","value":"兴城市"}]}]},{"label":"22","value":"吉林省","children":[{"label":"2201","value":"长春市","children":[{"label":"220102","value":"南关区"},{"label":"220103","value":"宽城区"},{"label":"220104","value":"朝阳区"},{"label":"220105","value":"二道区"},{"label":"220106","value":"绿园区"},{"label":"220112","value":"双阳区"},{"label":"220113","value":"九台区"},{"label":"220122","value":"农安县"},{"label":"220182","value":"榆树市"},{"label":"220183","value":"德惠市"}]},{"label":"2202","value":"吉林市","children":[{"label":"220202","value":"昌邑区"},{"label":"220203","value":"龙潭区"},{"label":"220204","value":"船营区"},{"label":"220211","value":"丰满区"},{"label":"220221","value":"永吉县"},{"label":"220281","value":"蛟河市"},{"label":"220282","value":"桦甸市"},{"label":"220283","value":"舒兰市"},{"label":"220284","value":"磐石市"}]},{"label":"2203","value":"四平市","children":[{"label":"220302","value":"铁西区"},{"label":"220303","value":"铁东区"},{"label":"220322","value":"梨树县"},{"label":"220323","value":"伊通满族自治县"},{"label":"220381","value":"公主岭市"},{"label":"220382","value":"双辽市"}]},{"label":"2204","value":"辽源市","children":[{"label":"220402","value":"龙山区"},{"label":"220403","value":"西安区"},{"label":"220421","value":"东丰县"},{"label":"220422","value":"东辽县"}]},{"label":"2205","value":"通化市","children":[{"label":"220502","value":"东昌区"},{"label":"220503","value":"二道江区"},{"label":"220521","value":"通化县"},{"label":"220523","value":"辉南县"},{"label":"220524","value":"柳河县"},{"label":"220581","value":"梅河口市"},{"label":"220582","value":"集安市"}]},{"label":"2206","value":"白山市","children":[{"label":"220602","value":"浑江区"},{"label":"220605","value":"江源区"},{"label":"220621","value":"抚松县"},{"label":"220622","value":"靖宇县"},{"label":"220623","value":"长白朝鲜族自治县"},{"label":"220681","value":"临江市"}]},{"label":"2207","value":"松原市","children":[{"label":"220702","value":"宁江区"},{"label":"220721","value":"前郭尔罗斯蒙古族自治县"},{"label":"220722","value":"长岭县"},{"label":"220723","value":"乾安县"},{"label":"220781","value":"扶余市"}]},{"label":"2208","value":"白城市","children":[{"label":"220802","value":"洮北区"},{"label":"220821","value":"镇赉县"},{"label":"220822","value":"通榆县"},{"label":"220881","value":"洮南市"},{"label":"220882","value":"大安市"}]},{"label":"2224","value":"延边朝鲜族自治州","children":[{"label":"222401","value":"延吉市"},{"label":"222402","value":"图们市"},{"label":"222403","value":"敦化市"},{"label":"222404","value":"珲春市"},{"label":"222405","value":"龙井市"},{"label":"222406","value":"和龙市"},{"label":"222424","value":"汪清县"},{"label":"222426","value":"安图县"}]}]},{"label":"23","value":"黑龙江","children":[{"label":"2301","value":"哈尔滨市","children":[{"label":"230102","value":"道里区"},{"label":"230103","value":"南岗区"},{"label":"230104","value":"道外区"},{"label":"230108","value":"平房区"},{"label":"230109","value":"松北区"},{"label":"230110","value":"香坊区"},{"label":"230111","value":"呼兰区"},{"label":"230112","value":"阿城区"},{"label":"230113","value":"双城区"},{"label":"230123","value":"依兰县"},{"label":"230124","value":"方正县"},{"label":"230125","value":"宾县"},{"label":"230126","value":"巴彦县"},{"label":"230127","value":"木兰县"},{"label":"230128","value":"通河县"},{"label":"230129","value":"延寿县"},{"label":"230183","value":"尚志市"},{"label":"230184","value":"五常市"}]},{"label":"2302","value":"齐齐哈尔市","children":[{"label":"230202","value":"龙沙区"},{"label":"230203","value":"建华区"},{"label":"230204","value":"铁锋区"},{"label":"230205","value":"昂昂溪区"},{"label":"230206","value":"富拉尔基区"},{"label":"230207","value":"碾子山区"},{"label":"230208","value":"梅里斯达斡尔族区"},{"label":"230221","value":"龙江县"},{"label":"230223","value":"依安县"},{"label":"230224","value":"泰来县"},{"label":"230225","value":"甘南县"},{"label":"230227","value":"富裕县"},{"label":"230229","value":"克山县"},{"label":"230230","value":"克东县"},{"label":"230231","value":"拜泉县"},{"label":"230281","value":"讷河市"}]},{"label":"2303","value":"鸡西市","children":[{"label":"230302","value":"鸡冠区"},{"label":"230303","value":"恒山区"},{"label":"230304","value":"滴道区"},{"label":"230305","value":"梨树区"},{"label":"230306","value":"城子河区"},{"label":"230307","value":"麻山区"},{"label":"230321","value":"鸡东县"},{"label":"230381","value":"虎林市"},{"label":"230382","value":"密山市"}]},{"label":"2304","value":"鹤岗市","children":[{"label":"230402","value":"向阳区"},{"label":"230403","value":"工农区"},{"label":"230404","value":"南山区"},{"label":"230405","value":"兴安区"},{"label":"230406","value":"东山区"},{"label":"230407","value":"兴山区"},{"label":"230421","value":"萝北县"},{"label":"230422","value":"绥滨县"}]},{"label":"2305","value":"双鸭山市","children":[{"label":"230502","value":"尖山区"},{"label":"230503","value":"岭东区"},{"label":"230505","value":"四方台区"},{"label":"230506","value":"宝山区"},{"label":"230521","value":"集贤县"},{"label":"230522","value":"友谊县"},{"label":"230523","value":"宝清县"},{"label":"230524","value":"饶河县"}]},{"label":"2306","value":"大庆市","children":[{"label":"230602","value":"萨尔图区"},{"label":"230603","value":"龙凤区"},{"label":"230604","value":"让胡路区"},{"label":"230605","value":"红岗区"},{"label":"230606","value":"大同区"},{"label":"230621","value":"肇州县"},{"label":"230622","value":"肇源县"},{"label":"230623","value":"林甸县"},{"label":"230624","value":"杜尔伯特蒙古族自治县"}]},{"label":"2307","value":"伊春市","children":[{"label":"230702","value":"伊春区"},{"label":"230703","value":"南岔区"},{"label":"230704","value":"友好区"},{"label":"230705","value":"西林区"},{"label":"230706","value":"翠峦区"},{"label":"230707","value":"新青区"},{"label":"230708","value":"美溪区"},{"label":"230709","value":"金山屯区"},{"label":"230710","value":"五营区"},{"label":"230711","value":"乌马河区"},{"label":"230712","value":"汤旺河区"},{"label":"230713","value":"带岭区"},{"label":"230714","value":"乌伊岭区"},{"label":"230715","value":"红星区"},{"label":"230716","value":"上甘岭区"},{"label":"230722","value":"嘉荫县"},{"label":"230781","value":"铁力市"}]},{"label":"2308","value":"佳木斯市","children":[{"label":"230803","value":"向阳区"},{"label":"230804","value":"前进区"},{"label":"230805","value":"东风区"},{"label":"230811","value":"郊区"},{"label":"230822","value":"桦南县"},{"label":"230826","value":"桦川县"},{"label":"230828","value":"汤原县"},{"label":"230881","value":"同江市"},{"label":"230882","value":"富锦市"},{"label":"230883","value":"抚远市"}]},{"label":"2309","value":"七台河市","children":[{"label":"230902","value":"新兴区"},{"label":"230903","value":"桃山区"},{"label":"230904","value":"茄子河区"},{"label":"230921","value":"勃利县"}]},{"label":"2310","value":"牡丹江市","children":[{"label":"231002","value":"东安区"},{"label":"231003","value":"阳明区"},{"label":"231004","value":"爱民区"},{"label":"231005","value":"西安区"},{"label":"231025","value":"林口县"},{"label":"231081","value":"绥芬河市"},{"label":"231083","value":"海林市"},{"label":"231084","value":"宁安市"},{"label":"231085","value":"穆棱市"},{"label":"231086","value":"东宁市"}]},{"label":"2311","value":"黑河市","children":[{"label":"231102","value":"爱辉区"},{"label":"231121","value":"嫩江县"},{"label":"231123","value":"逊克县"},{"label":"231124","value":"孙吴县"},{"label":"231181","value":"北安市"},{"label":"231182","value":"五大连池市"}]},{"label":"2312","value":"绥化市","children":[{"label":"231202","value":"北林区"},{"label":"231221","value":"望奎县"},{"label":"231222","value":"兰西县"},{"label":"231223","value":"青冈县"},{"label":"231224","value":"庆安县"},{"label":"231225","value":"明水县"},{"label":"231226","value":"绥棱县"},{"label":"231281","value":"安达市"},{"label":"231282","value":"肇东市"},{"label":"231283","value":"海伦市"}]},{"label":"2327","value":"大兴安岭地区","children":[{"label":"232721","value":"呼玛县"},{"label":"232722","value":"塔河县"},{"label":"232723","value":"漠河县"},{"label":"232701","value":"加格达奇区"},{"label":"232702","value":"松岭区"},{"label":"232703","value":"新林区"},{"label":"232704","value":"呼中区"}]}]},{"label":"31","value":"上海市","children":[{"label":"3101","value":"市辖区","children":[{"label":"310101","value":"黄浦区"},{"label":"310104","value":"徐汇区"},{"label":"310105","value":"长宁区"},{"label":"310106","value":"静安区"},{"label":"310107","value":"普陀区"},{"label":"310109","value":"虹口区"},{"label":"310110","value":"杨浦区"},{"label":"310112","value":"闵行区"},{"label":"310113","value":"宝山区"},{"label":"310114","value":"嘉定区"},{"label":"310115","value":"浦东新区"},{"label":"310116","value":"金山区"},{"label":"310117","value":"松江区"},{"label":"310118","value":"青浦区"},{"label":"310120","value":"奉贤区"},{"label":"310151","value":"崇明区"}]}]},{"label":"32","value":"江苏省","children":[{"label":"3201","value":"南京市","children":[{"label":"320102","value":"玄武区"},{"label":"320104","value":"秦淮区"},{"label":"320105","value":"建邺区"},{"label":"320106","value":"鼓楼区"},{"label":"320111","value":"浦口区"},{"label":"320113","value":"栖霞区"},{"label":"320114","value":"雨花台区"},{"label":"320115","value":"江宁区"},{"label":"320116","value":"六合区"},{"label":"320117","value":"溧水区"},{"label":"320118","value":"高淳区"}]},{"label":"3202","value":"无锡市","children":[{"label":"320205","value":"锡山区"},{"label":"320206","value":"惠山区"},{"label":"320211","value":"滨湖区"},{"label":"320213","value":"梁溪区"},{"label":"320214","value":"新吴区"},{"label":"320281","value":"江阴市"},{"label":"320282","value":"宜兴市"}]},{"label":"3203","value":"徐州市","children":[{"label":"320302","value":"鼓楼区"},{"label":"320303","value":"云龙区"},{"label":"320305","value":"贾汪区"},{"label":"320311","value":"泉山区"},{"label":"320312","value":"铜山区"},{"label":"320321","value":"丰县"},{"label":"320322","value":"沛县"},{"label":"320324","value":"睢宁县"},{"label":"320381","value":"新沂市"},{"label":"320382","value":"邳州市"}]},{"label":"3204","value":"常州市","children":[{"label":"320402","value":"天宁区"},{"label":"320404","value":"钟楼区"},{"label":"320411","value":"新北区"},{"label":"320412","value":"武进区"},{"label":"320413","value":"金坛区"},{"label":"320481","value":"溧阳市"}]},{"label":"3205","value":"苏州市","children":[{"label":"320505","value":"虎丘区"},{"label":"320506","value":"吴中区"},{"label":"320507","value":"相城区"},{"label":"320508","value":"姑苏区"},{"label":"320509","value":"吴江区"},{"label":"320581","value":"常熟市"},{"label":"320582","value":"张家港市"},{"label":"320583","value":"昆山市"},{"label":"320585","value":"太仓市"},{"label":"320571","value":"苏州工业园"}]},{"label":"3206","value":"南通市","children":[{"label":"320602","value":"崇川区"},{"label":"320611","value":"港闸区"},{"label":"320612","value":"通州区"},{"label":"320621","value":"海安县"},{"label":"320623","value":"如东县"},{"label":"320681","value":"启东市"},{"label":"320682","value":"如皋市"},{"label":"320684","value":"海门市"}]},{"label":"3207","value":"连云港市","children":[{"label":"320703","value":"连云区"},{"label":"320706","value":"海州区"},{"label":"320707","value":"赣榆区"},{"label":"320722","value":"东海县"},{"label":"320723","value":"灌云县"},{"label":"320724","value":"灌南县"}]},{"label":"3208","value":"淮安市","children":[{"label":"320803","value":"淮安区"},{"label":"320804","value":"淮阴区"},{"label":"320812","value":"清江浦区"},{"label":"320813","value":"洪泽区"},{"label":"320826","value":"涟水县"},{"label":"320830","value":"盱眙县"},{"label":"320831","value":"金湖县"}]},{"label":"3209","value":"盐城市","children":[{"label":"320902","value":"亭湖区"},{"label":"320903","value":"盐都区"},{"label":"320904","value":"大丰区"},{"label":"320921","value":"响水县"},{"label":"320922","value":"滨海县"},{"label":"320923","value":"阜宁县"},{"label":"320924","value":"射阳县"},{"label":"320925","value":"建湖县"},{"label":"320981","value":"东台市"}]},{"label":"3210","value":"扬州市","children":[{"label":"321002","value":"广陵区"},{"label":"321003","value":"邗江区"},{"label":"321012","value":"江都区"},{"label":"321023","value":"宝应县"},{"label":"321081","value":"仪征市"},{"label":"321084","value":"高邮市"}]},{"label":"3211","value":"镇江市","children":[{"label":"321102","value":"京口区"},{"label":"321111","value":"润州区"},{"label":"321112","value":"丹徒区"},{"label":"321181","value":"丹阳市"},{"label":"321182","value":"扬中市"},{"label":"321183","value":"句容市"}]},{"label":"3212","value":"泰州市","children":[{"label":"321202","value":"海陵区"},{"label":"321203","value":"高港区"},{"label":"321204","value":"姜堰区"},{"label":"321281","value":"兴化市"},{"label":"321282","value":"靖江市"},{"label":"321283","value":"泰兴市"}]},{"label":"3213","value":"宿迁市","children":[{"label":"321302","value":"宿城区"},{"label":"321311","value":"宿豫区"},{"label":"321322","value":"沭阳县"},{"label":"321323","value":"泗阳县"},{"label":"321324","value":"泗洪县"}]}]},{"label":"33","value":"浙江省","children":[{"label":"3301","value":"杭州市","children":[{"label":"330102","value":"上城区"},{"label":"330103","value":"下城区"},{"label":"330104","value":"江干区"},{"label":"330105","value":"拱墅区"},{"label":"330106","value":"西湖区"},{"label":"330108","value":"滨江区"},{"label":"330109","value":"萧山区"},{"label":"330110","value":"余杭区"},{"label":"330111","value":"富阳区"},{"label":"330122","value":"桐庐县"},{"label":"330127","value":"淳安县"},{"label":"330182","value":"建德市"},{"label":"330185","value":"临安市"}]},{"label":"3302","value":"宁波市","children":[{"label":"330203","value":"海曙区"},{"label":"330204","value":"江东区"},{"label":"330205","value":"江北区"},{"label":"330206","value":"北仑区"},{"label":"330211","value":"镇海区"},{"label":"330212","value":"鄞州区"},{"label":"330225","value":"象山县"},{"label":"330226","value":"宁海县"},{"label":"330281","value":"余姚市"},{"label":"330282","value":"慈溪市"},{"label":"330283","value":"奉化市"}]},{"label":"3303","value":"温州市","children":[{"label":"330302","value":"鹿城区"},{"label":"330303","value":"龙湾区"},{"label":"330304","value":"瓯海区"},{"label":"330305","value":"洞头区"},{"label":"330324","value":"永嘉县"},{"label":"330326","value":"平阳县"},{"label":"330327","value":"苍南县"},{"label":"330328","value":"文成县"},{"label":"330329","value":"泰顺县"},{"label":"330381","value":"瑞安市"},{"label":"330382","value":"乐清市"}]},{"label":"3304","value":"嘉兴市","children":[{"label":"330402","value":"南湖区"},{"label":"330411","value":"秀洲区"},{"label":"330421","value":"嘉善县"},{"label":"330424","value":"海盐县"},{"label":"330481","value":"海宁市"},{"label":"330482","value":"平湖市"},{"label":"330483","value":"桐乡市"}]},{"label":"3305","value":"湖州市","children":[{"label":"330502","value":"吴兴区"},{"label":"330503","value":"南浔区"},{"label":"330521","value":"德清县"},{"label":"330522","value":"长兴县"},{"label":"330523","value":"安吉县"}]},{"label":"3306","value":"绍兴市","children":[{"label":"330602","value":"越城区"},{"label":"330603","value":"柯桥区"},{"label":"330604","value":"上虞区"},{"label":"330624","value":"新昌县"},{"label":"330681","value":"诸暨市"},{"label":"330683","value":"嵊州市"}]},{"label":"3307","value":"金华市","children":[{"label":"330702","value":"婺城区"},{"label":"330703","value":"金东区"},{"label":"330723","value":"武义县"},{"label":"330726","value":"浦江县"},{"label":"330727","value":"磐安县"},{"label":"330781","value":"兰溪市"},{"label":"330782","value":"义乌市"},{"label":"330783","value":"东阳市"},{"label":"330784","value":"永康市"}]},{"label":"3308","value":"衢州市","children":[{"label":"330802","value":"柯城区"},{"label":"330803","value":"衢江区"},{"label":"330822","value":"常山县"},{"label":"330824","value":"开化县"},{"label":"330825","value":"龙游县"},{"label":"330881","value":"江山市"}]},{"label":"3309","value":"舟山市","children":[{"label":"330902","value":"定海区"},{"label":"330903","value":"普陀区"},{"label":"330921","value":"岱山县"},{"label":"330922","value":"嵊泗县"}]},{"label":"3310","value":"台州市","children":[{"label":"331002","value":"椒江区"},{"label":"331003","value":"黄岩区"},{"label":"331004","value":"路桥区"},{"label":"331021","value":"玉环县"},{"label":"331022","value":"三门县"},{"label":"331023","value":"天台县"},{"label":"331024","value":"仙居县"},{"label":"331081","value":"温岭市"},{"label":"331082","value":"临海市"}]},{"label":"3311","value":"丽水市","children":[{"label":"331102","value":"莲都区"},{"label":"331121","value":"青田县"},{"label":"331122","value":"缙云县"},{"label":"331123","value":"遂昌县"},{"label":"331124","value":"松阳县"},{"label":"331125","value":"云和县"},{"label":"331126","value":"庆元县"},{"label":"331127","value":"景宁畲族自治县"},{"label":"331181","value":"龙泉市"}]}]},{"label":"34","value":"安徽省","children":[{"label":"3401","value":"合肥市","children":[{"label":"340102","value":"瑶海区"},{"label":"340103","value":"庐阳区"},{"label":"340104","value":"蜀山区"},{"label":"340111","value":"包河区"},{"label":"340121","value":"长丰县"},{"label":"340122","value":"肥东县"},{"label":"340123","value":"肥西县"},{"label":"340124","value":"庐江县"},{"label":"340181","value":"巢湖市"}]},{"label":"3402","value":"芜湖市","children":[{"label":"340202","value":"镜湖区"},{"label":"340203","value":"弋江区"},{"label":"340207","value":"鸠江区"},{"label":"340208","value":"三山区"},{"label":"340221","value":"芜湖县"},{"label":"340222","value":"繁昌县"},{"label":"340223","value":"南陵县"},{"label":"340225","value":"无为县"}]},{"label":"3403","value":"蚌埠市","children":[{"label":"340302","value":"龙子湖区"},{"label":"340303","value":"蚌山区"},{"label":"340304","value":"禹会区"},{"label":"340311","value":"淮上区"},{"label":"340321","value":"怀远县"},{"label":"340322","value":"五河县"},{"label":"340323","value":"固镇县"}]},{"label":"3404","value":"淮南市","children":[{"label":"340402","value":"大通区"},{"label":"340403","value":"田家庵区"},{"label":"340404","value":"谢家集区"},{"label":"340405","value":"八公山区"},{"label":"340406","value":"潘集区"},{"label":"340421","value":"凤台县"},{"label":"340422","value":"寿县"}]},{"label":"3405","value":"马鞍山市","children":[{"label":"340503","value":"花山区"},{"label":"340504","value":"雨山区"},{"label":"340506","value":"博望区"},{"label":"340521","value":"当涂县"},{"label":"340522","value":"含山县"},{"label":"340523","value":"和县"}]},{"label":"3406","value":"淮北市","children":[{"label":"340602","value":"杜集区"},{"label":"340603","value":"相山区"},{"label":"340604","value":"烈山区"},{"label":"340621","value":"濉溪县"}]},{"label":"3407","value":"铜陵市","children":[{"label":"340705","value":"铜官区"},{"label":"340706","value":"义安区"},{"label":"340711","value":"郊区"},{"label":"340722","value":"枞阳县"}]},{"label":"3408","value":"安庆市","children":[{"label":"340802","value":"迎江区"},{"label":"340803","value":"大观区"},{"label":"340811","value":"宜秀区"},{"label":"340822","value":"怀宁县"},{"label":"340824","value":"潜山县"},{"label":"340825","value":"太湖县"},{"label":"340826","value":"宿松县"},{"label":"340827","value":"望江县"},{"label":"340828","value":"岳西县"},{"label":"340881","value":"桐城市"}]},{"label":"3410","value":"黄山市","children":[{"label":"341002","value":"屯溪区"},{"label":"341003","value":"黄山区"},{"label":"341004","value":"徽州区"},{"label":"341021","value":"歙县"},{"label":"341022","value":"休宁县"},{"label":"341023","value":"黟县"},{"label":"341024","value":"祁门县"}]},{"label":"3411","value":"滁州市","children":[{"label":"341102","value":"琅琊区"},{"label":"341103","value":"南谯区"},{"label":"341122","value":"来安县"},{"label":"341124","value":"全椒县"},{"label":"341125","value":"定远县"},{"label":"341126","value":"凤阳县"},{"label":"341181","value":"天长市"},{"label":"341182","value":"明光市"}]},{"label":"3412","value":"阜阳市","children":[{"label":"341202","value":"颍州区"},{"label":"341203","value":"颍东区"},{"label":"341204","value":"颍泉区"},{"label":"341221","value":"临泉县"},{"label":"341222","value":"太和县"},{"label":"341225","value":"阜南县"},{"label":"341226","value":"颍上县"},{"label":"341282","value":"界首市"}]},{"label":"3413","value":"宿州市","children":[{"label":"341302","value":"埇桥区"},{"label":"341321","value":"砀山县"},{"label":"341322","value":"萧县"},{"label":"341323","value":"灵璧县"},{"label":"341324","value":"泗县"}]},{"label":"3415","value":"六安市","children":[{"label":"341502","value":"金安区"},{"label":"341503","value":"裕安区"},{"label":"341504","value":"叶集区"},{"label":"341522","value":"霍邱县"},{"label":"341523","value":"舒城县"},{"label":"341524","value":"金寨县"},{"label":"341525","value":"霍山县"}]},{"label":"3416","value":"亳州市","children":[{"label":"341602","value":"谯城区"},{"label":"341621","value":"涡阳县"},{"label":"341622","value":"蒙城县"},{"label":"341623","value":"利辛县"}]},{"label":"3417","value":"池州市","children":[{"label":"341702","value":"贵池区"},{"label":"341721","value":"东至县"},{"label":"341722","value":"石台县"},{"label":"341723","value":"青阳县"}]},{"label":"3418","value":"宣城市","children":[{"label":"341802","value":"宣州区"},{"label":"341821","value":"郎溪县"},{"label":"341822","value":"广德县"},{"label":"341823","value":"泾县"},{"label":"341824","value":"绩溪县"},{"label":"341825","value":"旌德县"},{"label":"341881","value":"宁国市"}]}]},{"label":"35","value":"福建省","children":[{"label":"3501","value":"福州市","children":[{"label":"350102","value":"鼓楼区"},{"label":"350103","value":"台江区"},{"label":"350104","value":"仓山区"},{"label":"350105","value":"马尾区"},{"label":"350111","value":"晋安区"},{"label":"350121","value":"闽侯县"},{"label":"350122","value":"连江县"},{"label":"350123","value":"罗源县"},{"label":"350124","value":"闽清县"},{"label":"350125","value":"永泰县"},{"label":"350128","value":"平潭县"},{"label":"350181","value":"福清市"},{"label":"350182","value":"长乐市"}]},{"label":"3502","value":"厦门市","children":[{"label":"350203","value":"思明区"},{"label":"350205","value":"海沧区"},{"label":"350206","value":"湖里区"},{"label":"350211","value":"集美区"},{"label":"350212","value":"同安区"},{"label":"350213","value":"翔安区"}]},{"label":"3503","value":"莆田市","children":[{"label":"350302","value":"城厢区"},{"label":"350303","value":"涵江区"},{"label":"350304","value":"荔城区"},{"label":"350305","value":"秀屿区"},{"label":"350322","value":"仙游县"}]},{"label":"3504","value":"三明市","children":[{"label":"350402","value":"梅列区"},{"label":"350403","value":"三元区"},{"label":"350421","value":"明溪县"},{"label":"350423","value":"清流县"},{"label":"350424","value":"宁化县"},{"label":"350425","value":"大田县"},{"label":"350426","value":"尤溪县"},{"label":"350427","value":"沙县"},{"label":"350428","value":"将乐县"},{"label":"350429","value":"泰宁县"},{"label":"350430","value":"建宁县"},{"label":"350481","value":"永安市"}]},{"label":"3505","value":"泉州市","children":[{"label":"350502","value":"鲤城区"},{"label":"350503","value":"丰泽区"},{"label":"350504","value":"洛江区"},{"label":"350505","value":"泉港区"},{"label":"350521","value":"惠安县"},{"label":"350524","value":"安溪县"},{"label":"350525","value":"永春县"},{"label":"350526","value":"德化县"},{"label":"350581","value":"石狮市"},{"label":"350582","value":"晋江市"},{"label":"350583","value":"南安市"}]},{"label":"3506","value":"漳州市","children":[{"label":"350602","value":"芗城区"},{"label":"350603","value":"龙文区"},{"label":"350622","value":"云霄县"},{"label":"350623","value":"漳浦县"},{"label":"350624","value":"诏安县"},{"label":"350625","value":"长泰县"},{"label":"350626","value":"东山县"},{"label":"350627","value":"南靖县"},{"label":"350628","value":"平和县"},{"label":"350629","value":"华安县"},{"label":"350681","value":"龙海市"}]},{"label":"3507","value":"南平市","children":[{"label":"350702","value":"延平区"},{"label":"350703","value":"建阳区"},{"label":"350721","value":"顺昌县"},{"label":"350722","value":"浦城县"},{"label":"350723","value":"光泽县"},{"label":"350724","value":"松溪县"},{"label":"350725","value":"政和县"},{"label":"350781","value":"邵武市"},{"label":"350782","value":"武夷山市"},{"label":"350783","value":"建瓯市"}]},{"label":"3508","value":"龙岩市","children":[{"label":"350802","value":"新罗区"},{"label":"350803","value":"永定区"},{"label":"350821","value":"长汀县"},{"label":"350823","value":"上杭县"},{"label":"350824","value":"武平县"},{"label":"350825","value":"连城县"},{"label":"350881","value":"漳平市"}]},{"label":"3509","value":"宁德市","children":[{"label":"350902","value":"蕉城区"},{"label":"350921","value":"霞浦县"},{"label":"350922","value":"古田县"},{"label":"350923","value":"屏南县"},{"label":"350924","value":"寿宁县"},{"label":"350925","value":"周宁县"},{"label":"350926","value":"柘荣县"},{"label":"350981","value":"福安市"},{"label":"350982","value":"福鼎市"}]}]},{"label":"36","value":"江西省","children":[{"label":"3601","value":"南昌市","children":[{"label":"360102","value":"东湖区"},{"label":"360103","value":"西湖区"},{"label":"360104","value":"青云谱区"},{"label":"360105","value":"湾里区"},{"label":"360111","value":"青山湖区"},{"label":"360112","value":"新建区"},{"label":"360121","value":"南昌县"},{"label":"360123","value":"安义县"},{"label":"360124","value":"进贤县"}]},{"label":"3602","value":"景德镇市","children":[{"label":"360202","value":"昌江区"},{"label":"360203","value":"珠山区"},{"label":"360222","value":"浮梁县"},{"label":"360281","value":"乐平市"}]},{"label":"3603","value":"萍乡市","children":[{"label":"360302","value":"安源区"},{"label":"360313","value":"湘东区"},{"label":"360321","value":"莲花县"},{"label":"360322","value":"上栗县"},{"label":"360323","value":"芦溪县"}]},{"label":"3604","value":"九江市","children":[{"label":"360402","value":"濂溪区"},{"label":"360403","value":"浔阳区"},{"label":"360421","value":"九江县"},{"label":"360423","value":"武宁县"},{"label":"360424","value":"修水县"},{"label":"360425","value":"永修县"},{"label":"360426","value":"德安县"},{"label":"360428","value":"都昌县"},{"label":"360429","value":"湖口县"},{"label":"360430","value":"彭泽县"},{"label":"360481","value":"瑞昌市"},{"label":"360482","value":"共青城市"},{"label":"360483","value":"庐山市"},{"label":"360404","value":"柴桑区"}]},{"label":"3605","value":"新余市","children":[{"label":"360502","value":"渝水区"},{"label":"360521","value":"分宜县"}]},{"label":"3606","value":"鹰潭市","children":[{"label":"360602","value":"月湖区"},{"label":"360622","value":"余江县"},{"label":"360681","value":"贵溪市"}]},{"label":"3607","value":"赣州市","children":[{"label":"360702","value":"章贡区"},{"label":"360703","value":"南康区"},{"label":"360721","value":"赣县"},{"label":"360722","value":"信丰县"},{"label":"360723","value":"大余县"},{"label":"360724","value":"上犹县"},{"label":"360725","value":"崇义县"},{"label":"360726","value":"安远县"},{"label":"360727","value":"龙南县"},{"label":"360728","value":"定南县"},{"label":"360729","value":"全南县"},{"label":"360730","value":"宁都县"},{"label":"360731","value":"于都县"},{"label":"360732","value":"兴国县"},{"label":"360733","value":"会昌县"},{"label":"360734","value":"寻乌县"},{"label":"360735","value":"石城县"},{"label":"360781","value":"瑞金市"}]},{"label":"3608","value":"吉安市","children":[{"label":"360802","value":"吉州区"},{"label":"360803","value":"青原区"},{"label":"360821","value":"吉安县"},{"label":"360822","value":"吉水县"},{"label":"360823","value":"峡江县"},{"label":"360824","value":"新干县"},{"label":"360825","value":"永丰县"},{"label":"360826","value":"泰和县"},{"label":"360827","value":"遂川县"},{"label":"360828","value":"万安县"},{"label":"360829","value":"安福县"},{"label":"360830","value":"永新县"},{"label":"360881","value":"井冈山市"}]},{"label":"3609","value":"宜春市","children":[{"label":"360902","value":"袁州区"},{"label":"360921","value":"奉新县"},{"label":"360922","value":"万载县"},{"label":"360923","value":"上高县"},{"label":"360924","value":"宜丰县"},{"label":"360925","value":"靖安县"},{"label":"360926","value":"铜鼓县"},{"label":"360981","value":"丰城市"},{"label":"360982","value":"樟树市"},{"label":"360983","value":"高安市"}]},{"label":"3610","value":"抚州市","children":[{"label":"361002","value":"临川区"},{"label":"361021","value":"南城县"},{"label":"361022","value":"黎川县"},{"label":"361023","value":"南丰县"},{"label":"361024","value":"崇仁县"},{"label":"361025","value":"乐安县"},{"label":"361026","value":"宜黄县"},{"label":"361027","value":"金溪县"},{"label":"361028","value":"资溪县"},{"label":"361029","value":"东乡县"},{"label":"361030","value":"广昌县"}]},{"label":"3611","value":"上饶市","children":[{"label":"361102","value":"信州区"},{"label":"361103","value":"广丰区"},{"label":"361121","value":"上饶县"},{"label":"361123","value":"玉山县"},{"label":"361124","value":"铅山县"},{"label":"361125","value":"横峰县"},{"label":"361126","value":"弋阳县"},{"label":"361127","value":"余干县"},{"label":"361128","value":"鄱阳县"},{"label":"361129","value":"万年县"},{"label":"361130","value":"婺源县"},{"label":"361181","value":"德兴市"}]}]},{"label":"37","value":"山东省","children":[{"label":"3701","value":"济南市","children":[{"label":"370102","value":"历下区"},{"label":"370103","value":"市中区"},{"label":"370104","value":"槐荫区"},{"label":"370105","value":"天桥区"},{"label":"370112","value":"历城区"},{"label":"370113","value":"长清区"},{"label":"370124","value":"平阴县"},{"label":"370125","value":"济阳县"},{"label":"370126","value":"商河县"},{"label":"370181","value":"章丘市"}]},{"label":"3702","value":"青岛市","children":[{"label":"370202","value":"市南区"},{"label":"370203","value":"市北区"},{"label":"370211","value":"黄岛区"},{"label":"370212","value":"崂山区"},{"label":"370213","value":"李沧区"},{"label":"370214","value":"城阳区"},{"label":"370281","value":"胶州市"},{"label":"370282","value":"即墨市"},{"label":"370283","value":"平度市"},{"label":"370285","value":"莱西市"}]},{"label":"3703","value":"淄博市","children":[{"label":"370302","value":"淄川区"},{"label":"370303","value":"张店区"},{"label":"370304","value":"博山区"},{"label":"370305","value":"临淄区"},{"label":"370306","value":"周村区"},{"label":"370321","value":"桓台县"},{"label":"370322","value":"高青县"},{"label":"370323","value":"沂源县"}]},{"label":"3704","value":"枣庄市","children":[{"label":"370402","value":"市中区"},{"label":"370403","value":"薛城区"},{"label":"370404","value":"峄城区"},{"label":"370405","value":"台儿庄区"},{"label":"370406","value":"山亭区"},{"label":"370481","value":"滕州市"}]},{"label":"3705","value":"东营市","children":[{"label":"370502","value":"东营区"},{"label":"370503","value":"河口区"},{"label":"370505","value":"垦利区"},{"label":"370522","value":"利津县"},{"label":"370523","value":"广饶县"}]},{"label":"3706","value":"烟台市","children":[{"label":"370602","value":"芝罘区"},{"label":"370611","value":"福山区"},{"label":"370612","value":"牟平区"},{"label":"370613","value":"莱山区"},{"label":"370634","value":"长岛县"},{"label":"370681","value":"龙口市"},{"label":"370682","value":"莱阳市"},{"label":"370683","value":"莱州市"},{"label":"370684","value":"蓬莱市"},{"label":"370685","value":"招远市"},{"label":"370686","value":"栖霞市"},{"label":"370687","value":"海阳市"}]},{"label":"3707","value":"潍坊市","children":[{"label":"370702","value":"潍城区"},{"label":"370703","value":"寒亭区"},{"label":"370704","value":"坊子区"},{"label":"370705","value":"奎文区"},{"label":"370724","value":"临朐县"},{"label":"370725","value":"昌乐县"},{"label":"370781","value":"青州市"},{"label":"370782","value":"诸城市"},{"label":"370783","value":"寿光市"},{"label":"370784","value":"安丘市"},{"label":"370785","value":"高密市"},{"label":"370786","value":"昌邑市"}]},{"label":"3708","value":"济宁市","children":[{"label":"370811","value":"任城区"},{"label":"370812","value":"兖州区"},{"label":"370826","value":"微山县"},{"label":"370827","value":"鱼台县"},{"label":"370828","value":"金乡县"},{"label":"370829","value":"嘉祥县"},{"label":"370830","value":"汶上县"},{"label":"370831","value":"泗水县"},{"label":"370832","value":"梁山县"},{"label":"370881","value":"曲阜市"},{"label":"370883","value":"邹城市"}]},{"label":"3709","value":"泰安市","children":[{"label":"370902","value":"泰山区"},{"label":"370911","value":"岱岳区"},{"label":"370921","value":"宁阳县"},{"label":"370923","value":"东平县"},{"label":"370982","value":"新泰市"},{"label":"370983","value":"肥城市"}]},{"label":"3710","value":"威海市","children":[{"label":"371002","value":"环翠区"},{"label":"371003","value":"文登区"},{"label":"371082","value":"荣成市"},{"label":"371083","value":"乳山市"}]},{"label":"3711","value":"日照市","children":[{"label":"371102","value":"东港区"},{"label":"371103","value":"岚山区"},{"label":"371121","value":"五莲县"},{"label":"371122","value":"莒县"}]},{"label":"3712","value":"莱芜市","children":[{"label":"371202","value":"莱城区"},{"label":"371203","value":"钢城区"}]},{"label":"3713","value":"临沂市","children":[{"label":"371302","value":"兰山区"},{"label":"371311","value":"罗庄区"},{"label":"371312","value":"河东区"},{"label":"371321","value":"沂南县"},{"label":"371322","value":"郯城县"},{"label":"371323","value":"沂水县"},{"label":"371324","value":"兰陵县"},{"label":"371325","value":"费县"},{"label":"371326","value":"平邑县"},{"label":"371327","value":"莒南县"},{"label":"371328","value":"蒙阴县"},{"label":"371329","value":"临沭县"}]},{"label":"3714","value":"德州市","children":[{"label":"371402","value":"德城区"},{"label":"371403","value":"陵城区"},{"label":"371422","value":"宁津县"},{"label":"371423","value":"庆云县"},{"label":"371424","value":"临邑县"},{"label":"371425","value":"齐河县"},{"label":"371426","value":"平原县"},{"label":"371427","value":"夏津县"},{"label":"371428","value":"武城县"},{"label":"371481","value":"乐陵市"},{"label":"371482","value":"禹城市"}]},{"label":"3715","value":"聊城市","children":[{"label":"371502","value":"东昌府区"},{"label":"371521","value":"阳谷县"},{"label":"371522","value":"莘县"},{"label":"371523","value":"茌平县"},{"label":"371524","value":"东阿县"},{"label":"371525","value":"冠县"},{"label":"371526","value":"高唐县"},{"label":"371581","value":"临清市"}]},{"label":"3716","value":"滨州市","children":[{"label":"371602","value":"滨城区"},{"label":"371603","value":"沾化区"},{"label":"371621","value":"惠民县"},{"label":"371622","value":"阳信县"},{"label":"371623","value":"无棣县"},{"label":"371625","value":"博兴县"},{"label":"371626","value":"邹平县"}]},{"label":"3717","value":"菏泽市","children":[{"label":"371702","value":"牡丹区"},{"label":"371703","value":"定陶区"},{"label":"371721","value":"曹县"},{"label":"371722","value":"单县"},{"label":"371723","value":"成武县"},{"label":"371724","value":"巨野县"},{"label":"371725","value":"郓城县"},{"label":"371726","value":"鄄城县"},{"label":"371728","value":"东明县"}]}]},{"label":"41","value":"河南省","children":[{"label":"4101","value":"郑州市","children":[{"label":"410102","value":"中原区"},{"label":"410103","value":"二七区"},{"label":"410104","value":"管城回族区"},{"label":"410105","value":"金水区"},{"label":"410106","value":"上街区"},{"label":"410108","value":"惠济区"},{"label":"410122","value":"中牟县"},{"label":"410181","value":"巩义市"},{"label":"410182","value":"荥阳市"},{"label":"410183","value":"新密市"},{"label":"410184","value":"新郑市"},{"label":"410185","value":"登封市"}]},{"label":"4102","value":"开封市","children":[{"label":"410202","value":"龙亭区"},{"label":"410203","value":"顺河回族区"},{"label":"410204","value":"鼓楼区"},{"label":"410205","value":"禹王台区"},{"label":"410211","value":"金明区"},{"label":"410212","value":"祥符区"},{"label":"410221","value":"杞县"},{"label":"410222","value":"通许县"},{"label":"410223","value":"尉氏县"},{"label":"410225","value":"兰考县"}]},{"label":"4103","value":"洛阳市","children":[{"label":"410302","value":"老城区"},{"label":"410303","value":"西工区"},{"label":"410304","value":"瀍河回族区"},{"label":"410305","value":"涧西区"},{"label":"410306","value":"吉利区"},{"label":"410311","value":"洛龙区"},{"label":"410322","value":"孟津县"},{"label":"410323","value":"新安县"},{"label":"410324","value":"栾川县"},{"label":"410325","value":"嵩县"},{"label":"410326","value":"汝阳县"},{"label":"410327","value":"宜阳县"},{"label":"410328","value":"洛宁县"},{"label":"410329","value":"伊川县"},{"label":"410381","value":"偃师市"}]},{"label":"4104","value":"平顶山市","children":[{"label":"410402","value":"新华区"},{"label":"410403","value":"卫东区"},{"label":"410404","value":"石龙区"},{"label":"410411","value":"湛河区"},{"label":"410421","value":"宝丰县"},{"label":"410422","value":"叶县"},{"label":"410423","value":"鲁山县"},{"label":"410425","value":"郏县"},{"label":"410481","value":"舞钢市"},{"label":"410482","value":"汝州市"}]},{"label":"4105","value":"安阳市","children":[{"label":"410502","value":"文峰区"},{"label":"410503","value":"北关区"},{"label":"410505","value":"殷都区"},{"label":"410506","value":"龙安区"},{"label":"410522","value":"安阳县"},{"label":"410523","value":"汤阴县"},{"label":"410526","value":"滑县"},{"label":"410527","value":"内黄县"},{"label":"410581","value":"林州市"}]},{"label":"4106","value":"鹤壁市","children":[{"label":"410602","value":"鹤山区"},{"label":"410603","value":"山城区"},{"label":"410611","value":"淇滨区"},{"label":"410621","value":"浚县"},{"label":"410622","value":"淇县"}]},{"label":"4107","value":"新乡市","children":[{"label":"410702","value":"红旗区"},{"label":"410703","value":"卫滨区"},{"label":"410704","value":"凤泉区"},{"label":"410711","value":"牧野区"},{"label":"410721","value":"新乡县"},{"label":"410724","value":"获嘉县"},{"label":"410725","value":"原阳县"},{"label":"410726","value":"延津县"},{"label":"410727","value":"封丘县"},{"label":"410728","value":"长垣县"},{"label":"410781","value":"卫辉市"},{"label":"410782","value":"辉县市"}]},{"label":"4108","value":"焦作市","children":[{"label":"410802","value":"解放区"},{"label":"410803","value":"中站区"},{"label":"410804","value":"马村区"},{"label":"410811","value":"山阳区"},{"label":"410821","value":"修武县"},{"label":"410822","value":"博爱县"},{"label":"410823","value":"武陟县"},{"label":"410825","value":"温县"},{"label":"410882","value":"沁阳市"},{"label":"410883","value":"孟州市"}]},{"label":"4109","value":"濮阳市","children":[{"label":"410902","value":"华龙区"},{"label":"410922","value":"清丰县"},{"label":"410923","value":"南乐县"},{"label":"410926","value":"范县"},{"label":"410927","value":"台前县"},{"label":"410928","value":"濮阳县"}]},{"label":"4110","value":"许昌市","children":[{"label":"411002","value":"魏都区"},{"label":"411023","value":"许昌县"},{"label":"411024","value":"鄢陵县"},{"label":"411025","value":"襄城县"},{"label":"411081","value":"禹州市"},{"label":"411082","value":"长葛市"},{"label":"411003","value":"建安区"},{"label":"411071","value":"许昌经济技术开发区"}]},{"label":"4111","value":"漯河市","children":[{"label":"411102","value":"源汇区"},{"label":"411103","value":"郾城区"},{"label":"411104","value":"召陵区"},{"label":"411121","value":"舞阳县"},{"label":"411122","value":"临颍县"}]},{"label":"4112","value":"三门峡市","children":[{"label":"411202","value":"湖滨区"},{"label":"411203","value":"陕州区"},{"label":"411221","value":"渑池县"},{"label":"411224","value":"卢氏县"},{"label":"411281","value":"义马市"},{"label":"411282","value":"灵宝市"}]},{"label":"4113","value":"南阳市","children":[{"label":"411302","value":"宛城区"},{"label":"411303","value":"卧龙区"},{"label":"411321","value":"南召县"},{"label":"411322","value":"方城县"},{"label":"411323","value":"西峡县"},{"label":"411324","value":"镇平县"},{"label":"411325","value":"内乡县"},{"label":"411326","value":"淅川县"},{"label":"411327","value":"社旗县"},{"label":"411328","value":"唐河县"},{"label":"411329","value":"新野县"},{"label":"411330","value":"桐柏县"},{"label":"411381","value":"邓州市"}]},{"label":"4114","value":"商丘市","children":[{"label":"411402","value":"梁园区"},{"label":"411403","value":"睢阳区"},{"label":"411421","value":"民权县"},{"label":"411422","value":"睢县"},{"label":"411423","value":"宁陵县"},{"label":"411424","value":"柘城县"},{"label":"411425","value":"虞城县"},{"label":"411426","value":"夏邑县"},{"label":"411481","value":"永城市"}]},{"label":"4115","value":"信阳市","children":[{"label":"411502","value":"浉河区"},{"label":"411503","value":"平桥区"},{"label":"411521","value":"罗山县"},{"label":"411522","value":"光山县"},{"label":"411523","value":"新县"},{"label":"411524","value":"商城县"},{"label":"411525","value":"固始县"},{"label":"411526","value":"潢川县"},{"label":"411527","value":"淮滨县"},{"label":"411528","value":"息县"}]},{"label":"4116","value":"周口市","children":[{"label":"411602","value":"川汇区"},{"label":"411621","value":"扶沟县"},{"label":"411622","value":"西华县"},{"label":"411623","value":"商水县"},{"label":"411624","value":"沈丘县"},{"label":"411625","value":"郸城县"},{"label":"411626","value":"淮阳县"},{"label":"411627","value":"太康县"},{"label":"411628","value":"鹿邑县"},{"label":"411681","value":"项城市"}]},{"label":"4117","value":"驻马店市","children":[{"label":"411702","value":"驿城区"},{"label":"411721","value":"西平县"},{"label":"411722","value":"上蔡县"},{"label":"411723","value":"平舆县"},{"label":"411724","value":"正阳县"},{"label":"411725","value":"确山县"},{"label":"411726","value":"泌阳县"},{"label":"411727","value":"汝南县"},{"label":"411728","value":"遂平县"},{"label":"411729","value":"新蔡县"}]},{"label":"4190","value":"省直辖县级","children":[{"label":"419001","value":"济源市"}]}]},{"label":"42","value":"湖北省","children":[{"label":"4201","value":"武汉市","children":[{"label":"420102","value":"江岸区"},{"label":"420103","value":"江汉区"},{"label":"420104","value":"硚口区"},{"label":"420105","value":"汉阳区"},{"label":"420106","value":"武昌区"},{"label":"420107","value":"青山区"},{"label":"420111","value":"洪山区"},{"label":"420112","value":"东西湖区"},{"label":"420113","value":"汉南区"},{"label":"420114","value":"蔡甸区"},{"label":"420115","value":"江夏区"},{"label":"420116","value":"黄陂区"},{"label":"420117","value":"新洲区"}]},{"label":"4202","value":"黄石市","children":[{"label":"420202","value":"黄石港区"},{"label":"420203","value":"西塞山区"},{"label":"420204","value":"下陆区"},{"label":"420205","value":"铁山区"},{"label":"420222","value":"阳新县"},{"label":"420281","value":"大冶市"}]},{"label":"4203","value":"十堰市","children":[{"label":"420302","value":"茅箭区"},{"label":"420303","value":"张湾区"},{"label":"420304","value":"郧阳区"},{"label":"420322","value":"郧西县"},{"label":"420323","value":"竹山县"},{"label":"420324","value":"竹溪县"},{"label":"420325","value":"房县"},{"label":"420381","value":"丹江口市"}]},{"label":"4205","value":"宜昌市","children":[{"label":"420502","value":"西陵区"},{"label":"420503","value":"伍家岗区"},{"label":"420504","value":"点军区"},{"label":"420505","value":"猇亭区"},{"label":"420506","value":"夷陵区"},{"label":"420525","value":"远安县"},{"label":"420526","value":"兴山县"},{"label":"420527","value":"秭归县"},{"label":"420528","value":"长阳土家族自治县"},{"label":"420529","value":"五峰土家族自治县"},{"label":"420581","value":"宜都市"},{"label":"420582","value":"当阳市"},{"label":"420583","value":"枝江市"}]},{"label":"4206","value":"襄阳市","children":[{"label":"420602","value":"襄城区"},{"label":"420606","value":"樊城区"},{"label":"420607","value":"襄州区"},{"label":"420624","value":"南漳县"},{"label":"420625","value":"谷城县"},{"label":"420626","value":"保康县"},{"label":"420682","value":"老河口市"},{"label":"420683","value":"枣阳市"},{"label":"420684","value":"宜城市"}]},{"label":"4207","value":"鄂州市","children":[{"label":"420702","value":"梁子湖区"},{"label":"420703","value":"华容区"},{"label":"420704","value":"鄂城区"}]},{"label":"4208","value":"荆门市","children":[{"label":"420802","value":"东宝区"},{"label":"420804","value":"掇刀区"},{"label":"420821","value":"京山县"},{"label":"420822","value":"沙洋县"},{"label":"420881","value":"钟祥市"}]},{"label":"4209","value":"孝感市","children":[{"label":"420902","value":"孝南区"},{"label":"420921","value":"孝昌县"},{"label":"420922","value":"大悟县"},{"label":"420923","value":"云梦县"},{"label":"420981","value":"应城市"},{"label":"420982","value":"安陆市"},{"label":"420984","value":"汉川市"}]},{"label":"4210","value":"荆州市","children":[{"label":"421002","value":"沙市区"},{"label":"421003","value":"荆州区"},{"label":"421022","value":"公安县"},{"label":"421023","value":"监利县"},{"label":"421024","value":"江陵县"},{"label":"421081","value":"石首市"},{"label":"421083","value":"洪湖市"},{"label":"421087","value":"松滋市"}]},{"label":"4211","value":"黄冈市","children":[{"label":"421102","value":"黄州区"},{"label":"421121","value":"团风县"},{"label":"421122","value":"红安县"},{"label":"421123","value":"罗田县"},{"label":"421124","value":"英山县"},{"label":"421125","value":"浠水县"},{"label":"421126","value":"蕲春县"},{"label":"421127","value":"黄梅县"},{"label":"421181","value":"麻城市"},{"label":"421182","value":"武穴市"}]},{"label":"4212","value":"咸宁市","children":[{"label":"421202","value":"咸安区"},{"label":"421221","value":"嘉鱼县"},{"label":"421222","value":"通城县"},{"label":"421223","value":"崇阳县"},{"label":"421224","value":"通山县"},{"label":"421281","value":"赤壁市"}]},{"label":"4213","value":"随州市","children":[{"label":"421303","value":"曾都区"},{"label":"421321","value":"随县"},{"label":"421381","value":"广水市"}]},{"label":"4228","value":"恩施土家族苗族自治州","children":[{"label":"422801","value":"恩施市"},{"label":"422802","value":"利川市"},{"label":"422822","value":"建始县"},{"label":"422823","value":"巴东县"},{"label":"422825","value":"宣恩县"},{"label":"422826","value":"咸丰县"},{"label":"422827","value":"来凤县"},{"label":"422828","value":"鹤峰县"}]},{"label":"4290","value":"省直辖县级","children":[{"label":"429004","value":"仙桃市"},{"label":"429005","value":"潜江市"},{"label":"429006","value":"天门市"},{"label":"429021","value":"神农架林区"}]}]},{"label":"43","value":"湖南省","children":[{"label":"4301","value":"长沙市","children":[{"label":"430102","value":"芙蓉区"},{"label":"430103","value":"天心区"},{"label":"430104","value":"岳麓区"},{"label":"430105","value":"开福区"},{"label":"430111","value":"雨花区"},{"label":"430112","value":"望城区"},{"label":"430121","value":"长沙县"},{"label":"430124","value":"宁乡县"},{"label":"430181","value":"浏阳市"}]},{"label":"4302","value":"株洲市","children":[{"label":"430202","value":"荷塘区"},{"label":"430203","value":"芦淞区"},{"label":"430204","value":"石峰区"},{"label":"430211","value":"天元区"},{"label":"430221","value":"株洲县"},{"label":"430223","value":"攸县"},{"label":"430224","value":"茶陵县"},{"label":"430225","value":"炎陵县"},{"label":"430281","value":"醴陵市"}]},{"label":"4303","value":"湘潭市","children":[{"label":"430302","value":"雨湖区"},{"label":"430304","value":"岳塘区"},{"label":"430321","value":"湘潭县"},{"label":"430381","value":"湘乡市"},{"label":"430382","value":"韶山市"}]},{"label":"4304","value":"衡阳市","children":[{"label":"430405","value":"珠晖区"},{"label":"430406","value":"雁峰区"},{"label":"430407","value":"石鼓区"},{"label":"430408","value":"蒸湘区"},{"label":"430412","value":"南岳区"},{"label":"430421","value":"衡阳县"},{"label":"430422","value":"衡南县"},{"label":"430423","value":"衡山县"},{"label":"430424","value":"衡东县"},{"label":"430426","value":"祁东县"},{"label":"430481","value":"耒阳市"},{"label":"430482","value":"常宁市"}]},{"label":"4305","value":"邵阳市","children":[{"label":"430502","value":"双清区"},{"label":"430503","value":"大祥区"},{"label":"430511","value":"北塔区"},{"label":"430521","value":"邵东县"},{"label":"430522","value":"新邵县"},{"label":"430523","value":"邵阳县"},{"label":"430524","value":"隆回县"},{"label":"430525","value":"洞口县"},{"label":"430527","value":"绥宁县"},{"label":"430528","value":"新宁县"},{"label":"430529","value":"城步苗族自治县"},{"label":"430581","value":"武冈市"}]},{"label":"4306","value":"岳阳市","children":[{"label":"430602","value":"岳阳楼区"},{"label":"430603","value":"云溪区"},{"label":"430611","value":"君山区"},{"label":"430621","value":"岳阳县"},{"label":"430623","value":"华容县"},{"label":"430624","value":"湘阴县"},{"label":"430626","value":"平江县"},{"label":"430681","value":"汨罗市"},{"label":"430682","value":"临湘市"}]},{"label":"4307","value":"常德市","children":[{"label":"430702","value":"武陵区"},{"label":"430703","value":"鼎城区"},{"label":"430721","value":"安乡县"},{"label":"430722","value":"汉寿县"},{"label":"430723","value":"澧县"},{"label":"430724","value":"临澧县"},{"label":"430725","value":"桃源县"},{"label":"430726","value":"石门县"},{"label":"430781","value":"津市市"}]},{"label":"4308","value":"张家界市","children":[{"label":"430802","value":"永定区"},{"label":"430811","value":"武陵源区"},{"label":"430821","value":"慈利县"},{"label":"430822","value":"桑植县"}]},{"label":"4309","value":"益阳市","children":[{"label":"430902","value":"资阳区"},{"label":"430903","value":"赫山区"},{"label":"430921","value":"南县"},{"label":"430922","value":"桃江县"},{"label":"430923","value":"安化县"},{"label":"430981","value":"沅江市"}]},{"label":"4310","value":"郴州市","children":[{"label":"431002","value":"北湖区"},{"label":"431003","value":"苏仙区"},{"label":"431021","value":"桂阳县"},{"label":"431022","value":"宜章县"},{"label":"431023","value":"永兴县"},{"label":"431024","value":"嘉禾县"},{"label":"431025","value":"临武县"},{"label":"431026","value":"汝城县"},{"label":"431027","value":"桂东县"},{"label":"431028","value":"安仁县"},{"label":"431081","value":"资兴市"}]},{"label":"4311","value":"永州市","children":[{"label":"431102","value":"零陵区"},{"label":"431103","value":"冷水滩区"},{"label":"431121","value":"祁阳县"},{"label":"431122","value":"东安县"},{"label":"431123","value":"双牌县"},{"label":"431124","value":"道县"},{"label":"431125","value":"江永县"},{"label":"431126","value":"宁远县"},{"label":"431127","value":"蓝山县"},{"label":"431128","value":"新田县"},{"label":"431129","value":"江华瑶族自治县"}]},{"label":"4312","value":"怀化市","children":[{"label":"431202","value":"鹤城区"},{"label":"431221","value":"中方县"},{"label":"431222","value":"沅陵县"},{"label":"431223","value":"辰溪县"},{"label":"431224","value":"溆浦县"},{"label":"431225","value":"会同县"},{"label":"431226","value":"麻阳苗族自治县"},{"label":"431227","value":"新晃侗族自治县"},{"label":"431228","value":"芷江侗族自治县"},{"label":"431229","value":"靖州苗族侗族自治县"},{"label":"431230","value":"通道侗族自治县"},{"label":"431281","value":"洪江市"}]},{"label":"4313","value":"娄底市","children":[{"label":"431302","value":"娄星区"},{"label":"431321","value":"双峰县"},{"label":"431322","value":"新化县"},{"label":"431381","value":"冷水江市"},{"label":"431382","value":"涟源市"}]},{"label":"4331","value":"湘西土家族苗族自治州","children":[{"label":"433101","value":"吉首市"},{"label":"433122","value":"泸溪县"},{"label":"433123","value":"凤凰县"},{"label":"433124","value":"花垣县"},{"label":"433125","value":"保靖县"},{"label":"433126","value":"古丈县"},{"label":"433127","value":"永顺县"},{"label":"433130","value":"龙山县"}]}]},{"label":"44","value":"广东省","children":[{"label":"4401","value":"广州市","children":[{"label":"440103","value":"荔湾区"},{"label":"440104","value":"越秀区"},{"label":"440105","value":"海珠区"},{"label":"440106","value":"天河区"},{"label":"440111","value":"白云区"},{"label":"440112","value":"黄埔区"},{"label":"440113","value":"番禺区"},{"label":"440114","value":"花都区"},{"label":"440115","value":"南沙区"},{"label":"440117","value":"从化区"},{"label":"440118","value":"增城区"}]},{"label":"4402","value":"韶关市","children":[{"label":"440203","value":"武江区"},{"label":"440204","value":"浈江区"},{"label":"440205","value":"曲江区"},{"label":"440222","value":"始兴县"},{"label":"440224","value":"仁化县"},{"label":"440229","value":"翁源县"},{"label":"440232","value":"乳源瑶族自治县"},{"label":"440233","value":"新丰县"},{"label":"440281","value":"乐昌市"},{"label":"440282","value":"南雄市"}]},{"label":"4403","value":"深圳市","children":[{"label":"440303","value":"罗湖区"},{"label":"440304","value":"福田区"},{"label":"440305","value":"南山区"},{"label":"440306","value":"宝安区"},{"label":"440307","value":"龙岗区"},{"label":"440308","value":"盐田区"},{"label":"440310","value":"坪山区"},{"label":"440309","value":"龙华区"}]},{"label":"4404","value":"珠海市","children":[{"label":"440402","value":"香洲区"},{"label":"440403","value":"斗门区"},{"label":"440404","value":"金湾区"}]},{"label":"4405","value":"汕头市","children":[{"label":"440507","value":"龙湖区"},{"label":"440511","value":"金平区"},{"label":"440512","value":"濠江区"},{"label":"440513","value":"潮阳区"},{"label":"440514","value":"潮南区"},{"label":"440515","value":"澄海区"},{"label":"440523","value":"南澳县"}]},{"label":"4406","value":"佛山市","children":[{"label":"440604","value":"禅城区"},{"label":"440605","value":"南海区"},{"label":"440606","value":"顺德区"},{"label":"440607","value":"三水区"},{"label":"440608","value":"高明区"}]},{"label":"4407","value":"江门市","children":[{"label":"440703","value":"蓬江区"},{"label":"440704","value":"江海区"},{"label":"440705","value":"新会区"},{"label":"440781","value":"台山市"},{"label":"440783","value":"开平市"},{"label":"440784","value":"鹤山市"},{"label":"440785","value":"恩平市"}]},{"label":"4408","value":"湛江市","children":[{"label":"440802","value":"赤坎区"},{"label":"440803","value":"霞山区"},{"label":"440804","value":"坡头区"},{"label":"440811","value":"麻章区"},{"label":"440823","value":"遂溪县"},{"label":"440825","value":"徐闻县"},{"label":"440881","value":"廉江市"},{"label":"440882","value":"雷州市"},{"label":"440883","value":"吴川市"}]},{"label":"4409","value":"茂名市","children":[{"label":"440902","value":"茂南区"},{"label":"440904","value":"电白区"},{"label":"440981","value":"高州市"},{"label":"440982","value":"化州市"},{"label":"440983","value":"信宜市"}]},{"label":"4412","value":"肇庆市","children":[{"label":"441202","value":"端州区"},{"label":"441203","value":"鼎湖区"},{"label":"441204","value":"高要区"},{"label":"441223","value":"广宁县"},{"label":"441224","value":"怀集县"},{"label":"441225","value":"封开县"},{"label":"441226","value":"德庆县"},{"label":"441284","value":"四会市"}]},{"label":"4413","value":"惠州市","children":[{"label":"441302","value":"惠城区"},{"label":"441303","value":"惠阳区"},{"label":"441322","value":"博罗县"},{"label":"441323","value":"惠东县"},{"label":"441324","value":"龙门县"}]},{"label":"4414","value":"梅州市","children":[{"label":"441402","value":"梅江区"},{"label":"441403","value":"梅县区"},{"label":"441422","value":"大埔县"},{"label":"441423","value":"丰顺县"},{"label":"441424","value":"五华县"},{"label":"441426","value":"平远县"},{"label":"441427","value":"蕉岭县"},{"label":"441481","value":"兴宁市"}]},{"label":"4415","value":"汕尾市","children":[{"label":"441502","value":"城区"},{"label":"441521","value":"海丰县"},{"label":"441523","value":"陆河县"},{"label":"441581","value":"陆丰市"}]},{"label":"4416","value":"河源市","children":[{"label":"441602","value":"源城区"},{"label":"441621","value":"紫金县"},{"label":"441622","value":"龙川县"},{"label":"441623","value":"连平县"},{"label":"441624","value":"和平县"},{"label":"441625","value":"东源县"}]},{"label":"4417","value":"阳江市","children":[{"label":"441702","value":"江城区"},{"label":"441704","value":"阳东区"},{"label":"441721","value":"阳西县"},{"label":"441781","value":"阳春市"}]},{"label":"4418","value":"清远市","children":[{"label":"441802","value":"清城区"},{"label":"441803","value":"清新区"},{"label":"441821","value":"佛冈县"},{"label":"441823","value":"阳山县"},{"label":"441825","value":"连山壮族瑶族自治县"},{"label":"441826","value":"连南瑶族自治县"},{"label":"441881","value":"英德市"},{"label":"441882","value":"连州市"}]},{"label":"4419","value":"东莞市","children":[{"label":"441900","value":"市辖镇"}]},{"label":"4420","value":"中山市","children":[{"label":"442000","value":"市辖镇"}]},{"label":"4451","value":"潮州市","children":[{"label":"445102","value":"湘桥区"},{"label":"445103","value":"潮安区"},{"label":"445122","value":"饶平县"}]},{"label":"4452","value":"揭阳市","children":[{"label":"445202","value":"榕城区"},{"label":"445203","value":"揭东区"},{"label":"445222","value":"揭西县"},{"label":"445224","value":"惠来县"},{"label":"445281","value":"普宁市"}]},{"label":"4453","value":"云浮市","children":[{"label":"445302","value":"云城区"},{"label":"445303","value":"云安区"},{"label":"445321","value":"新兴县"},{"label":"445322","value":"郁南县"},{"label":"445381","value":"罗定市"}]}]},{"label":"45","value":"广西区","children":[{"label":"4501","value":"南宁市","children":[{"label":"450102","value":"兴宁区"},{"label":"450103","value":"青秀区"},{"label":"450105","value":"江南区"},{"label":"450107","value":"西乡塘区"},{"label":"450108","value":"良庆区"},{"label":"450109","value":"邕宁区"},{"label":"450110","value":"武鸣区"},{"label":"450123","value":"隆安县"},{"label":"450124","value":"马山县"},{"label":"450125","value":"上林县"},{"label":"450126","value":"宾阳县"},{"label":"450127","value":"横县"}]},{"label":"4502","value":"柳州市","children":[{"label":"450202","value":"城中区"},{"label":"450203","value":"鱼峰区"},{"label":"450204","value":"柳南区"},{"label":"450205","value":"柳北区"},{"label":"450206","value":"柳江区"},{"label":"450222","value":"柳城县"},{"label":"450223","value":"鹿寨县"},{"label":"450224","value":"融安县"},{"label":"450225","value":"融水苗族自治县"},{"label":"450226","value":"三江侗族自治县"}]},{"label":"4503","value":"桂林市","children":[{"label":"450302","value":"秀峰区"},{"label":"450303","value":"叠彩区"},{"label":"450304","value":"象山区"},{"label":"450305","value":"七星区"},{"label":"450311","value":"雁山区"},{"label":"450312","value":"临桂区"},{"label":"450321","value":"阳朔县"},{"label":"450323","value":"灵川县"},{"label":"450324","value":"全州县"},{"label":"450325","value":"兴安县"},{"label":"450326","value":"永福县"},{"label":"450327","value":"灌阳县"},{"label":"450328","value":"龙胜各族自治县"},{"label":"450329","value":"资源县"},{"label":"450330","value":"平乐县"},{"label":"450331","value":"荔浦县"},{"label":"450332","value":"恭城瑶族自治县"}]},{"label":"4504","value":"梧州市","children":[{"label":"450403","value":"万秀区"},{"label":"450405","value":"长洲区"},{"label":"450406","value":"龙圩区"},{"label":"450421","value":"苍梧县"},{"label":"450422","value":"藤县"},{"label":"450423","value":"蒙山县"},{"label":"450481","value":"岑溪市"}]},{"label":"4505","value":"北海市","children":[{"label":"450502","value":"海城区"},{"label":"450503","value":"银海区"},{"label":"450512","value":"铁山港区"},{"label":"450521","value":"合浦县"}]},{"label":"4506","value":"防城港市","children":[{"label":"450602","value":"港口区"},{"label":"450603","value":"防城区"},{"label":"450621","value":"上思县"},{"label":"450681","value":"东兴市"}]},{"label":"4507","value":"钦州市","children":[{"label":"450702","value":"钦南区"},{"label":"450703","value":"钦北区"},{"label":"450721","value":"灵山县"},{"label":"450722","value":"浦北县"}]},{"label":"4508","value":"贵港市","children":[{"label":"450802","value":"港北区"},{"label":"450803","value":"港南区"},{"label":"450804","value":"覃塘区"},{"label":"450821","value":"平南县"},{"label":"450881","value":"桂平市"}]},{"label":"4509","value":"玉林市","children":[{"label":"450902","value":"玉州区"},{"label":"450903","value":"福绵区"},{"label":"450921","value":"容县"},{"label":"450922","value":"陆川县"},{"label":"450923","value":"博白县"},{"label":"450924","value":"兴业县"},{"label":"450981","value":"北流市"}]},{"label":"4510","value":"百色市","children":[{"label":"451002","value":"右江区"},{"label":"451021","value":"田阳县"},{"label":"451022","value":"田东县"},{"label":"451023","value":"平果县"},{"label":"451024","value":"德保县"},{"label":"451026","value":"那坡县"},{"label":"451027","value":"凌云县"},{"label":"451028","value":"乐业县"},{"label":"451029","value":"田林县"},{"label":"451030","value":"西林县"},{"label":"451031","value":"隆林各族自治县"},{"label":"451081","value":"靖西市"}]},{"label":"4511","value":"贺州市","children":[{"label":"451102","value":"八步区"},{"label":"451103","value":"平桂区"},{"label":"451121","value":"昭平县"},{"label":"451122","value":"钟山县"},{"label":"451123","value":"富川瑶族自治县"}]},{"label":"4512","value":"河池市","children":[{"label":"451202","value":"金城江区"},{"label":"451221","value":"南丹县"},{"label":"451222","value":"天峨县"},{"label":"451223","value":"凤山县"},{"label":"451224","value":"东兰县"},{"label":"451225","value":"罗城仫佬族自治县"},{"label":"451226","value":"环江毛南族自治县"},{"label":"451227","value":"巴马瑶族自治县"},{"label":"451228","value":"都安瑶族自治县"},{"label":"451229","value":"大化瑶族自治县"},{"label":"451281","value":"宜州市"}]},{"label":"4513","value":"来宾市","children":[{"label":"451302","value":"兴宾区"},{"label":"451321","value":"忻城县"},{"label":"451322","value":"象州县"},{"label":"451323","value":"武宣县"},{"label":"451324","value":"金秀瑶族自治县"},{"label":"451381","value":"合山市"}]},{"label":"4514","value":"崇左市","children":[{"label":"451402","value":"江州区"},{"label":"451421","value":"扶绥县"},{"label":"451422","value":"宁明县"},{"label":"451423","value":"龙州县"},{"label":"451424","value":"大新县"},{"label":"451425","value":"天等县"},{"label":"451481","value":"凭祥市"}]}]},{"label":"46","value":"海南省","children":[{"label":"4601","value":"海口市","children":[{"label":"460105","value":"秀英区"},{"label":"460106","value":"龙华区"},{"label":"460107","value":"琼山区"},{"label":"460108","value":"美兰区"}]},{"label":"4602","value":"三亚市","children":[{"label":"460201","value":"市辖区"},{"label":"460202","value":"海棠区"},{"label":"460203","value":"吉阳区"},{"label":"460204","value":"天涯区"},{"label":"460205","value":"崖州区"}]},{"label":"4603","value":"三沙市","children":[{"label":"460321","value":"西沙群岛"},{"label":"460322","value":"南沙群岛"},{"label":"460323","value":"中沙群岛的岛礁及其海域"}]},{"label":"4604","value":"儋州市","children":[]},{"label":"4690","value":"省直辖县级行政区划","children":[{"label":"469001","value":"五指山市"},{"label":"469002","value":"琼海市"},{"label":"469005","value":"文昌市"},{"label":"469006","value":"万宁市"},{"label":"469007","value":"东方市"},{"label":"469021","value":"定安县"},{"label":"469022","value":"屯昌县"},{"label":"469023","value":"澄迈县"},{"label":"469024","value":"临高县"},{"label":"469025","value":"白沙黎族自治县"},{"label":"469026","value":"昌江黎族自治县"},{"label":"469027","value":"乐东黎族自治县"},{"label":"469028","value":"陵水黎族自治县"},{"label":"469029","value":"保亭黎族苗族自治县"},{"label":"469030","value":"琼中黎族苗族自治县"}]}]},{"label":"50","value":"重庆市","children":[{"label":"5001","value":"市辖区","children":[{"label":"500101","value":"万州区"},{"label":"500102","value":"涪陵区"},{"label":"500103","value":"渝中区"},{"label":"500104","value":"大渡口区"},{"label":"500105","value":"江北区"},{"label":"500106","value":"沙坪坝区"},{"label":"500107","value":"九龙坡区"},{"label":"500108","value":"南岸区"},{"label":"500109","value":"北碚区"},{"label":"500110","value":"綦江区"},{"label":"500111","value":"大足区"},{"label":"500112","value":"渝北区"},{"label":"500113","value":"巴南区"},{"label":"500114","value":"黔江区"},{"label":"500115","value":"长寿区"},{"label":"500116","value":"江津区"},{"label":"500117","value":"合川区"},{"label":"500118","value":"永川区"},{"label":"500119","value":"南川区"},{"label":"500120","value":"璧山区"},{"label":"500151","value":"铜梁区"},{"label":"500152","value":"潼南区"},{"label":"500153","value":"荣昌区"},{"label":"500154","value":"开州区"}]},{"label":"5002","value":"县","children":[{"label":"500228","value":"梁平县"},{"label":"500229","value":"城口县"},{"label":"500230","value":"丰都县"},{"label":"500231","value":"垫江县"},{"label":"500232","value":"武隆县"},{"label":"500233","value":"忠县"},{"label":"500235","value":"云阳县"},{"label":"500236","value":"奉节县"},{"label":"500237","value":"巫山县"},{"label":"500238","value":"巫溪县"},{"label":"500240","value":"石柱土家族自治县"},{"label":"500241","value":"秀山土家族苗族自治县"},{"label":"500242","value":"酉阳土家族苗族自治县"},{"label":"500243","value":"彭水苗族土家族自治县"}]}]},{"label":"51","value":"四川省","children":[{"label":"5101","value":"成都市","children":[{"label":"510104","value":"锦江区"},{"label":"510105","value":"青羊区"},{"label":"510106","value":"金牛区"},{"label":"510107","value":"武侯区"},{"label":"510108","value":"成华区"},{"label":"510112","value":"龙泉驿区"},{"label":"510113","value":"青白江区"},{"label":"510114","value":"新都区"},{"label":"510115","value":"温江区"},{"label":"510116","value":"双流区"},{"label":"510121","value":"金堂县"},{"label":"510124","value":"郫县"},{"label":"510129","value":"大邑县"},{"label":"510131","value":"蒲江县"},{"label":"510132","value":"新津县"},{"label":"510181","value":"都江堰市"},{"label":"510182","value":"彭州市"},{"label":"510183","value":"邛崃市"},{"label":"510184","value":"崇州市"},{"label":"510185","value":"简阳市"}]},{"label":"5103","value":"自贡市","children":[{"label":"510302","value":"自流井区"},{"label":"510303","value":"贡井区"},{"label":"510304","value":"大安区"},{"label":"510311","value":"沿滩区"},{"label":"510321","value":"荣县"},{"label":"510322","value":"富顺县"}]},{"label":"5104","value":"攀枝花市","children":[{"label":"510402","value":"东区"},{"label":"510403","value":"西区"},{"label":"510411","value":"仁和区"},{"label":"510421","value":"米易县"},{"label":"510422","value":"盐边县"}]},{"label":"5105","value":"泸州市","children":[{"label":"510502","value":"江阳区"},{"label":"510503","value":"纳溪区"},{"label":"510504","value":"龙马潭区"},{"label":"510521","value":"泸县"},{"label":"510522","value":"合江县"},{"label":"510524","value":"叙永县"},{"label":"510525","value":"古蔺县"}]},{"label":"5106","value":"德阳市","children":[{"label":"510603","value":"旌阳区"},{"label":"510623","value":"中江县"},{"label":"510626","value":"罗江县"},{"label":"510681","value":"广汉市"},{"label":"510682","value":"什邡市"},{"label":"510683","value":"绵竹市"}]},{"label":"5107","value":"绵阳市","children":[{"label":"510703","value":"涪城区"},{"label":"510704","value":"游仙区"},{"label":"510705","value":"安州区"},{"label":"510722","value":"三台县"},{"label":"510723","value":"盐亭县"},{"label":"510725","value":"梓潼县"},{"label":"510726","value":"北川羌族自治县"},{"label":"510727","value":"平武县"},{"label":"510781","value":"江油市"}]},{"label":"5108","value":"广元市","children":[{"label":"510802","value":"利州区"},{"label":"510811","value":"昭化区"},{"label":"510812","value":"朝天区"},{"label":"510821","value":"旺苍县"},{"label":"510822","value":"青川县"},{"label":"510823","value":"剑阁县"},{"label":"510824","value":"苍溪县"}]},{"label":"5109","value":"遂宁市","children":[{"label":"510903","value":"船山区"},{"label":"510904","value":"安居区"},{"label":"510921","value":"蓬溪县"},{"label":"510922","value":"射洪县"},{"label":"510923","value":"大英县"}]},{"label":"5110","value":"内江市","children":[{"label":"511002","value":"市中区"},{"label":"511011","value":"东兴区"},{"label":"511024","value":"威远县"},{"label":"511025","value":"资中县"},{"label":"511028","value":"隆昌县"}]},{"label":"5111","value":"乐山市","children":[{"label":"511102","value":"市中区"},{"label":"511111","value":"沙湾区"},{"label":"511112","value":"五通桥区"},{"label":"511113","value":"金口河区"},{"label":"511123","value":"犍为县"},{"label":"511124","value":"井研县"},{"label":"511126","value":"夹江县"},{"label":"511129","value":"沐川县"},{"label":"511132","value":"峨边彝族自治县"},{"label":"511133","value":"马边彝族自治县"},{"label":"511181","value":"峨眉山市"}]},{"label":"5113","value":"南充市","children":[{"label":"511302","value":"顺庆区"},{"label":"511303","value":"高坪区"},{"label":"511304","value":"嘉陵区"},{"label":"511321","value":"南部县"},{"label":"511322","value":"营山县"},{"label":"511323","value":"蓬安县"},{"label":"511324","value":"仪陇县"},{"label":"511325","value":"西充县"},{"label":"511381","value":"阆中市"}]},{"label":"5114","value":"眉山市","children":[{"label":"511402","value":"东坡区"},{"label":"511403","value":"彭山区"},{"label":"511421","value":"仁寿县"},{"label":"511423","value":"洪雅县"},{"label":"511424","value":"丹棱县"},{"label":"511425","value":"青神县"}]},{"label":"5115","value":"宜宾市","children":[{"label":"511502","value":"翠屏区"},{"label":"511503","value":"南溪区"},{"label":"511521","value":"宜宾县"},{"label":"511523","value":"江安县"},{"label":"511524","value":"长宁县"},{"label":"511525","value":"高县"},{"label":"511526","value":"珙县"},{"label":"511527","value":"筠连县"},{"label":"511528","value":"兴文县"},{"label":"511529","value":"屏山县"}]},{"label":"5116","value":"广安市","children":[{"label":"511602","value":"广安区"},{"label":"511603","value":"前锋区"},{"label":"511621","value":"岳池县"},{"label":"511622","value":"武胜县"},{"label":"511623","value":"邻水县"},{"label":"511681","value":"华蓥市"}]},{"label":"5117","value":"达州市","children":[{"label":"511702","value":"通川区"},{"label":"511703","value":"达川区"},{"label":"511722","value":"宣汉县"},{"label":"511723","value":"开江县"},{"label":"511724","value":"大竹县"},{"label":"511725","value":"渠县"},{"label":"511781","value":"万源市"}]},{"label":"5118","value":"雅安市","children":[{"label":"511802","value":"雨城区"},{"label":"511803","value":"名山区"},{"label":"511822","value":"荥经县"},{"label":"511823","value":"汉源县"},{"label":"511824","value":"石棉县"},{"label":"511825","value":"天全县"},{"label":"511826","value":"芦山县"},{"label":"511827","value":"宝兴县"}]},{"label":"5119","value":"巴中市","children":[{"label":"511902","value":"巴州区"},{"label":"511903","value":"恩阳区"},{"label":"511921","value":"通江县"},{"label":"511922","value":"南江县"},{"label":"511923","value":"平昌县"}]},{"label":"5120","value":"资阳市","children":[{"label":"512002","value":"雁江区"},{"label":"512021","value":"安岳县"},{"label":"512022","value":"乐至县"}]},{"label":"5132","value":"阿坝藏族羌族自治州","children":[{"label":"513201","value":"马尔康市"},{"label":"513221","value":"汶川县"},{"label":"513222","value":"理县"},{"label":"513223","value":"茂县"},{"label":"513224","value":"松潘县"},{"label":"513225","value":"九寨沟县"},{"label":"513226","value":"金川县"},{"label":"513227","value":"小金县"},{"label":"513228","value":"黑水县"},{"label":"513230","value":"壤塘县"},{"label":"513231","value":"阿坝县"},{"label":"513232","value":"若尔盖县"},{"label":"513233","value":"红原县"}]},{"label":"5133","value":"甘孜藏族自治州","children":[{"label":"513301","value":"康定市"},{"label":"513322","value":"泸定县"},{"label":"513323","value":"丹巴县"},{"label":"513324","value":"九龙县"},{"label":"513325","value":"雅江县"},{"label":"513326","value":"道孚县"},{"label":"513327","value":"炉霍县"},{"label":"513328","value":"甘孜县"},{"label":"513329","value":"新龙县"},{"label":"513330","value":"德格县"},{"label":"513331","value":"白玉县"},{"label":"513332","value":"石渠县"},{"label":"513333","value":"色达县"},{"label":"513334","value":"理塘县"},{"label":"513335","value":"巴塘县"},{"label":"513336","value":"乡城县"},{"label":"513337","value":"稻城县"},{"label":"513338","value":"得荣县"}]},{"label":"5134","value":"凉山彝族自治州","children":[{"label":"513401","value":"西昌市"},{"label":"513422","value":"木里藏族自治县"},{"label":"513423","value":"盐源县"},{"label":"513424","value":"德昌县"},{"label":"513425","value":"会理县"},{"label":"513426","value":"会东县"},{"label":"513427","value":"宁南县"},{"label":"513428","value":"普格县"},{"label":"513429","value":"布拖县"},{"label":"513430","value":"金阳县"},{"label":"513431","value":"昭觉县"},{"label":"513432","value":"喜德县"},{"label":"513433","value":"冕宁县"},{"label":"513434","value":"越西县"},{"label":"513435","value":"甘洛县"},{"label":"513436","value":"美姑县"},{"label":"513437","value":"雷波县"}]}]},{"label":"52","value":"贵州省","children":[{"label":"5201","value":"贵阳市","children":[{"label":"520102","value":"南明区"},{"label":"520103","value":"云岩区"},{"label":"520111","value":"花溪区"},{"label":"520112","value":"乌当区"},{"label":"520113","value":"白云区"},{"label":"520115","value":"观山湖区"},{"label":"520121","value":"开阳县"},{"label":"520122","value":"息烽县"},{"label":"520123","value":"修文县"},{"label":"520181","value":"清镇市"}]},{"label":"5202","value":"六盘水市","children":[{"label":"520201","value":"钟山区"},{"label":"520203","value":"六枝特区"},{"label":"520221","value":"水城县"},{"label":"520222","value":"盘州"}]},{"label":"5203","value":"遵义市","children":[{"label":"520302","value":"红花岗区"},{"label":"520303","value":"汇川区"},{"label":"520304","value":"播州区"},{"label":"520322","value":"桐梓县"},{"label":"520323","value":"绥阳县"},{"label":"520324","value":"正安县"},{"label":"520325","value":"道真仡佬族苗族自治县"},{"label":"520326","value":"务川仡佬族苗族自治县"},{"label":"520327","value":"凤冈县"},{"label":"520328","value":"湄潭县"},{"label":"520329","value":"余庆县"},{"label":"520330","value":"习水县"},{"label":"520381","value":"赤水市"},{"label":"520382","value":"仁怀市"}]},{"label":"5204","value":"安顺市","children":[{"label":"520402","value":"西秀区"},{"label":"520403","value":"平坝区"},{"label":"520422","value":"普定县"},{"label":"520423","value":"镇宁布依族苗族自治县"},{"label":"520424","value":"关岭布依族苗族自治县"},{"label":"520425","value":"紫云苗族布依族自治县"}]},{"label":"5205","value":"毕节市","children":[{"label":"520502","value":"七星关区"},{"label":"520521","value":"大方县"},{"label":"520522","value":"黔西县"},{"label":"520523","value":"金沙县"},{"label":"520524","value":"织金县"},{"label":"520525","value":"纳雍县"},{"label":"520526","value":"威宁彝族回族苗族自治县"},{"label":"520527","value":"赫章县"}]},{"label":"5206","value":"铜仁市","children":[{"label":"520602","value":"碧江区"},{"label":"520603","value":"万山区"},{"label":"520621","value":"江口县"},{"label":"520622","value":"玉屏侗族自治县"},{"label":"520623","value":"石阡县"},{"label":"520624","value":"思南县"},{"label":"520625","value":"印江土家族苗族自治县"},{"label":"520626","value":"德江县"},{"label":"520627","value":"沿河土家族自治县"},{"label":"520628","value":"松桃苗族自治县"}]},{"label":"5223","value":"黔西南布依族苗族自治州","children":[{"label":"522301","value":"兴义市"},{"label":"522322","value":"兴仁县"},{"label":"522323","value":"普安县"},{"label":"522324","value":"晴隆县"},{"label":"522325","value":"贞丰县"},{"label":"522326","value":"望谟县"},{"label":"522327","value":"册亨县"},{"label":"522328","value":"安龙县"}]},{"label":"5226","value":"黔东南苗族侗族自治州","children":[{"label":"522601","value":"凯里市"},{"label":"522622","value":"黄平县"},{"label":"522623","value":"施秉县"},{"label":"522624","value":"三穗县"},{"label":"522625","value":"镇远县"},{"label":"522626","value":"岑巩县"},{"label":"522627","value":"天柱县"},{"label":"522628","value":"锦屏县"},{"label":"522629","value":"剑河县"},{"label":"522630","value":"台江县"},{"label":"522631","value":"黎平县"},{"label":"522632","value":"榕江县"},{"label":"522633","value":"从江县"},{"label":"522634","value":"雷山县"},{"label":"522635","value":"麻江县"},{"label":"522636","value":"丹寨县"}]},{"label":"5227","value":"黔南布依族苗族自治州","children":[{"label":"522701","value":"都匀市"},{"label":"522702","value":"福泉市"},{"label":"522722","value":"荔波县"},{"label":"522723","value":"贵定县"},{"label":"522725","value":"瓮安县"},{"label":"522726","value":"独山县"},{"label":"522727","value":"平塘县"},{"label":"522728","value":"罗甸县"},{"label":"522729","value":"长顺县"},{"label":"522730","value":"龙里县"},{"label":"522731","value":"惠水县"},{"label":"522732","value":"三都水族自治县"}]}]},{"label":"53","value":"云南省","children":[{"label":"5301","value":"昆明市","children":[{"label":"530102","value":"五华区"},{"label":"530103","value":"盘龙区"},{"label":"530111","value":"官渡区"},{"label":"530112","value":"西山区"},{"label":"530113","value":"东川区"},{"label":"530114","value":"呈贡区"},{"label":"530122","value":"晋宁县"},{"label":"530124","value":"富民县"},{"label":"530125","value":"宜良县"},{"label":"530126","value":"石林彝族自治县"},{"label":"530127","value":"嵩明县"},{"label":"530128","value":"禄劝彝族苗族自治县"},{"label":"530129","value":"寻甸回族彝族自治县"},{"label":"530181","value":"安宁市"}]},{"label":"5303","value":"曲靖市","children":[{"label":"530302","value":"麒麟区"},{"label":"530303","value":"沾益区"},{"label":"530321","value":"马龙县"},{"label":"530322","value":"陆良县"},{"label":"530323","value":"师宗县"},{"label":"530324","value":"罗平县"},{"label":"530325","value":"富源县"},{"label":"530326","value":"会泽县"},{"label":"530381","value":"宣威市"}]},{"label":"5304","value":"玉溪市","children":[{"label":"530402","value":"红塔区"},{"label":"530403","value":"江川区"},{"label":"530422","value":"澄江县"},{"label":"530423","value":"通海县"},{"label":"530424","value":"华宁县"},{"label":"530425","value":"易门县"},{"label":"530426","value":"峨山彝族自治县"},{"label":"530427","value":"新平彝族傣族自治县"},{"label":"530428","value":"元江哈尼族彝族傣族自治县"}]},{"label":"5305","value":"保山市","children":[{"label":"530502","value":"隆阳区"},{"label":"530521","value":"施甸县"},{"label":"530523","value":"龙陵县"},{"label":"530524","value":"昌宁县"},{"label":"530581","value":"腾冲市"}]},{"label":"5306","value":"昭通市","children":[{"label":"530602","value":"昭阳区"},{"label":"530621","value":"鲁甸县"},{"label":"530622","value":"巧家县"},{"label":"530623","value":"盐津县"},{"label":"530624","value":"大关县"},{"label":"530625","value":"永善县"},{"label":"530626","value":"绥江县"},{"label":"530627","value":"镇雄县"},{"label":"530628","value":"彝良县"},{"label":"530629","value":"威信县"},{"label":"530630","value":"水富县"}]},{"label":"5307","value":"丽江市","children":[{"label":"530702","value":"古城区"},{"label":"530721","value":"玉龙纳西族自治县"},{"label":"530722","value":"永胜县"},{"label":"530723","value":"华坪县"},{"label":"530724","value":"宁蒗彝族自治县"}]},{"label":"5308","value":"普洱市","children":[{"label":"530802","value":"思茅区"},{"label":"530821","value":"宁洱哈尼族彝族自治县"},{"label":"530822","value":"墨江哈尼族自治县"},{"label":"530823","value":"景东彝族自治县"},{"label":"530824","value":"景谷傣族彝族自治县"},{"label":"530825","value":"镇沅彝族哈尼族拉祜族自治县"},{"label":"530826","value":"江城哈尼族彝族自治县"},{"label":"530827","value":"孟连傣族拉祜族佤族自治县"},{"label":"530828","value":"澜沧拉祜族自治县"},{"label":"530829","value":"西盟佤族自治县"}]},{"label":"5309","value":"临沧市","children":[{"label":"530902","value":"临翔区"},{"label":"530921","value":"凤庆县"},{"label":"530922","value":"云县"},{"label":"530923","value":"永德县"},{"label":"530924","value":"镇康县"},{"label":"530925","value":"双江拉祜族佤族布朗族傣族自治县"},{"label":"530926","value":"耿马傣族佤族自治县"},{"label":"530927","value":"沧源佤族自治县"}]},{"label":"5323","value":"楚雄彝族自治州","children":[{"label":"532301","value":"楚雄市"},{"label":"532322","value":"双柏县"},{"label":"532323","value":"牟定县"},{"label":"532324","value":"南华县"},{"label":"532325","value":"姚安县"},{"label":"532326","value":"大姚县"},{"label":"532327","value":"永仁县"},{"label":"532328","value":"元谋县"},{"label":"532329","value":"武定县"},{"label":"532331","value":"禄丰县"}]},{"label":"5325","value":"红河哈尼族彝族自治州","children":[{"label":"532501","value":"个旧市"},{"label":"532502","value":"开远市"},{"label":"532503","value":"蒙自市"},{"label":"532504","value":"弥勒市"},{"label":"532523","value":"屏边苗族自治县"},{"label":"532524","value":"建水县"},{"label":"532525","value":"石屏县"},{"label":"532527","value":"泸西县"},{"label":"532528","value":"元阳县"},{"label":"532529","value":"红河县"},{"label":"532530","value":"金平苗族瑶族傣族自治县"},{"label":"532531","value":"绿春县"},{"label":"532532","value":"河口瑶族自治县"}]},{"label":"5326","value":"文山壮族苗族自治州","children":[{"label":"532601","value":"文山市"},{"label":"532622","value":"砚山县"},{"label":"532623","value":"西畴县"},{"label":"532624","value":"麻栗坡县"},{"label":"532625","value":"马关县"},{"label":"532626","value":"丘北县"},{"label":"532627","value":"广南县"},{"label":"532628","value":"富宁县"}]},{"label":"5328","value":"西双版纳傣族自治州","children":[{"label":"532801","value":"景洪市"},{"label":"532822","value":"勐海县"},{"label":"532823","value":"勐腊县"}]},{"label":"5329","value":"大理白族自治州","children":[{"label":"532901","value":"大理市"},{"label":"532922","value":"漾濞彝族自治县"},{"label":"532923","value":"祥云县"},{"label":"532924","value":"宾川县"},{"label":"532925","value":"弥渡县"},{"label":"532926","value":"南涧彝族自治县"},{"label":"532927","value":"巍山彝族回族自治县"},{"label":"532928","value":"永平县"},{"label":"532929","value":"云龙县"},{"label":"532930","value":"洱源县"},{"label":"532931","value":"剑川县"},{"label":"532932","value":"鹤庆县"}]},{"label":"5331","value":"德宏傣族景颇族自治州","children":[{"label":"533102","value":"瑞丽市"},{"label":"533103","value":"芒市"},{"label":"533122","value":"梁河县"},{"label":"533123","value":"盈江县"},{"label":"533124","value":"陇川县"}]},{"label":"5333","value":"怒江傈僳族自治州","children":[{"label":"533301","value":"泸水市"},{"label":"533323","value":"福贡县"},{"label":"533324","value":"贡山独龙族怒族自治县"},{"label":"533325","value":"兰坪白族普米族自治县"}]},{"label":"5334","value":"迪庆藏族自治州","children":[{"label":"533401","value":"香格里拉市"},{"label":"533422","value":"德钦县"},{"label":"533423","value":"维西傈僳族自治县"}]}]},{"label":"54","value":"西藏区","children":[{"label":"5401","value":"拉萨市","children":[{"label":"540102","value":"城关区"},{"label":"540103","value":"堆龙德庆区"},{"label":"540121","value":"林周县"},{"label":"540122","value":"当雄县"},{"label":"540123","value":"尼木县"},{"label":"540124","value":"曲水县"},{"label":"540126","value":"达孜县"},{"label":"540127","value":"墨竹工卡县"}]},{"label":"5402","value":"日喀则市","children":[{"label":"540202","value":"桑珠孜区"},{"label":"540221","value":"南木林县"},{"label":"540222","value":"江孜县"},{"label":"540223","value":"定日县"},{"label":"540224","value":"萨迦县"},{"label":"540225","value":"拉孜县"},{"label":"540226","value":"昂仁县"},{"label":"540227","value":"谢通门县"},{"label":"540228","value":"白朗县"},{"label":"540229","value":"仁布县"},{"label":"540230","value":"康马县"},{"label":"540231","value":"定结县"},{"label":"540232","value":"仲巴县"},{"label":"540233","value":"亚东县"},{"label":"540234","value":"吉隆县"},{"label":"540235","value":"聂拉木县"},{"label":"540236","value":"萨嘎县"},{"label":"540237","value":"岗巴县"}]},{"label":"5403","value":"昌都市","children":[{"label":"540302","value":"卡若区"},{"label":"540321","value":"江达县"},{"label":"540322","value":"贡觉县"},{"label":"540323","value":"类乌齐县"},{"label":"540324","value":"丁青县"},{"label":"540325","value":"察雅县"},{"label":"540326","value":"八宿县"},{"label":"540327","value":"左贡县"},{"label":"540328","value":"芒康县"},{"label":"540329","value":"洛隆县"},{"label":"540330","value":"边坝县"}]},{"label":"5404","value":"林芝市","children":[{"label":"540402","value":"巴宜区"},{"label":"540421","value":"工布江达县"},{"label":"540422","value":"米林县"},{"label":"540423","value":"墨脱县"},{"label":"540424","value":"波密县"},{"label":"540425","value":"察隅县"},{"label":"540426","value":"朗县"}]},{"label":"5405","value":"山南市","children":[{"label":"540502","value":"乃东区"},{"label":"540521","value":"扎囊县"},{"label":"540522","value":"贡嘎县"},{"label":"540523","value":"桑日县"},{"label":"540524","value":"琼结县"},{"label":"540525","value":"曲松县"},{"label":"540526","value":"措美县"},{"label":"540527","value":"洛扎县"},{"label":"540528","value":"加查县"},{"label":"540529","value":"隆子县"},{"label":"540530","value":"错那县"},{"label":"540531","value":"浪卡子县"}]},{"label":"5424","value":"那曲地区","children":[{"label":"542421","value":"那曲县"},{"label":"542422","value":"嘉黎县"},{"label":"542423","value":"比如县"},{"label":"542424","value":"聂荣县"},{"label":"542425","value":"安多县"},{"label":"542426","value":"申扎县"},{"label":"542427","value":"索县"},{"label":"542428","value":"班戈县"},{"label":"542429","value":"巴青县"},{"label":"542430","value":"尼玛县"},{"label":"542431","value":"双湖县"}]},{"label":"5425","value":"阿里地区","children":[{"label":"542521","value":"普兰县"},{"label":"542522","value":"札达县"},{"label":"542523","value":"噶尔县"},{"label":"542524","value":"日土县"},{"label":"542525","value":"革吉县"},{"label":"542526","value":"改则县"},{"label":"542527","value":"措勤县"}]}]},{"label":"61","value":"陕西省","children":[{"label":"6101","value":"西安市","children":[{"label":"610102","value":"新城区"},{"label":"610103","value":"碑林区"},{"label":"610104","value":"莲湖区"},{"label":"610111","value":"灞桥区"},{"label":"610112","value":"未央区"},{"label":"610113","value":"雁塔区"},{"label":"610114","value":"阎良区"},{"label":"610115","value":"临潼区"},{"label":"610116","value":"长安区"},{"label":"610117","value":"高陵区"},{"label":"610122","value":"蓝田县"},{"label":"610124","value":"周至县"},{"label":"610125","value":"户县"}]},{"label":"6102","value":"铜川市","children":[{"label":"610202","value":"王益区"},{"label":"610203","value":"印台区"},{"label":"610204","value":"耀州区"},{"label":"610222","value":"宜君县"}]},{"label":"6103","value":"宝鸡市","children":[{"label":"610302","value":"渭滨区"},{"label":"610303","value":"金台区"},{"label":"610304","value":"陈仓区"},{"label":"610322","value":"凤翔县"},{"label":"610323","value":"岐山县"},{"label":"610324","value":"扶风县"},{"label":"610326","value":"眉县"},{"label":"610327","value":"陇县"},{"label":"610328","value":"千阳县"},{"label":"610329","value":"麟游县"},{"label":"610330","value":"凤县"},{"label":"610331","value":"太白县"}]},{"label":"6104","value":"咸阳市","children":[{"label":"610402","value":"秦都区"},{"label":"610403","value":"杨陵区"},{"label":"610404","value":"渭城区"},{"label":"610422","value":"三原县"},{"label":"610423","value":"泾阳县"},{"label":"610424","value":"乾县"},{"label":"610425","value":"礼泉县"},{"label":"610426","value":"永寿县"},{"label":"610427","value":"彬县"},{"label":"610428","value":"长武县"},{"label":"610429","value":"旬邑县"},{"label":"610430","value":"淳化县"},{"label":"610431","value":"武功县"},{"label":"610481","value":"兴平市"}]},{"label":"6105","value":"渭南市","children":[{"label":"610502","value":"临渭区"},{"label":"610503","value":"华州区"},{"label":"610522","value":"潼关县"},{"label":"610523","value":"大荔县"},{"label":"610524","value":"合阳县"},{"label":"610525","value":"澄城县"},{"label":"610526","value":"蒲城县"},{"label":"610527","value":"白水县"},{"label":"610528","value":"富平县"},{"label":"610581","value":"韩城市"},{"label":"610582","value":"华阴市"}]},{"label":"6106","value":"延安市","children":[{"label":"610602","value":"宝塔区"},{"label":"610603","value":"安塞区"},{"label":"610621","value":"延长县"},{"label":"610622","value":"延川县"},{"label":"610623","value":"子长县"},{"label":"610625","value":"志丹县"},{"label":"610626","value":"吴起县"},{"label":"610627","value":"甘泉县"},{"label":"610628","value":"富县"},{"label":"610629","value":"洛川县"},{"label":"610630","value":"宜川县"},{"label":"610631","value":"黄龙县"},{"label":"610632","value":"黄陵县"}]},{"label":"6107","value":"汉中市","children":[{"label":"610702","value":"汉台区"},{"label":"610721","value":"南郑县"},{"label":"610722","value":"城固县"},{"label":"610723","value":"洋县"},{"label":"610724","value":"西乡县"},{"label":"610725","value":"勉县"},{"label":"610726","value":"宁强县"},{"label":"610727","value":"略阳县"},{"label":"610728","value":"镇巴县"},{"label":"610729","value":"留坝县"},{"label":"610730","value":"佛坪县"}]},{"label":"6108","value":"榆林市","children":[{"label":"610802","value":"榆阳区"},{"label":"610803","value":"横山区"},{"label":"610821","value":"神木县"},{"label":"610822","value":"府谷县"},{"label":"610824","value":"靖边县"},{"label":"610825","value":"定边县"},{"label":"610826","value":"绥德县"},{"label":"610827","value":"米脂县"},{"label":"610828","value":"佳县"},{"label":"610829","value":"吴堡县"},{"label":"610830","value":"清涧县"},{"label":"610831","value":"子洲县"}]},{"label":"6109","value":"安康市","children":[{"label":"610902","value":"汉滨区"},{"label":"610921","value":"汉阴县"},{"label":"610922","value":"石泉县"},{"label":"610923","value":"宁陕县"},{"label":"610924","value":"紫阳县"},{"label":"610925","value":"岚皋县"},{"label":"610926","value":"平利县"},{"label":"610927","value":"镇坪县"},{"label":"610928","value":"旬阳县"},{"label":"610929","value":"白河县"}]},{"label":"6110","value":"商洛市","children":[{"label":"611002","value":"商州区"},{"label":"611021","value":"洛南县"},{"label":"611022","value":"丹凤县"},{"label":"611023","value":"商南县"},{"label":"611024","value":"山阳县"},{"label":"611025","value":"镇安县"},{"label":"611026","value":"柞水县"}]}]},{"label":"62","value":"甘肃省","children":[{"label":"6201","value":"兰州市","children":[{"label":"620102","value":"城关区"},{"label":"620103","value":"七里河区"},{"label":"620104","value":"西固区"},{"label":"620105","value":"安宁区"},{"label":"620111","value":"红古区"},{"label":"620121","value":"永登县"},{"label":"620122","value":"皋兰县"},{"label":"620123","value":"榆中县"}]},{"label":"6202","value":"嘉峪关市","children":[{"label":"620201","value":"市辖区"}]},{"label":"6203","value":"金昌市","children":[{"label":"620302","value":"金川区"},{"label":"620321","value":"永昌县"}]},{"label":"6204","value":"白银市","children":[{"label":"620402","value":"白银区"},{"label":"620403","value":"平川区"},{"label":"620421","value":"靖远县"},{"label":"620422","value":"会宁县"},{"label":"620423","value":"景泰县"}]},{"label":"6205","value":"天水市","children":[{"label":"620502","value":"秦州区"},{"label":"620503","value":"麦积区"},{"label":"620521","value":"清水县"},{"label":"620522","value":"秦安县"},{"label":"620523","value":"甘谷县"},{"label":"620524","value":"武山县"},{"label":"620525","value":"张家川回族自治县"}]},{"label":"6206","value":"武威市","children":[{"label":"620602","value":"凉州区"},{"label":"620621","value":"民勤县"},{"label":"620622","value":"古浪县"},{"label":"620623","value":"天祝藏族自治县"}]},{"label":"6207","value":"张掖市","children":[{"label":"620702","value":"甘州区"},{"label":"620721","value":"肃南裕固族自治县"},{"label":"620722","value":"民乐县"},{"label":"620723","value":"临泽县"},{"label":"620724","value":"高台县"},{"label":"620725","value":"山丹县"}]},{"label":"6208","value":"平凉市","children":[{"label":"620802","value":"崆峒区"},{"label":"620821","value":"泾川县"},{"label":"620822","value":"灵台县"},{"label":"620823","value":"崇信县"},{"label":"620824","value":"华亭县"},{"label":"620825","value":"庄浪县"},{"label":"620826","value":"静宁县"}]},{"label":"6209","value":"酒泉市","children":[{"label":"620902","value":"肃州区"},{"label":"620921","value":"金塔县"},{"label":"620922","value":"瓜州县"},{"label":"620923","value":"肃北蒙古族自治县"},{"label":"620924","value":"阿克塞哈萨克族自治县"},{"label":"620981","value":"玉门市"},{"label":"620982","value":"敦煌市"}]},{"label":"6210","value":"庆阳市","children":[{"label":"621002","value":"西峰区"},{"label":"621021","value":"庆城县"},{"label":"621022","value":"环县"},{"label":"621023","value":"华池县"},{"label":"621024","value":"合水县"},{"label":"621025","value":"正宁县"},{"label":"621026","value":"宁县"},{"label":"621027","value":"镇原县"}]},{"label":"6211","value":"定西市","children":[{"label":"621102","value":"安定区"},{"label":"621121","value":"通渭县"},{"label":"621122","value":"陇西县"},{"label":"621123","value":"渭源县"},{"label":"621124","value":"临洮县"},{"label":"621125","value":"漳县"},{"label":"621126","value":"岷县"}]},{"label":"6212","value":"陇南市","children":[{"label":"621202","value":"武都区"},{"label":"621221","value":"成县"},{"label":"621222","value":"文县"},{"label":"621223","value":"宕昌县"},{"label":"621224","value":"康县"},{"label":"621225","value":"西和县"},{"label":"621226","value":"礼县"},{"label":"621227","value":"徽县"},{"label":"621228","value":"两当县"}]},{"label":"6229","value":"临夏回族自治州","children":[{"label":"622901","value":"临夏市"},{"label":"622921","value":"临夏县"},{"label":"622922","value":"康乐县"},{"label":"622923","value":"永靖县"},{"label":"622924","value":"广河县"},{"label":"622925","value":"和政县"},{"label":"622926","value":"东乡族自治县"},{"label":"622927","value":"积石山保安族东乡族撒拉族自治县"}]},{"label":"6230","value":"甘南藏族自治州","children":[{"label":"623001","value":"合作市"},{"label":"623021","value":"临潭县"},{"label":"623022","value":"卓尼县"},{"label":"623023","value":"舟曲县"},{"label":"623024","value":"迭部县"},{"label":"623025","value":"玛曲县"},{"label":"623026","value":"碌曲县"},{"label":"623027","value":"夏河县"}]}]},{"label":"63","value":"青海省","children":[{"label":"6301","value":"西宁市","children":[{"label":"630102","value":"城东区"},{"label":"630103","value":"城中区"},{"label":"630104","value":"城西区"},{"label":"630105","value":"城北区"},{"label":"630121","value":"大通回族土族自治县"},{"label":"630122","value":"湟中县"},{"label":"630123","value":"湟源县"}]},{"label":"6302","value":"海东市","children":[{"label":"630202","value":"乐都区"},{"label":"630203","value":"平安区"},{"label":"630222","value":"民和回族土族自治县"},{"label":"630223","value":"互助土族自治县"},{"label":"630224","value":"化隆回族自治县"},{"label":"630225","value":"循化撒拉族自治县"}]},{"label":"6322","value":"海北藏族自治州","children":[{"label":"632221","value":"门源回族自治县"},{"label":"632222","value":"祁连县"},{"label":"632223","value":"海晏县"},{"label":"632224","value":"刚察县"}]},{"label":"6323","value":"黄南藏族自治州","children":[{"label":"632321","value":"同仁县"},{"label":"632322","value":"尖扎县"},{"label":"632323","value":"泽库县"},{"label":"632324","value":"河南蒙古族自治县"}]},{"label":"6325","value":"海南藏族自治州","children":[{"label":"632521","value":"共和县"},{"label":"632522","value":"同德县"},{"label":"632523","value":"贵德县"},{"label":"632524","value":"兴海县"},{"label":"632525","value":"贵南县"}]},{"label":"6326","value":"果洛藏族自治州","children":[{"label":"632621","value":"玛沁县"},{"label":"632622","value":"班玛县"},{"label":"632623","value":"甘德县"},{"label":"632624","value":"达日县"},{"label":"632625","value":"久治县"},{"label":"632626","value":"玛多县"}]},{"label":"6327","value":"玉树藏族自治州","children":[{"label":"632701","value":"玉树市"},{"label":"632722","value":"杂多县"},{"label":"632723","value":"称多县"},{"label":"632724","value":"治多县"},{"label":"632725","value":"囊谦县"},{"label":"632726","value":"曲麻莱县"}]},{"label":"6328","value":"海西蒙古族藏族自治州","children":[{"label":"632801","value":"格尔木市"},{"label":"632802","value":"德令哈市"},{"label":"632821","value":"乌兰县"},{"label":"632822","value":"都兰县"},{"label":"632823","value":"天峻县"}]}]},{"label":"64","value":"宁夏区","children":[{"label":"6401","value":"银川市","children":[{"label":"640104","value":"兴庆区"},{"label":"640105","value":"西夏区"},{"label":"640106","value":"金凤区"},{"label":"640121","value":"永宁县"},{"label":"640122","value":"贺兰县"},{"label":"640181","value":"灵武市"}]},{"label":"6402","value":"石嘴山市","children":[{"label":"640202","value":"大武口区"},{"label":"640205","value":"惠农区"},{"label":"640221","value":"平罗县"}]},{"label":"6403","value":"吴忠市","children":[{"label":"640302","value":"利通区"},{"label":"640303","value":"红寺堡区"},{"label":"640323","value":"盐池县"},{"label":"640324","value":"同心县"},{"label":"640381","value":"青铜峡市"}]},{"label":"6404","value":"固原市","children":[{"label":"640402","value":"原州区"},{"label":"640422","value":"西吉县"},{"label":"640423","value":"隆德县"},{"label":"640424","value":"泾源县"},{"label":"640425","value":"彭阳县"}]},{"label":"6405","value":"中卫市","children":[{"label":"640502","value":"沙坡头区"},{"label":"640521","value":"中宁县"},{"label":"640522","value":"海原县"}]}]},{"label":"65","value":"新疆区","children":[{"label":"6501","value":"乌鲁木齐市","children":[{"label":"650102","value":"天山区"},{"label":"650103","value":"沙依巴克区"},{"label":"650104","value":"新市区"},{"label":"650105","value":"水磨沟区"},{"label":"650106","value":"头屯河区"},{"label":"650107","value":"达坂城区"},{"label":"650109","value":"米东区"},{"label":"650121","value":"乌鲁木齐县"}]},{"label":"6502","value":"克拉玛依市","children":[{"label":"650202","value":"独山子区"},{"label":"650203","value":"克拉玛依区"},{"label":"650204","value":"白碱滩区"},{"label":"650205","value":"乌尔禾区"}]},{"label":"6504","value":"吐鲁番市","children":[{"label":"650402","value":"高昌区"},{"label":"650421","value":"鄯善县"},{"label":"650422","value":"托克逊县"}]},{"label":"6505","value":"哈密市","children":[{"label":"650502","value":"伊州区"},{"label":"650521","value":"巴里坤哈萨克自治县"},{"label":"650522","value":"伊吾县"}]},{"label":"6523","value":"昌吉回族自治州","children":[{"label":"652301","value":"昌吉市"},{"label":"652302","value":"阜康市"},{"label":"652323","value":"呼图壁县"},{"label":"652324","value":"玛纳斯县"},{"label":"652325","value":"奇台县"},{"label":"652327","value":"吉木萨尔县"},{"label":"652328","value":"木垒哈萨克自治县"}]},{"label":"6527","value":"博尔塔拉蒙古自治州","children":[{"label":"652701","value":"博乐市"},{"label":"652702","value":"阿拉山口市"},{"label":"652722","value":"精河县"},{"label":"652723","value":"温泉县"}]},{"label":"6528","value":"巴音郭楞蒙古自治州","children":[{"label":"652801","value":"库尔勒市"},{"label":"652822","value":"轮台县"},{"label":"652823","value":"尉犁县"},{"label":"652824","value":"若羌县"},{"label":"652825","value":"且末县"},{"label":"652826","value":"焉耆回族自治县"},{"label":"652827","value":"和静县"},{"label":"652828","value":"和硕县"},{"label":"652829","value":"博湖县"}]},{"label":"6529","value":"阿克苏地区","children":[{"label":"652901","value":"阿克苏市"},{"label":"652922","value":"温宿县"},{"label":"652923","value":"库车县"},{"label":"652924","value":"沙雅县"},{"label":"652925","value":"新和县"},{"label":"652926","value":"拜城县"},{"label":"652927","value":"乌什县"},{"label":"652928","value":"阿瓦提县"},{"label":"652929","value":"柯坪县"}]},{"label":"6530","value":"克孜勒苏柯尔克孜自治州","children":[{"label":"653001","value":"阿图什市"},{"label":"653022","value":"阿克陶县"},{"label":"653023","value":"阿合奇县"},{"label":"653024","value":"乌恰县"}]},{"label":"6531","value":"喀什地区","children":[{"label":"653101","value":"喀什市"},{"label":"653121","value":"疏附县"},{"label":"653122","value":"疏勒县"},{"label":"653123","value":"英吉沙县"},{"label":"653124","value":"泽普县"},{"label":"653125","value":"莎车县"},{"label":"653126","value":"叶城县"},{"label":"653127","value":"麦盖提县"},{"label":"653128","value":"岳普湖县"},{"label":"653129","value":"伽师县"},{"label":"653130","value":"巴楚县"},{"label":"653131","value":"塔什库尔干塔吉克自治县"}]},{"label":"6532","value":"和田地区","children":[{"label":"653201","value":"和田市"},{"label":"653221","value":"和田县"},{"label":"653222","value":"墨玉县"},{"label":"653223","value":"皮山县"},{"label":"653224","value":"洛浦县"},{"label":"653225","value":"策勒县"},{"label":"653226","value":"于田县"},{"label":"653227","value":"民丰县"}]},{"label":"6543","value":"阿勒泰地区","children":[{"label":"654321","value":"布尔津县"},{"label":"654322","value":"富蕴县"},{"label":"654323","value":"福海县"},{"label":"654301","value":"阿勒泰市"},{"label":"654326","value":"吉木乃县"},{"label":"654325","value":"青河县"},{"label":"654324","value":"哈巴河县"}]},{"label":"6590","value":"自治区直辖县级","children":[{"label":"659009","value":"昆玉"},{"label":"659008","value":"可克达拉"},{"label":"659005","value":"北屯"},{"label":"659006","value":"铁门关市"},{"label":"659004","value":"五家渠市"},{"label":"659003","value":"图木舒克市"},{"label":"659002","value":"阿拉尔市"},{"label":"659001","value":"石河子市"},{"label":"659007","value":"双河"}]},{"label":"6540","value":"伊犁哈萨克自治州","children":[{"label":"654026","value":"昭苏县"},{"label":"654022","value":"察布查尔锡伯自治县"},{"label":"654021","value":"伊宁县"},{"label":"654004","value":"霍尔果斯市"},{"label":"654003","value":"奎屯市"},{"label":"654002","value":"伊宁市"},{"label":"654023","value":"霍城县"},{"label":"654024","value":"巩留县"},{"label":"654025","value":"新源县"},{"label":"654028","value":"尼勒克县"},{"label":"654027","value":"特克斯县"}]},{"label":"6542","value":"塔城地区","children":[{"label":"654224","value":"托里县"},{"label":"654223","value":"沙湾县"},{"label":"654221","value":"额敏县"},{"label":"654225","value":"裕民县"},{"label":"654202","value":"乌苏市"},{"label":"654201","value":"塔城市"},{"label":"654226","value":"和布克赛尔蒙古自治县"}]}]}]}',
                ssq:[],
                ssqshi:[],
                ssqqu:[],
                address:{shen:'',shi:'',qu:''},
                addressDetails:{name:'',address:'',phone:'',tel:'',mail:'',shen:'',shi:'',qu:'',aid:0},
            }
        },
        mounted: function () {
            window.scrollTo(0,0)
            this.mesbox=this.carousel.methods.mesgBox()
            this.ssq=JSON.parse(this.data).data;
            this.addressDetails.shen='北京市';
//            console.log(new Data().getTime());
            this.bus.$off('useridchang')
            setTimeout(()=>{
                this.bus.$emit('activep',4)
            },10)
//            this.uid= this.$route.params.uid2
            this.bus.$on('useridchang',(mes)=>{
                this.user.userid=mes.userid
//                console.log(this.user.userid);
            })
            this.bus.$emit('getuserid','getuserid')//挂载时请求获取header组件的uid
            this.getAddressList()
//            setInterval(()=>{
//                console.log(this.user.userid);
//            },2000)
        },
        methods: {
            mesbox:function () {
            },
            logout:function () {},
            getAddressList:function () {
//                console.log(this.user.userid);
                this.$http.post(this.urlAdree+'/address/list',{uid:this.user.userid},{emulateJSON:true}).then((response)=>{
                    this.addressList=response.body
                    console.log(this.addressList);
                })
            },
            selectChang:function () {
                this.ssqshi=[]//清空市数组
                this.ssqqu = []//清空区数组
//                    console.log('address');
                for (let elem of this.ssq){
                    if (elem.value ==this.addressDetails.shen){//查找省数组中与选择的省份匹配的值
//                            console.log(elem);
                        this.ssqshi=elem.children;//把省数组中匹配的子数组赋值给市数组
//                            console.log(this.ssqshi);
//                            console.log(this.ssqshi);
                        let include=false;
                        for (let elem of this.ssqshi){//查找用户选择的市地址与新生成市列表中有没有匹配项
                            if (this.addressDetails.shi==elem.value){
                                include=true//如果存在匹配标记为true
                            }
                        }
//                        console.log(include);
                        if (include==false){//如果不存在匹配说明市列表是新生成的，把用户选择市地址赋值为市列表的第一个
                            this.addressDetails.shi = this.ssqshi[0].value
                        }
                    }
                }
                for (let elem of this.ssqshi){
                    if (elem.value ==this.addressDetails.shi){//查找省数组中与选择的市匹配的值
                        this.ssqqu=elem.children//把市数组中匹配的子数组赋值给区数组
                        let include=false
                        for (let elem of this.ssqqu){//查找用户选择的区地址与新生成区列表中有没有匹配项
                            if (this.addressDetails.qu==elem.value){
                                include=true//如果存在匹配标记为true
                            }
                        }
//                        console.log(include);
                        if (include==false){//如果不存在匹配说明区列表是新生成的，把用户选择区地址赋值为区列表的第一个
                            this.addressDetails.qu = this.ssqqu[0].value
                        }
                    }
                }
            },
            boxshow:function (aid) {
                console.log(aid);
                for (let elem of this.addressList){
                    if (elem.aid==aid){
                        console.log(elem);
                        this.addressDetails=elem
                        console.log(this.addressDetails);
                    }
                }
                let addAddress=document.querySelector("#addAddress");
                addAddress.style.display='block'
                let opacity=0.3
                let timer=setInterval(()=>{
                    opacity+=0.01
                    addAddress.style.opacity=opacity;
                    if (opacity>=1){
                        clearInterval(timer)
                    }
                },5)
            },
            boxhidden:function () {
                    let addAddress=document.querySelector("#addAddress");
                    let opacity=1
                    let timer= setInterval(()=>{
                        opacity-=0.01
                        addAddress.style.opacity=opacity
                        if (opacity<=0){
                            clearInterval(timer)
                        }
                    },5)
                    setTimeout(()=>{
                        addAddress.style.display='none'
                    },300)
            },
            addressSave:function () {
                if (this.addressDetails.name=='') {
                    this.mesbox('姓名不能为空')
                    return
                }
                if (this.addressDetails.address==''){
                    this.mesbox('地址不能为空')
                    return
                }
                if (this.addressDetails.phone==''){
                    this.mesbox('你的手机号不能为空')
                    return
                }
                if (!/^\d{11}$/.test(this.addressDetails.phone)){
                    this.mesbox('你的手机号格式不正确')
                    return
                }
                if (this.addressDetails.tel==''){
                    this.mesbox('固定电话不能为空')
                    return
                }
                if (this.addressDetails.mail==''){
                    this.mesbox('邮编不能为空');
                    return
                }
                if (this.user.userid==0){
                    this.mesbox('请登陆！');
                    return
                }
                console.log(this.addressDetails.phone);
                this.$http.post(this.urlAdree+'/address/change',this.addressDetails,{emulateJSON:true}).then((response)=>{
                    console.log(response.body);
                    this.getAddressList()
                    this.boxhidden()
                })
            },
            deladdress:function (val) {
                if (window.confirm('确定要删除该地址吗？')){
                    this.$http.post(this.urlAdree+'/address/del',{aid:val},{emulateJSON:true}).then((response)=>{
                        console.log(response.body);
                        this.mesbox('删除成功',2000)
                        this.getAddressList()
                    })
                }
            }
        },
        computed: {
            name: function () {
                return
            }
        },
        watch: {//前面属性名称:函数
            'addressDetails':{
                handler(){
                    this.selectChang()
                },
                deep:true
            },
        },
        filters: {
            filter1(){

            }
        }
    }
</script>


<style scoped>
    .cpb{
        border: 1px solid #eeee;
        box-shadow: 3px -3px 5px #eee;
        border-radius: 3px;
    }
.address-pa{
    margin-top: 10px;
    background: snow;
    transition: all 0.2s;
}
.address-pa:hover{
    background: silver;
}
.my-input-cp{
    width: 100%;
    margin:3% 0%;
    height: 3em;
}


.cp-option {width: 100%;height: 3em;display: block}
.cp-flex {display: flex;justify-content: space-between}
.cp-flex>div{
    width: 25%;
}
.my-button-sc-pd{
    width: 100px;
    height: 32px;
    background-color: black;
    color:white;
    outline: none;
    display: inline-block;
    text-align: center;
    line-height: 32px;
    overflow: hidden;
}
</style>
<style>
    /*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
    /*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */
    /*html {*/
    /*font-family: sans-serif;*/
    /*-webkit-text-size-adjust: 100%;*/
    /*-ms-text-size-adjust: 100%;*/
    /*}*/
    body {
        margin: 0;

    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    main,
    menu,
    nav,
    section,
    summary {
        display: block;
    }
    audio,
    canvas,
    progress,
    video {
        display: inline-block;
        vertical-align: baseline;
    }
    audio:not([controls]) {
        display: none;
        height: 0;
    }
    [hidden],
    template {
        display: none;
    }
    a {
        background-color: transparent;
    }
    a:active,
    a:hover {
        outline: 0;
    }
    abbr[title] {
        border-bottom: 1px dotted;
    }
    b,
    strong {
        font-weight: bold;
    }
    dfn {
        font-style: italic;
    }
    h1 {
        margin: .67em 0;
        font-size: 2em;
    }
    mark {
        color: #000;
        background: #ff0;
    }
    small {
        font-size: 80%;
    }
    sub,
    sup {
        position: relative;
        font-size: 75%;
        line-height: 0;
        vertical-align: baseline;
    }
    sup {
        top: -.5em;
    }
    sub {
        bottom: -.25em;
    }
    img {
        border: 0;
    }
    svg:not(:root) {
        overflow: hidden;
    }
    figure {
        margin: 1em 40px;
    }
    hr {
        height: 0;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
    }
    pre {
        overflow: auto;
    }
    code,
    kbd,
    pre,
    samp {
        font-family: monospace, monospace;
        font-size: 1em;
    }
    button,
    input,
    optgroup,
    select,
    textarea {
        margin: 0;
        font: inherit;
        color: inherit;
    }
    button {
        overflow: visible;
    }
    button,
    select {
        text-transform: none;
    }
    button,
    html input[type="button"],
    input[type="reset"],
    input[type="submit"] {
        -webkit-appearance: button;
        cursor: pointer;
    }
    button[disabled],
    html input[disabled] {
        cursor: default;
    }
    button::-moz-focus-inner,
    input::-moz-focus-inner {
        padding: 0;
        border: 0;
    }
    input {
        line-height: normal;
    }
    input[type="checkbox"],
    input[type="radio"] {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        height: auto;
    }
    input[type="search"] {
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        -webkit-appearance: textfield;
    }
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-decoration {
        -webkit-appearance: none;
    }
    fieldset {
        padding: .35em .625em .75em;
        margin: 0 2px;
        border: 1px solid #c0c0c0;
    }
    legend {
        padding: 0;
        border: 0;
    }
    textarea {
        overflow: auto;
    }
    optgroup {
        font-weight: bold;
    }
    table {
        border-spacing: 0;
        border-collapse: collapse;
    }
    td,
    th {
        padding: 0;
    }
    /*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */
    @media print {
        *,
        *:before,
        *:after {
            color: #000 !important;
            text-shadow: none !important;
            background: transparent !important;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
        }
        a,
        a:visited {
            text-decoration: underline;
        }
        a[href]:after {
            content: " (" attr(href) ")";
        }
        abbr[title]:after {
            content: " (" attr(title) ")";
        }
        a[href^="#"]:after,
        a[href^="javascript:"]:after {
            content: "";
        }
        pre,
        blockquote {
            border: 1px solid #999;

            page-break-inside: avoid;
        }
        thead {
            display: table-header-group;
        }
        tr,
        img {
            page-break-inside: avoid;
        }
        img {
            max-width: 100% !important;
        }
        p,
        h2,
        h3 {
            orphans: 3;
            widows: 3;
        }
        h2,
        h3 {
            page-break-after: avoid;
        }
        .navbar {
            display: none;
        }
        .btn > .caret,
        .dropup > .btn > .caret {
            border-top-color: #000 !important;
        }
        .label {
            border: 1px solid #000;
        }
        .table {
            border-collapse: collapse !important;
        }
        .table td,
        .table th {
            background-color: #fff !important;
        }
        .table-bordered th,
        .table-bordered td {
            border: 1px solid #ddd !important;
        }
    }
    @font-face {
        font-family: 'Glyphicons Halflings';

        /*src: url('../fonts/glyphicons-halflings-regular.eot');*/
        /*src: url('../fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('../fonts/glyphicons-halflings-regular.woff2') format('woff2'), url('../fonts/glyphicons-halflings-regular.woff') format('woff'), url('../fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');*/
    }
    .glyphicon {
        position: relative;
        top: 1px;
        display: inline-block;
        font-family: 'Glyphicons Halflings';
        font-style: normal;
        font-weight: normal;
        line-height: 1;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .glyphicon-asterisk:before {
        content: "\002a";
    }
    .glyphicon-plus:before {
        content: "\002b";
    }
    .glyphicon-euro:before,
    .glyphicon-eur:before {
        content: "\20ac";
    }
    .glyphicon-minus:before {
        content: "\2212";
    }
    .glyphicon-cloud:before {
        content: "\2601";
    }
    .glyphicon-envelope:before {
        content: "\2709";
    }
    .glyphicon-pencil:before {
        content: "\270f";
    }
    .glyphicon-glass:before {
        content: "\e001";
    }
    .glyphicon-music:before {
        content: "\e002";
    }
    .glyphicon-search:before {
        content: "\e003";
    }
    .glyphicon-heart:before {
        content: "\e005";
    }
    .glyphicon-star:before {
        content: "\e006";
    }
    .glyphicon-star-empty:before {
        content: "\e007";
    }
    .glyphicon-user:before {
        content: "\e008";
    }
    .glyphicon-film:before {
        content: "\e009";
    }
    .glyphicon-th-large:before {
        content: "\e010";
    }
    .glyphicon-th:before {
        content: "\e011";
    }
    .glyphicon-th-list:before {
        content: "\e012";
    }
    .glyphicon-ok:before {
        content: "\e013";
    }
    .glyphicon-remove:before {
        content: "\e014";
    }
    .glyphicon-zoom-in:before {
        content: "\e015";
    }
    .glyphicon-zoom-out:before {
        content: "\e016";
    }
    .glyphicon-off:before {
        content: "\e017";
    }
    .glyphicon-signal:before {
        content: "\e018";
    }
    .glyphicon-cog:before {
        content: "\e019";
    }
    .glyphicon-trash:before {
        content: "\e020";
    }
    .glyphicon-home:before {
        content: "\e021";
    }
    .glyphicon-file:before {
        content: "\e022";
    }
    .glyphicon-time:before {
        content: "\e023";
    }
    .glyphicon-road:before {
        content: "\e024";
    }
    .glyphicon-download-alt:before {
        content: "\e025";
    }
    .glyphicon-download:before {
        content: "\e026";
    }
    .glyphicon-upload:before {
        content: "\e027";
    }
    .glyphicon-inbox:before {
        content: "\e028";
    }
    .glyphicon-play-circle:before {
        content: "\e029";
    }
    .glyphicon-repeat:before {
        content: "\e030";
    }
    .glyphicon-refresh:before {
        content: "\e031";
    }
    .glyphicon-list-alt:before {
        content: "\e032";
    }
    .glyphicon-lock:before {
        content: "\e033";
    }
    .glyphicon-flag:before {
        content: "\e034";
    }
    .glyphicon-headphones:before {
        content: "\e035";
    }
    .glyphicon-volume-off:before {
        content: "\e036";
    }
    .glyphicon-volume-down:before {
        content: "\e037";
    }
    .glyphicon-volume-up:before {
        content: "\e038";
    }
    .glyphicon-qrcode:before {
        content: "\e039";
    }
    .glyphicon-barcode:before {
        content: "\e040";
    }
    .glyphicon-tag:before {
        content: "\e041";
    }
    .glyphicon-tags:before {
        content: "\e042";
    }
    .glyphicon-book:before {
        content: "\e043";
    }
    .glyphicon-bookmark:before {
        content: "\e044";
    }
    .glyphicon-print:before {
        content: "\e045";
    }
    .glyphicon-camera:before {
        content: "\e046";
    }
    .glyphicon-font:before {
        content: "\e047";
    }
    .glyphicon-bold:before {
        content: "\e048";
    }
    .glyphicon-italic:before {
        content: "\e049";
    }
    .glyphicon-text-height:before {
        content: "\e050";
    }
    .glyphicon-text-width:before {
        content: "\e051";
    }
    .glyphicon-align-left:before {
        content: "\e052";
    }
    .glyphicon-align-center:before {
        content: "\e053";
    }
    .glyphicon-align-right:before {
        content: "\e054";
    }
    .glyphicon-align-justify:before {
        content: "\e055";
    }
    .glyphicon-list:before {
        content: "\e056";
    }
    .glyphicon-indent-left:before {
        content: "\e057";
    }
    .glyphicon-indent-right:before {
        content: "\e058";
    }
    .glyphicon-facetime-video:before {
        content: "\e059";
    }
    .glyphicon-picture:before {
        content: "\e060";
    }
    .glyphicon-map-marker:before {
        content: "\e062";
    }
    .glyphicon-adjust:before {
        content: "\e063";
    }
    .glyphicon-tint:before {
        content: "\e064";
    }
    .glyphicon-edit:before {
        content: "\e065";
    }
    .glyphicon-share:before {
        content: "\e066";
    }
    .glyphicon-check:before {
        content: "\e067";
    }
    .glyphicon-move:before {
        content: "\e068";
    }
    .glyphicon-step-backward:before {
        content: "\e069";
    }
    .glyphicon-fast-backward:before {
        content: "\e070";
    }
    .glyphicon-backward:before {
        content: "\e071";
    }
    .glyphicon-play:before {
        content: "\e072";
    }
    .glyphicon-pause:before {
        content: "\e073";
    }
    .glyphicon-stop:before {
        content: "\e074";
    }
    .glyphicon-forward:before {
        content: "\e075";
    }
    .glyphicon-fast-forward:before {
        content: "\e076";
    }
    .glyphicon-step-forward:before {
        content: "\e077";
    }
    .glyphicon-eject:before {
        content: "\e078";
    }
    .glyphicon-chevron-left:before {
        content: "\e079";
    }
    .glyphicon-chevron-right:before {
        content: "\e080";
    }
    .glyphicon-plus-sign:before {
        content: "\e081";
    }
    .glyphicon-minus-sign:before {
        content: "\e082";
    }
    .glyphicon-remove-sign:before {
        content: "\e083";
    }
    .glyphicon-ok-sign:before {
        content: "\e084";
    }
    .glyphicon-question-sign:before {
        content: "\e085";
    }
    .glyphicon-info-sign:before {
        content: "\e086";
    }
    .glyphicon-screenshot:before {
        content: "\e087";
    }
    .glyphicon-remove-circle:before {
        content: "\e088";
    }
    .glyphicon-ok-circle:before {
        content: "\e089";
    }
    .glyphicon-ban-circle:before {
        content: "\e090";
    }
    .glyphicon-arrow-left:before {
        content: "\e091";
    }
    .glyphicon-arrow-right:before {
        content: "\e092";
    }
    .glyphicon-arrow-up:before {
        content: "\e093";
    }
    .glyphicon-arrow-down:before {
        content: "\e094";
    }
    .glyphicon-share-alt:before {
        content: "\e095";
    }
    .glyphicon-resize-full:before {
        content: "\e096";
    }
    .glyphicon-resize-small:before {
        content: "\e097";
    }
    .glyphicon-exclamation-sign:before {
        content: "\e101";
    }
    .glyphicon-gift:before {
        content: "\e102";
    }
    .glyphicon-leaf:before {
        content: "\e103";
    }
    .glyphicon-fire:before {
        content: "\e104";
    }
    .glyphicon-eye-open:before {
        content: "\e105";
    }
    .glyphicon-eye-close:before {
        content: "\e106";
    }
    .glyphicon-warning-sign:before {
        content: "\e107";
    }
    .glyphicon-plane:before {
        content: "\e108";
    }
    .glyphicon-calendar:before {
        content: "\e109";
    }
    .glyphicon-random:before {
        content: "\e110";
    }
    .glyphicon-comment:before {
        content: "\e111";
    }
    .glyphicon-magnet:before {
        content: "\e112";
    }
    .glyphicon-chevron-up:before {
        content: "\e113";
    }
    .glyphicon-chevron-down:before {
        content: "\e114";
    }
    .glyphicon-retweet:before {
        content: "\e115";
    }
    .glyphicon-shopping-cart:before {
        content: "\e116";
    }
    .glyphicon-folder-close:before {
        content: "\e117";
    }
    .glyphicon-folder-open:before {
        content: "\e118";
    }
    .glyphicon-resize-vertical:before {
        content: "\e119";
    }
    .glyphicon-resize-horizontal:before {
        content: "\e120";
    }
    .glyphicon-hdd:before {
        content: "\e121";
    }
    .glyphicon-bullhorn:before {
        content: "\e122";
    }
    .glyphicon-bell:before {
        content: "\e123";
    }
    .glyphicon-certificate:before {
        content: "\e124";
    }
    .glyphicon-thumbs-up:before {
        content: "\e125";
    }
    .glyphicon-thumbs-down:before {
        content: "\e126";
    }
    .glyphicon-hand-right:before {
        content: "\e127";
    }
    .glyphicon-hand-left:before {
        content: "\e128";
    }
    .glyphicon-hand-up:before {
        content: "\e129";
    }
    .glyphicon-hand-down:before {
        content: "\e130";
    }
    .glyphicon-circle-arrow-right:before {
        content: "\e131";
    }
    .glyphicon-circle-arrow-left:before {
        content: "\e132";
    }
    .glyphicon-circle-arrow-up:before {
        content: "\e133";
    }
    .glyphicon-circle-arrow-down:before {
        content: "\e134";
    }
    .glyphicon-globe:before {
        content: "\e135";
    }
    .glyphicon-wrench:before {
        content: "\e136";
    }
    .glyphicon-tasks:before {
        content: "\e137";
    }
    .glyphicon-filter:before {
        content: "\e138";
    }
    .glyphicon-briefcase:before {
        content: "\e139";
    }
    .glyphicon-fullscreen:before {
        content: "\e140";
    }
    .glyphicon-dashboard:before {
        content: "\e141";
    }
    .glyphicon-paperclip:before {
        content: "\e142";
    }
    .glyphicon-heart-empty:before {
        content: "\e143";
    }
    .glyphicon-link:before {
        content: "\e144";
    }
    .glyphicon-phone:before {
        content: "\e145";
    }
    .glyphicon-pushpin:before {
        content: "\e146";
    }
    .glyphicon-usd:before {
        content: "\e148";
    }
    .glyphicon-gbp:before {
        content: "\e149";
    }
    .glyphicon-sort:before {
        content: "\e150";
    }
    .glyphicon-sort-by-alphabet:before {
        content: "\e151";
    }
    .glyphicon-sort-by-alphabet-alt:before {
        content: "\e152";
    }
    .glyphicon-sort-by-order:before {
        content: "\e153";
    }
    .glyphicon-sort-by-order-alt:before {
        content: "\e154";
    }
    .glyphicon-sort-by-attributes:before {
        content: "\e155";
    }
    .glyphicon-sort-by-attributes-alt:before {
        content: "\e156";
    }
    .glyphicon-unchecked:before {
        content: "\e157";
    }
    .glyphicon-expand:before {
        content: "\e158";
    }
    .glyphicon-collapse-down:before {
        content: "\e159";
    }
    .glyphicon-collapse-up:before {
        content: "\e160";
    }
    .glyphicon-log-in:before {
        content: "\e161";
    }
    .glyphicon-flash:before {
        content: "\e162";
    }
    .glyphicon-log-out:before {
        content: "\e163";
    }
    .glyphicon-new-window:before {
        content: "\e164";
    }
    .glyphicon-record:before {
        content: "\e165";
    }
    .glyphicon-save:before {
        content: "\e166";
    }
    .glyphicon-open:before {
        content: "\e167";
    }
    .glyphicon-saved:before {
        content: "\e168";
    }
    .glyphicon-import:before {
        content: "\e169";
    }
    .glyphicon-export:before {
        content: "\e170";
    }
    .glyphicon-send:before {
        content: "\e171";
    }
    .glyphicon-floppy-disk:before {
        content: "\e172";
    }
    .glyphicon-floppy-saved:before {
        content: "\e173";
    }
    .glyphicon-floppy-remove:before {
        content: "\e174";
    }
    .glyphicon-floppy-save:before {
        content: "\e175";
    }
    .glyphicon-floppy-open:before {
        content: "\e176";
    }
    .glyphicon-credit-card:before {
        content: "\e177";
    }
    .glyphicon-transfer:before {
        content: "\e178";
    }
    .glyphicon-cutlery:before {
        content: "\e179";
    }
    .glyphicon-header:before {
        content: "\e180";
    }
    .glyphicon-compressed:before {
        content: "\e181";
    }
    .glyphicon-earphone:before {
        content: "\e182";
    }
    .glyphicon-phone-alt:before {
        content: "\e183";
    }
    .glyphicon-tower:before {
        content: "\e184";
    }
    .glyphicon-stats:before {
        content: "\e185";
    }
    .glyphicon-sd-video:before {
        content: "\e186";
    }
    .glyphicon-hd-video:before {
        content: "\e187";
    }
    .glyphicon-subtitles:before {
        content: "\e188";
    }
    .glyphicon-sound-stereo:before {
        content: "\e189";
    }
    .glyphicon-sound-dolby:before {
        content: "\e190";
    }
    .glyphicon-sound-5-1:before {
        content: "\e191";
    }
    .glyphicon-sound-6-1:before {
        content: "\e192";
    }
    .glyphicon-sound-7-1:before {
        content: "\e193";
    }
    .glyphicon-copyright-mark:before {
        content: "\e194";
    }
    .glyphicon-registration-mark:before {
        content: "\e195";
    }
    .glyphicon-cloud-download:before {
        content: "\e197";
    }
    .glyphicon-cloud-upload:before {
        content: "\e198";
    }
    .glyphicon-tree-conifer:before {
        content: "\e199";
    }
    .glyphicon-tree-deciduous:before {
        content: "\e200";
    }
    .glyphicon-cd:before {
        content: "\e201";
    }
    .glyphicon-save-file:before {
        content: "\e202";
    }
    .glyphicon-open-file:before {
        content: "\e203";
    }
    .glyphicon-level-up:before {
        content: "\e204";
    }
    .glyphicon-copy:before {
        content: "\e205";
    }
    .glyphicon-paste:before {
        content: "\e206";
    }
    .glyphicon-alert:before {
        content: "\e209";
    }
    .glyphicon-equalizer:before {
        content: "\e210";
    }
    .glyphicon-king:before {
        content: "\e211";
    }
    .glyphicon-queen:before {
        content: "\e212";
    }
    .glyphicon-pawn:before {
        content: "\e213";
    }
    .glyphicon-bishop:before {
        content: "\e214";
    }
    .glyphicon-knight:before {
        content: "\e215";
    }
    .glyphicon-baby-formula:before {
        content: "\e216";
    }
    .glyphicon-tent:before {
        content: "\26fa";
    }
    .glyphicon-blackboard:before {
        content: "\e218";
    }
    .glyphicon-bed:before {
        content: "\e219";
    }
    .glyphicon-apple:before {
        content: "\f8ff";
    }
    .glyphicon-erase:before {
        content: "\e221";
    }
    .glyphicon-hourglass:before {
        content: "\231b";
    }
    .glyphicon-lamp:before {
        content: "\e223";
    }
    .glyphicon-duplicate:before {
        content: "\e224";
    }
    .glyphicon-piggy-bank:before {
        content: "\e225";
    }
    .glyphicon-scissors:before {
        content: "\e226";
    }
    .glyphicon-bitcoin:before {
        content: "\e227";
    }
    .glyphicon-btc:before {
        content: "\e227";
    }
    .glyphicon-xbt:before {
        content: "\e227";
    }
    .glyphicon-yen:before {
        content: "\00a5";
    }
    .glyphicon-jpy:before {
        content: "\00a5";
    }
    .glyphicon-ruble:before {
        content: "\20bd";
    }
    .glyphicon-rub:before {
        content: "\20bd";
    }
    .glyphicon-scale:before {
        content: "\e230";
    }
    .glyphicon-ice-lolly:before {
        content: "\e231";
    }
    .glyphicon-ice-lolly-tasted:before {
        content: "\e232";
    }
    .glyphicon-education:before {
        content: "\e233";
    }
    .glyphicon-option-horizontal:before {
        content: "\e234";
    }
    .glyphicon-option-vertical:before {
        content: "\e235";
    }
    .glyphicon-menu-hamburger:before {
        content: "\e236";
    }
    .glyphicon-modal-window:before {
        content: "\e237";
    }
    .glyphicon-oil:before {
        content: "\e238";
    }
    .glyphicon-grain:before {
        content: "\e239";
    }
    .glyphicon-sunglasses:before {
        content: "\e240";
    }
    .glyphicon-text-size:before {
        content: "\e241";
    }
    .glyphicon-text-color:before {
        content: "\e242";
    }
    .glyphicon-text-background:before {
        content: "\e243";
    }
    .glyphicon-object-align-top:before {
        content: "\e244";
    }
    .glyphicon-object-align-bottom:before {
        content: "\e245";
    }
    .glyphicon-object-align-horizontal:before {
        content: "\e246";
    }
    .glyphicon-object-align-left:before {
        content: "\e247";
    }
    .glyphicon-object-align-vertical:before {
        content: "\e248";
    }
    .glyphicon-object-align-right:before {
        content: "\e249";
    }
    .glyphicon-triangle-right:before {
        content: "\e250";
    }
    .glyphicon-triangle-left:before {
        content: "\e251";
    }
    .glyphicon-triangle-bottom:before {
        content: "\e252";
    }
    .glyphicon-triangle-top:before {
        content: "\e253";
    }
    .glyphicon-console:before {
        content: "\e254";
    }
    .glyphicon-superscript:before {
        content: "\e255";
    }
    .glyphicon-subscript:before {
        content: "\e256";
    }
    .glyphicon-menu-left:before {
        content: "\e257";
    }
    .glyphicon-menu-right:before {
        content: "\e258";
    }
    .glyphicon-menu-down:before {
        content: "\e259";
    }
    .glyphicon-menu-up:before {
        content: "\e260";
    }
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    *:before,
    *:after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    html {
        font-size: 10px;

        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    input,
    button,
    select,
    textarea {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }
    a {
        color: #337ab7;
        text-decoration: none;
    }
    a:hover,
    a:focus {
        color: #23527c;
        text-decoration: underline;
    }
    a:focus {
        outline: 5px auto -webkit-focus-ring-color;
        outline-offset: -2px;
    }
    figure {
        margin: 0;
    }
    img {
        vertical-align: middle;
    }
    .img-responsive,
    .thumbnail > img,
    .thumbnail a > img,
    .carousel-inner > .item > img,
    .carousel-inner > .item > a > img {
        display: block;
        max-width: 100%;
        height: auto;
    }
    .img-rounded {
        border-radius: 6px;
    }
    .img-thumbnail {
        display: inline-block;
        max-width: 100%;
        height: auto;
        padding: 4px;
        line-height: 1.42857143;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        -webkit-transition: all .2s ease-in-out;
        -o-transition: all .2s ease-in-out;
        transition: all .2s ease-in-out;
    }
    .img-circle {
        border-radius: 50%;
    }
    hr {
        margin-top: 20px;
        margin-bottom: 20px;
        border: 0;
        border-top: 1px solid #eee;
    }
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
    .sr-only-focusable:active,
    .sr-only-focusable:focus {
        position: static;
        width: auto;
        height: auto;
        margin: 0;
        overflow: visible;
        clip: auto;
    }
    [role="button"] {
        cursor: pointer;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6 {
        font-family: inherit;
        font-weight: 500;
        line-height: 1.1;
        color: inherit;
    }
    h1 small,
    h2 small,
    h3 small,
    h4 small,
    h5 small,
    h6 small,
    .h1 small,
    .h2 small,
    .h3 small,
    .h4 small,
    .h5 small,
    .h6 small,
    h1 .small,
    h2 .small,
    h3 .small,
    h4 .small,
    h5 .small,
    h6 .small,
    .h1 .small,
    .h2 .small,
    .h3 .small,
    .h4 .small,
    .h5 .small,
    .h6 .small {
        font-weight: normal;
        line-height: 1;
        color: #777;
    }
    h1,
    .h1,
    h2,
    .h2,
    h3,
    .h3 {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    h1 small,
    .h1 small,
    h2 small,
    .h2 small,
    h3 small,
    .h3 small,
    h1 .small,
    .h1 .small,
    h2 .small,
    .h2 .small,
    h3 .small,
    .h3 .small {
        font-size: 65%;
    }
    h4,
    .h4,
    h5,
    .h5,
    h6,
    .h6 {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    h4 small,
    .h4 small,
    h5 small,
    .h5 small,
    h6 small,
    .h6 small,
    h4 .small,
    .h4 .small,
    h5 .small,
    .h5 .small,
    h6 .small,
    .h6 .small {
        font-size: 75%;
    }
    h1,
    .h1 {
        font-size: 36px;
    }
    h2,
    .h2 {
        font-size: 30px;
    }
    h3,
    .h3 {
        font-size: 24px;
    }
    h4,
    .h4 {
        font-size: 18px;
    }
    h5,
    .h5 {
        font-size: 14px;
    }
    h6,
    .h6 {
        font-size: 12px;
    }
    p {
        margin: 0 0 10px;
    }
    .lead {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 300;
        line-height: 1.4;
    }
    @media (min-width: 768px) {
        .lead {
            font-size: 21px;
        }
    }
    small,
    .small {
        font-size: 85%;
    }
    mark,
    .mark {
        padding: .2em;
        background-color: #fcf8e3;
    }
    .text-left {
        text-align: left;
    }
    .text-right {
        text-align: right;
    }
    .text-center {
        text-align: center;
    }
    .text-justify {
        text-align: justify;
    }
    .text-nowrap {
        white-space: nowrap;
    }
    .text-lowercase {
        text-transform: lowercase;
    }
    .text-uppercase {
        text-transform: uppercase;
    }
    .text-capitalize {
        text-transform: capitalize;
    }
    .text-muted {
        color: #777;
    }
    .text-primary {
        color: #337ab7;
    }
    a.text-primary:hover,
    a.text-primary:focus {
        color: #286090;
    }
    .text-success {
        color: #3c763d;
    }
    a.text-success:hover,
    a.text-success:focus {
        color: #2b542c;
    }
    .text-info {
        color: #31708f;
    }
    a.text-info:hover,
    a.text-info:focus {
        color: #245269;
    }
    .text-warning {
        color: #8a6d3b;
    }
    a.text-warning:hover,
    a.text-warning:focus {
        color: #66512c;
    }
    .text-danger {
        color: #a94442;
    }
    a.text-danger:hover,
    a.text-danger:focus {
        color: #843534;
    }
    .bg-primary {
        color: #fff;
        background-color: #337ab7;
    }
    a.bg-primary:hover,
    a.bg-primary:focus {
        background-color: #286090;
    }
    .bg-success {
        background-color: #dff0d8;
    }
    a.bg-success:hover,
    a.bg-success:focus {
        background-color: #c1e2b3;
    }
    .bg-info {
        background-color: #d9edf7;
    }
    a.bg-info:hover,
    a.bg-info:focus {
        background-color: #afd9ee;
    }
    .bg-warning {
        background-color: #fcf8e3;
    }
    a.bg-warning:hover,
    a.bg-warning:focus {
        background-color: #f7ecb5;
    }
    .bg-danger {
        background-color: #f2dede;
    }
    a.bg-danger:hover,
    a.bg-danger:focus {
        background-color: #e4b9b9;
    }
    .page-header {
        padding-bottom: 9px;
        margin: 40px 0 20px;
        border-bottom: 1px solid #eee;
    }
    ul,
    ol {
        margin-top: 0;
        margin-bottom: 10px;
    }
    ul ul,
    ol ul,
    ul ol,
    ol ol {
        margin-bottom: 0;
    }
    .list-unstyled {
        padding-left: 0;
        list-style: none;
    }
    .list-inline {
        padding-left: 0;
        margin-left: -5px;
        list-style: none;
    }
    .list-inline > li {
        display: inline-block;
        padding-right: 5px;
        padding-left: 5px;
    }
    dl {
        margin-top: 0;
        margin-bottom: 20px;
    }
    dt,
    dd {
        line-height: 1.42857143;
    }
    dt {
        font-weight: bold;
    }
    dd {
        margin-left: 0;
    }
    @media (min-width: 768px) {
        .dl-horizontal dt {
            float: left;
            width: 160px;
            overflow: hidden;
            clear: left;
            text-align: right;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .dl-horizontal dd {
            margin-left: 180px;
        }
    }
    abbr[title],
    abbr[data-original-title] {
        cursor: help;
        border-bottom: 1px dotted #777;
    }
    .initialism {
        font-size: 90%;
        text-transform: uppercase;
    }
    blockquote {
        padding: 10px 20px;
        margin: 0 0 20px;
        font-size: 17.5px;
        border-left: 5px solid #eee;
    }
    blockquote p:last-child,
    blockquote ul:last-child,
    blockquote ol:last-child {
        margin-bottom: 0;
    }
    blockquote footer,
    blockquote small,
    blockquote .small {
        display: block;
        font-size: 80%;
        line-height: 1.42857143;
        color: #777;
    }
    blockquote footer:before,
    blockquote small:before,
    blockquote .small:before {
        content: '\2014 \00A0';
    }
    .blockquote-reverse,
    blockquote.pull-right {
        padding-right: 15px;
        padding-left: 0;
        text-align: right;
        border-right: 5px solid #eee;
        border-left: 0;
    }
    .blockquote-reverse footer:before,
    blockquote.pull-right footer:before,
    .blockquote-reverse small:before,
    blockquote.pull-right small:before,
    .blockquote-reverse .small:before,
    blockquote.pull-right .small:before {
        content: '';
    }
    .blockquote-reverse footer:after,
    blockquote.pull-right footer:after,
    .blockquote-reverse small:after,
    blockquote.pull-right small:after,
    .blockquote-reverse .small:after,
    blockquote.pull-right .small:after {
        content: '\00A0 \2014';
    }
    address {
        margin-bottom: 20px;
        font-style: normal;
        line-height: 1.42857143;
    }
    code,
    kbd,
    pre,
    samp {
        font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
    }
    code {
        padding: 2px 4px;
        font-size: 90%;
        color: #c7254e;
        background-color: #f9f2f4;
        border-radius: 4px;
    }
    kbd {
        padding: 2px 4px;
        font-size: 90%;
        color: #fff;
        background-color: #333;
        border-radius: 3px;
        -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);
        box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);
    }
    kbd kbd {
        padding: 0;
        font-size: 100%;
        font-weight: bold;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    pre {
        display: block;
        padding: 9.5px;
        margin: 0 0 10px;
        font-size: 13px;
        line-height: 1.42857143;
        color: #333;
        word-break: break-all;
        word-wrap: break-word;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    pre code {
        padding: 0;
        font-size: inherit;
        color: inherit;
        white-space: pre-wrap;
        background-color: transparent;
        border-radius: 0;
    }
    .pre-scrollable {
        max-height: 340px;
        overflow-y: scroll;
    }
    .container {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }
    /*@media (min-width: 768px) {*/
    /*.container {*/
    /*width: 750px;*/
    /*}*/
    /*}*/
    /*@media (min-width: 992px) {*/
    /*.container {*/
    /*width: 970px;*/
    /*}*/
    /*}*/
    /*@media (min-width: 1200px) {*/
    /*.container {*/
    /*width: 1170px;*/
    /*}*/
    /*}*/
    .container-fluid {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }
    .row {
        margin-right: -15px;
        margin-left: -15px;
    }
    .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
        position: relative;
        min-height: 1px;
        padding-right: 15px;
        padding-left: 15px;
    }
    .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {
        float: left;
    }
    .col-xs-12 {
        width: 100%;
    }
    .col-xs-11 {
        width: 91.66666667%;
    }
    .col-xs-10 {
        width: 83.33333333%;
    }
    .col-xs-9 {
        width: 75%;
    }
    .col-xs-8 {
        width: 66.66666667%;
    }
    .col-xs-7 {
        width: 58.33333333%;
    }
    .col-xs-6 {
        width: 50%;
    }
    .col-xs-5 {
        width: 41.66666667%;
    }
    .col-xs-4 {
        width: 33.33333333%;
    }
    .col-xs-3 {
        width: 25%;
    }
    .col-xs-2 {
        width: 16.66666667%;
    }
    .col-xs-1 {
        width: 8.33333333%;
    }
    .col-xs-pull-12 {
        right: 100%;
    }
    .col-xs-pull-11 {
        right: 91.66666667%;
    }
    .col-xs-pull-10 {
        right: 83.33333333%;
    }
    .col-xs-pull-9 {
        right: 75%;
    }
    .col-xs-pull-8 {
        right: 66.66666667%;
    }
    .col-xs-pull-7 {
        right: 58.33333333%;
    }
    .col-xs-pull-6 {
        right: 50%;
    }
    .col-xs-pull-5 {
        right: 41.66666667%;
    }
    .col-xs-pull-4 {
        right: 33.33333333%;
    }
    .col-xs-pull-3 {
        right: 25%;
    }
    .col-xs-pull-2 {
        right: 16.66666667%;
    }
    .col-xs-pull-1 {
        right: 8.33333333%;
    }
    .col-xs-pull-0 {
        right: auto;
    }
    .col-xs-push-12 {
        left: 100%;
    }
    .col-xs-push-11 {
        left: 91.66666667%;
    }
    .col-xs-push-10 {
        left: 83.33333333%;
    }
    .col-xs-push-9 {
        left: 75%;
    }
    .col-xs-push-8 {
        left: 66.66666667%;
    }
    .col-xs-push-7 {
        left: 58.33333333%;
    }
    .col-xs-push-6 {
        left: 50%;
    }
    .col-xs-push-5 {
        left: 41.66666667%;
    }
    .col-xs-push-4 {
        left: 33.33333333%;
    }
    .col-xs-push-3 {
        left: 25%;
    }
    .col-xs-push-2 {
        left: 16.66666667%;
    }
    .col-xs-push-1 {
        left: 8.33333333%;
    }
    .col-xs-push-0 {
        left: auto;
    }
    .col-xs-offset-12 {
        margin-left: 100%;
    }
    .col-xs-offset-11 {
        margin-left: 91.66666667%;
    }
    .col-xs-offset-10 {
        margin-left: 83.33333333%;
    }
    .col-xs-offset-9 {
        margin-left: 75%;
    }
    .col-xs-offset-8 {
        margin-left: 66.66666667%;
    }
    .col-xs-offset-7 {
        margin-left: 58.33333333%;
    }
    .col-xs-offset-6 {
        margin-left: 50%;
    }
    .col-xs-offset-5 {
        margin-left: 41.66666667%;
    }
    .col-xs-offset-4 {
        margin-left: 33.33333333%;
    }
    .col-xs-offset-3 {
        margin-left: 25%;
    }
    .col-xs-offset-2 {
        margin-left: 16.66666667%;
    }
    .col-xs-offset-1 {
        margin-left: 8.33333333%;
    }
    .col-xs-offset-0 {
        margin-left: 0;
    }
    @media (min-width: 768px) {
        .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {
            float: left;
        }
        .col-sm-12 {
            width: 100%;
        }
        .col-sm-11 {
            width: 91.66666667%;
        }
        .col-sm-10 {
            width: 83.33333333%;
        }
        .col-sm-9 {
            width: 75%;
        }
        .col-sm-8 {
            width: 66.66666667%;
        }
        .col-sm-7 {
            width: 58.33333333%;
        }
        .col-sm-6 {
            width: 50%;
        }
        .col-sm-5 {
            width: 41.66666667%;
        }
        .col-sm-4 {
            width: 33.33333333%;
        }
        .col-sm-3 {
            width: 25%;
        }
        .col-sm-2 {
            width: 16.66666667%;
        }
        .col-sm-1 {
            width: 8.33333333%;
        }
        .col-sm-pull-12 {
            right: 100%;
        }
        .col-sm-pull-11 {
            right: 91.66666667%;
        }
        .col-sm-pull-10 {
            right: 83.33333333%;
        }
        .col-sm-pull-9 {
            right: 75%;
        }
        .col-sm-pull-8 {
            right: 66.66666667%;
        }
        .col-sm-pull-7 {
            right: 58.33333333%;
        }
        .col-sm-pull-6 {
            right: 50%;
        }
        .col-sm-pull-5 {
            right: 41.66666667%;
        }
        .col-sm-pull-4 {
            right: 33.33333333%;
        }
        .col-sm-pull-3 {
            right: 25%;
        }
        .col-sm-pull-2 {
            right: 16.66666667%;
        }
        .col-sm-pull-1 {
            right: 8.33333333%;
        }
        .col-sm-pull-0 {
            right: auto;
        }
        .col-sm-push-12 {
            left: 100%;
        }
        .col-sm-push-11 {
            left: 91.66666667%;
        }
        .col-sm-push-10 {
            left: 83.33333333%;
        }
        .col-sm-push-9 {
            left: 75%;
        }
        .col-sm-push-8 {
            left: 66.66666667%;
        }
        .col-sm-push-7 {
            left: 58.33333333%;
        }
        .col-sm-push-6 {
            left: 50%;
        }
        .col-sm-push-5 {
            left: 41.66666667%;
        }
        .col-sm-push-4 {
            left: 33.33333333%;
        }
        .col-sm-push-3 {
            left: 25%;
        }
        .col-sm-push-2 {
            left: 16.66666667%;
        }
        .col-sm-push-1 {
            left: 8.33333333%;
        }
        .col-sm-push-0 {
            left: auto;
        }
        .col-sm-offset-12 {
            margin-left: 100%;
        }
        .col-sm-offset-11 {
            margin-left: 91.66666667%;
        }
        .col-sm-offset-10 {
            margin-left: 83.33333333%;
        }
        .col-sm-offset-9 {
            margin-left: 75%;
        }
        .col-sm-offset-8 {
            margin-left: 66.66666667%;
        }
        .col-sm-offset-7 {
            margin-left: 58.33333333%;
        }
        .col-sm-offset-6 {
            margin-left: 50%;
        }
        .col-sm-offset-5 {
            margin-left: 41.66666667%;
        }
        .col-sm-offset-4 {
            margin-left: 33.33333333%;
        }
        .col-sm-offset-3 {
            margin-left: 25%;
        }
        .col-sm-offset-2 {
            margin-left: 16.66666667%;
        }
        .col-sm-offset-1 {
            margin-left: 8.33333333%;
        }
        .col-sm-offset-0 {
            margin-left: 0;
        }
    }
    @media (min-width: 992px) {
        .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
            float: left;
        }
        .col-md-12 {
            width: 100%;
        }
        .col-md-11 {
            width: 91.66666667%;
        }
        .col-md-10 {
            width: 83.33333333%;
        }
        .col-md-9 {
            width: 75%;
        }
        .col-md-8 {
            width: 66.66666667%;
        }
        .col-md-7 {
            width: 58.33333333%;
        }
        .col-md-6 {
            width: 50%;
        }
        .col-md-5 {
            width: 41.66666667%;
        }
        .col-md-4 {
            width: 33.33333333%;
        }
        .col-md-3 {
            width: 25%;
        }
        .col-md-2 {
            width: 16.66666667%;
        }
        .col-md-1 {
            width: 8.33333333%;
        }
        .col-md-pull-12 {
            right: 100%;
        }
        .col-md-pull-11 {
            right: 91.66666667%;
        }
        .col-md-pull-10 {
            right: 83.33333333%;
        }
        .col-md-pull-9 {
            right: 75%;
        }
        .col-md-pull-8 {
            right: 66.66666667%;
        }
        .col-md-pull-7 {
            right: 58.33333333%;
        }
        .col-md-pull-6 {
            right: 50%;
        }
        .col-md-pull-5 {
            right: 41.66666667%;
        }
        .col-md-pull-4 {
            right: 33.33333333%;
        }
        .col-md-pull-3 {
            right: 25%;
        }
        .col-md-pull-2 {
            right: 16.66666667%;
        }
        .col-md-pull-1 {
            right: 8.33333333%;
        }
        .col-md-pull-0 {
            right: auto;
        }
        .col-md-push-12 {
            left: 100%;
        }
        .col-md-push-11 {
            left: 91.66666667%;
        }
        .col-md-push-10 {
            left: 83.33333333%;
        }
        .col-md-push-9 {
            left: 75%;
        }
        .col-md-push-8 {
            left: 66.66666667%;
        }
        .col-md-push-7 {
            left: 58.33333333%;
        }
        .col-md-push-6 {
            left: 50%;
        }
        .col-md-push-5 {
            left: 41.66666667%;
        }
        .col-md-push-4 {
            left: 33.33333333%;
        }
        .col-md-push-3 {
            left: 25%;
        }
        .col-md-push-2 {
            left: 16.66666667%;
        }
        .col-md-push-1 {
            left: 8.33333333%;
        }
        .col-md-push-0 {
            left: auto;
        }
        .col-md-offset-12 {
            margin-left: 100%;
        }
        .col-md-offset-11 {
            margin-left: 91.66666667%;
        }
        .col-md-offset-10 {
            margin-left: 83.33333333%;
        }
        .col-md-offset-9 {
            margin-left: 75%;
        }
        .col-md-offset-8 {
            margin-left: 66.66666667%;
        }
        .col-md-offset-7 {
            margin-left: 58.33333333%;
        }
        .col-md-offset-6 {
            margin-left: 50%;
        }
        .col-md-offset-5 {
            margin-left: 41.66666667%;
        }
        .col-md-offset-4 {
            margin-left: 33.33333333%;
        }
        .col-md-offset-3 {
            margin-left: 25%;
        }
        .col-md-offset-2 {
            margin-left: 16.66666667%;
        }
        .col-md-offset-1 {
            margin-left: 8.33333333%;
        }
        .col-md-offset-0 {
            margin-left: 0;
        }
    }
    @media (min-width: 1200px) {
        .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {
            float: left;
        }
        .col-lg-12 {
            width: 100%;
        }
        .col-lg-11 {
            width: 91.66666667%;
        }
        .col-lg-10 {
            width: 83.33333333%;
        }
        .col-lg-9 {
            width: 75%;
        }
        .col-lg-8 {
            width: 66.66666667%;
        }
        .col-lg-7 {
            width: 58.33333333%;
        }
        .col-lg-6 {
            width: 50%;
        }
        .col-lg-5 {
            width: 41.66666667%;
        }
        .col-lg-4 {
            width: 33.33333333%;
        }
        .col-lg-3 {
            width: 25%;
        }
        .col-lg-2 {
            width: 16.66666667%;
        }
        .col-lg-1 {
            width: 8.33333333%;
        }
        .col-lg-pull-12 {
            right: 100%;
        }
        .col-lg-pull-11 {
            right: 91.66666667%;
        }
        .col-lg-pull-10 {
            right: 83.33333333%;
        }
        .col-lg-pull-9 {
            right: 75%;
        }
        .col-lg-pull-8 {
            right: 66.66666667%;
        }
        .col-lg-pull-7 {
            right: 58.33333333%;
        }
        .col-lg-pull-6 {
            right: 50%;
        }
        .col-lg-pull-5 {
            right: 41.66666667%;
        }
        .col-lg-pull-4 {
            right: 33.33333333%;
        }
        .col-lg-pull-3 {
            right: 25%;
        }
        .col-lg-pull-2 {
            right: 16.66666667%;
        }
        .col-lg-pull-1 {
            right: 8.33333333%;
        }
        .col-lg-pull-0 {
            right: auto;
        }
        .col-lg-push-12 {
            left: 100%;
        }
        .col-lg-push-11 {
            left: 91.66666667%;
        }
        .col-lg-push-10 {
            left: 83.33333333%;
        }
        .col-lg-push-9 {
            left: 75%;
        }
        .col-lg-push-8 {
            left: 66.66666667%;
        }
        .col-lg-push-7 {
            left: 58.33333333%;
        }
        .col-lg-push-6 {
            left: 50%;
        }
        .col-lg-push-5 {
            left: 41.66666667%;
        }
        .col-lg-push-4 {
            left: 33.33333333%;
        }
        .col-lg-push-3 {
            left: 25%;
        }
        .col-lg-push-2 {
            left: 16.66666667%;
        }
        .col-lg-push-1 {
            left: 8.33333333%;
        }
        .col-lg-push-0 {
            left: auto;
        }
        .col-lg-offset-12 {
            margin-left: 100%;
        }
        .col-lg-offset-11 {
            margin-left: 91.66666667%;
        }
        .col-lg-offset-10 {
            margin-left: 83.33333333%;
        }
        .col-lg-offset-9 {
            margin-left: 75%;
        }
        .col-lg-offset-8 {
            margin-left: 66.66666667%;
        }
        .col-lg-offset-7 {
            margin-left: 58.33333333%;
        }
        .col-lg-offset-6 {
            margin-left: 50%;
        }
        .col-lg-offset-5 {
            margin-left: 41.66666667%;
        }
        .col-lg-offset-4 {
            margin-left: 33.33333333%;
        }
        .col-lg-offset-3 {
            margin-left: 25%;
        }
        .col-lg-offset-2 {
            margin-left: 16.66666667%;
        }
        .col-lg-offset-1 {
            margin-left: 8.33333333%;
        }
        .col-lg-offset-0 {
            margin-left: 0;
        }
    }
    table {
        background-color: transparent;
    }
    caption {
        padding-top: 8px;
        padding-bottom: 8px;
        color: #777;
        text-align: left;
    }
    th {
        text-align: left;
    }
    .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
    }
    .table > thead > tr > th,
    .table > tbody > tr > th,
    .table > tfoot > tr > th,
    .table > thead > tr > td,
    .table > tbody > tr > td,
    .table > tfoot > tr > td {
        padding: 8px;
        line-height: 1.42857143;
        vertical-align: top;
        border-top: 1px solid #ddd;
    }
    .table > thead > tr > th {
        vertical-align: bottom;
        border-bottom: 2px solid #ddd;
    }
    .table > caption + thead > tr:first-child > th,
    .table > colgroup + thead > tr:first-child > th,
    .table > thead:first-child > tr:first-child > th,
    .table > caption + thead > tr:first-child > td,
    .table > colgroup + thead > tr:first-child > td,
    .table > thead:first-child > tr:first-child > td {
        border-top: 0;
    }
    .table > tbody + tbody {
        border-top: 2px solid #ddd;
    }
    .table .table {
        background-color: #fff;
    }
    .table-condensed > thead > tr > th,
    .table-condensed > tbody > tr > th,
    .table-condensed > tfoot > tr > th,
    .table-condensed > thead > tr > td,
    .table-condensed > tbody > tr > td,
    .table-condensed > tfoot > tr > td {
        padding: 5px;
    }
    .table-bordered {
        border: 1px solid #ddd;
    }
    .table-bordered > thead > tr > th,
    .table-bordered > tbody > tr > th,
    .table-bordered > tfoot > tr > th,
    .table-bordered > thead > tr > td,
    .table-bordered > tbody > tr > td,
    .table-bordered > tfoot > tr > td {
        border: 1px solid #ddd;
    }
    .table-bordered > thead > tr > th,
    .table-bordered > thead > tr > td {
        border-bottom-width: 2px;
    }
    .table-striped > tbody > tr:nth-of-type(odd) {
        background-color: #f9f9f9;
    }
    .table-hover > tbody > tr:hover {
        background-color: #f5f5f5;
    }
    table col[class*="col-"] {
        position: static;
        display: table-column;
        float: none;
    }
    table td[class*="col-"],
    table th[class*="col-"] {
        position: static;
        display: table-cell;
        float: none;
    }
    .table > thead > tr > td.active,
    .table > tbody > tr > td.active,
    .table > tfoot > tr > td.active,
    .table > thead > tr > th.active,
    .table > tbody > tr > th.active,
    .table > tfoot > tr > th.active,
    .table > thead > tr.active > td,
    .table > tbody > tr.active > td,
    .table > tfoot > tr.active > td,
    .table > thead > tr.active > th,
    .table > tbody > tr.active > th,
    .table > tfoot > tr.active > th {
        background-color: #f5f5f5;
    }
    .table-hover > tbody > tr > td.active:hover,
    .table-hover > tbody > tr > th.active:hover,
    .table-hover > tbody > tr.active:hover > td,
    .table-hover > tbody > tr:hover > .active,
    .table-hover > tbody > tr.active:hover > th {
        background-color: #e8e8e8;
    }
    .table > thead > tr > td.success,
    .table > tbody > tr > td.success,
    .table > tfoot > tr > td.success,
    .table > thead > tr > th.success,
    .table > tbody > tr > th.success,
    .table > tfoot > tr > th.success,
    .table > thead > tr.success > td,
    .table > tbody > tr.success > td,
    .table > tfoot > tr.success > td,
    .table > thead > tr.success > th,
    .table > tbody > tr.success > th,
    .table > tfoot > tr.success > th {
        background-color: #dff0d8;
    }
    .table-hover > tbody > tr > td.success:hover,
    .table-hover > tbody > tr > th.success:hover,
    .table-hover > tbody > tr.success:hover > td,
    .table-hover > tbody > tr:hover > .success,
    .table-hover > tbody > tr.success:hover > th {
        background-color: #d0e9c6;
    }
    .table > thead > tr > td.info,
    .table > tbody > tr > td.info,
    .table > tfoot > tr > td.info,
    .table > thead > tr > th.info,
    .table > tbody > tr > th.info,
    .table > tfoot > tr > th.info,
    .table > thead > tr.info > td,
    .table > tbody > tr.info > td,
    .table > tfoot > tr.info > td,
    .table > thead > tr.info > th,
    .table > tbody > tr.info > th,
    .table > tfoot > tr.info > th {
        background-color: #d9edf7;
    }
    .table-hover > tbody > tr > td.info:hover,
    .table-hover > tbody > tr > th.info:hover,
    .table-hover > tbody > tr.info:hover > td,
    .table-hover > tbody > tr:hover > .info,
    .table-hover > tbody > tr.info:hover > th {
        background-color: #c4e3f3;
    }
    .table > thead > tr > td.warning,
    .table > tbody > tr > td.warning,
    .table > tfoot > tr > td.warning,
    .table > thead > tr > th.warning,
    .table > tbody > tr > th.warning,
    .table > tfoot > tr > th.warning,
    .table > thead > tr.warning > td,
    .table > tbody > tr.warning > td,
    .table > tfoot > tr.warning > td,
    .table > thead > tr.warning > th,
    .table > tbody > tr.warning > th,
    .table > tfoot > tr.warning > th {
        background-color: #fcf8e3;
    }
    .table-hover > tbody > tr > td.warning:hover,
    .table-hover > tbody > tr > th.warning:hover,
    .table-hover > tbody > tr.warning:hover > td,
    .table-hover > tbody > tr:hover > .warning,
    .table-hover > tbody > tr.warning:hover > th {
        background-color: #faf2cc;
    }
    .table > thead > tr > td.danger,
    .table > tbody > tr > td.danger,
    .table > tfoot > tr > td.danger,
    .table > thead > tr > th.danger,
    .table > tbody > tr > th.danger,
    .table > tfoot > tr > th.danger,
    .table > thead > tr.danger > td,
    .table > tbody > tr.danger > td,
    .table > tfoot > tr.danger > td,
    .table > thead > tr.danger > th,
    .table > tbody > tr.danger > th,
    .table > tfoot > tr.danger > th {
        background-color: #f2dede;
    }
    .table-hover > tbody > tr > td.danger:hover,
    .table-hover > tbody > tr > th.danger:hover,
    .table-hover > tbody > tr.danger:hover > td,
    .table-hover > tbody > tr:hover > .danger,
    .table-hover > tbody > tr.danger:hover > th {
        background-color: #ebcccc;
    }
    .table-responsive {
        min-height: .01%;
        overflow-x: auto;
    }
    @media screen and (max-width: 767px) {
        .table-responsive {
            width: 100%;
            margin-bottom: 15px;
            overflow-y: hidden;
            -ms-overflow-style: -ms-autohiding-scrollbar;
            border: 1px solid #ddd;
        }
        .table-responsive > .table {
            margin-bottom: 0;
        }
        .table-responsive > .table > thead > tr > th,
        .table-responsive > .table > tbody > tr > th,
        .table-responsive > .table > tfoot > tr > th,
        .table-responsive > .table > thead > tr > td,
        .table-responsive > .table > tbody > tr > td,
        .table-responsive > .table > tfoot > tr > td {
            white-space: nowrap;
        }
        .table-responsive > .table-bordered {
            border: 0;
        }
        .table-responsive > .table-bordered > thead > tr > th:first-child,
        .table-responsive > .table-bordered > tbody > tr > th:first-child,
        .table-responsive > .table-bordered > tfoot > tr > th:first-child,
        .table-responsive > .table-bordered > thead > tr > td:first-child,
        .table-responsive > .table-bordered > tbody > tr > td:first-child,
        .table-responsive > .table-bordered > tfoot > tr > td:first-child {
            border-left: 0;
        }
        .table-responsive > .table-bordered > thead > tr > th:last-child,
        .table-responsive > .table-bordered > tbody > tr > th:last-child,
        .table-responsive > .table-bordered > tfoot > tr > th:last-child,
        .table-responsive > .table-bordered > thead > tr > td:last-child,
        .table-responsive > .table-bordered > tbody > tr > td:last-child,
        .table-responsive > .table-bordered > tfoot > tr > td:last-child {
            border-right: 0;
        }
        .table-responsive > .table-bordered > tbody > tr:last-child > th,
        .table-responsive > .table-bordered > tfoot > tr:last-child > th,
        .table-responsive > .table-bordered > tbody > tr:last-child > td,
        .table-responsive > .table-bordered > tfoot > tr:last-child > td {
            border-bottom: 0;
        }
    }
    fieldset {
        min-width: 0;
        padding: 0;
        margin: 0;
        border: 0;
    }
    legend {
        display: block;
        width: 100%;
        padding: 0;
        margin-bottom: 20px;
        font-size: 21px;
        line-height: inherit;
        color: #333;
        border: 0;
        border-bottom: 1px solid #e5e5e5;
    }
    label {
        display: inline-block;
        max-width: 100%;
        margin-bottom: 5px;
        font-weight: bold;
    }
    input[type="search"] {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    input[type="radio"],
    input[type="checkbox"] {
        margin: 4px 0 0;
        margin-top: 1px \9;
        line-height: normal;
    }
    input[type="file"] {
        display: block;
    }
    input[type="range"] {
        display: block;
        width: 100%;
    }
    select[multiple],
    select[size] {
        height: auto;
    }
    input[type="file"]:focus,
    input[type="radio"]:focus,
    input[type="checkbox"]:focus {
        outline: 5px auto -webkit-focus-ring-color;
        outline-offset: -2px;
    }
    output {
        display: block;
        padding-top: 7px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
    }
    .form-control {
        display: block;
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    }
    .form-control:focus {
        border-color: #66afe9;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
    }
    .form-control::-moz-placeholder {
        color: #999;
        opacity: 1;
    }
    .form-control:-ms-input-placeholder {
        color: #999;
    }
    .form-control::-webkit-input-placeholder {
        color: #999;
    }
    .form-control::-ms-expand {
        background-color: transparent;
        border: 0;
    }
    .form-control[disabled],
    .form-control[readonly],
    fieldset[disabled] .form-control {
        background-color: #eee;
        opacity: 1;
    }
    .form-control[disabled],
    fieldset[disabled] .form-control {
        cursor: not-allowed;
    }
    textarea.form-control {
        height: auto;
    }
    input[type="search"] {
        -webkit-appearance: none;
    }
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
        input[type="date"].form-control,
        input[type="time"].form-control,
        input[type="datetime-local"].form-control,
        input[type="month"].form-control {
            line-height: 34px;
        }
        input[type="date"].input-sm,
        input[type="time"].input-sm,
        input[type="datetime-local"].input-sm,
        input[type="month"].input-sm,
        .input-group-sm input[type="date"],
        .input-group-sm input[type="time"],
        .input-group-sm input[type="datetime-local"],
        .input-group-sm input[type="month"] {
            line-height: 30px;
        }
        input[type="date"].input-lg,
        input[type="time"].input-lg,
        input[type="datetime-local"].input-lg,
        input[type="month"].input-lg,
        .input-group-lg input[type="date"],
        .input-group-lg input[type="time"],
        .input-group-lg input[type="datetime-local"],
        .input-group-lg input[type="month"] {
            line-height: 46px;
        }
    }
    .form-group {
        margin-bottom: 15px;
    }
    .radio,
    .checkbox {
        position: relative;
        display: block;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .radio label,
    .checkbox label {
        min-height: 20px;
        padding-left: 20px;
        margin-bottom: 0;
        font-weight: normal;
        cursor: pointer;
    }
    .radio input[type="radio"],
    .radio-inline input[type="radio"],
    .checkbox input[type="checkbox"],
    .checkbox-inline input[type="checkbox"] {
        position: absolute;
        margin-top: 4px \9;
        margin-left: -20px;
    }
    .radio + .radio,
    .checkbox + .checkbox {
        margin-top: -5px;
    }
    .radio-inline,
    .checkbox-inline {
        position: relative;
        display: inline-block;
        padding-left: 20px;
        margin-bottom: 0;
        font-weight: normal;
        vertical-align: middle;
        cursor: pointer;
    }
    .radio-inline + .radio-inline,
    .checkbox-inline + .checkbox-inline {
        margin-top: 0;
        margin-left: 10px;
    }
    input[type="radio"][disabled],
    input[type="checkbox"][disabled],
    input[type="radio"].disabled,
    input[type="checkbox"].disabled,
    fieldset[disabled] input[type="radio"],
    fieldset[disabled] input[type="checkbox"] {
        cursor: not-allowed;
    }
    .radio-inline.disabled,
    .checkbox-inline.disabled,
    fieldset[disabled] .radio-inline,
    fieldset[disabled] .checkbox-inline {
        cursor: not-allowed;
    }
    .radio.disabled label,
    .checkbox.disabled label,
    fieldset[disabled] .radio label,
    fieldset[disabled] .checkbox label {
        cursor: not-allowed;
    }
    .form-control-static {
        min-height: 34px;
        padding-top: 7px;
        padding-bottom: 7px;
        margin-bottom: 0;
    }
    .form-control-static.input-lg,
    .form-control-static.input-sm {
        padding-right: 0;
        padding-left: 0;
    }
    .input-sm {
        height: 30px;
        padding: 5px 10px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
    }
    select.input-sm {
        height: 30px;
        line-height: 30px;
    }
    textarea.input-sm,
    select[multiple].input-sm {
        height: auto;
    }
    .form-group-sm .form-control {
        height: 30px;
        padding: 5px 10px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
    }
    .form-group-sm select.form-control {
        height: 30px;
        line-height: 30px;
    }
    .form-group-sm textarea.form-control,
    .form-group-sm select[multiple].form-control {
        height: auto;
    }
    .form-group-sm .form-control-static {
        height: 30px;
        min-height: 32px;
        padding: 6px 10px;
        font-size: 12px;
        line-height: 1.5;
    }
    .input-lg {
        height: 46px;
        padding: 10px 16px;
        font-size: 18px;
        line-height: 1.3333333;
        border-radius: 6px;
    }
    select.input-lg {
        height: 46px;
        line-height: 46px;
    }
    textarea.input-lg,
    select[multiple].input-lg {
        height: auto;
    }
    .form-group-lg .form-control {
        height: 46px;
        padding: 10px 16px;
        font-size: 18px;
        line-height: 1.3333333;
        border-radius: 6px;
    }
    .form-group-lg select.form-control {
        height: 46px;
        line-height: 46px;
    }
    .form-group-lg textarea.form-control,
    .form-group-lg select[multiple].form-control {
        height: auto;
    }
    .form-group-lg .form-control-static {
        height: 46px;
        min-height: 38px;
        padding: 11px 16px;
        font-size: 18px;
        line-height: 1.3333333;
    }
    .has-feedback {
        position: relative;
    }
    .has-feedback .form-control {
        padding-right: 42.5px;
    }
    .form-control-feedback {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        display: block;
        width: 34px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        pointer-events: none;
    }
    .input-lg + .form-control-feedback,
    .input-group-lg + .form-control-feedback,
    .form-group-lg .form-control + .form-control-feedback {
        width: 46px;
        height: 46px;
        line-height: 46px;
    }
    .input-sm + .form-control-feedback,
    .input-group-sm + .form-control-feedback,
    .form-group-sm .form-control + .form-control-feedback {
        width: 30px;
        height: 30px;
        line-height: 30px;
    }
    .has-success .help-block,
    .has-success .control-label,
    .has-success .radio,
    .has-success .checkbox,
    .has-success .radio-inline,
    .has-success .checkbox-inline,
    .has-success.radio label,
    .has-success.checkbox label,
    .has-success.radio-inline label,
    .has-success.checkbox-inline label {
        color: #3c763d;
    }
    .has-success .form-control {
        border-color: #3c763d;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    }
    .has-success .form-control:focus {
        border-color: #2b542c;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #67b168;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #67b168;
    }
    .has-success .input-group-addon {
        color: #3c763d;
        background-color: #dff0d8;
        border-color: #3c763d;
    }
    .has-success .form-control-feedback {
        color: #3c763d;
    }
    .has-warning .help-block,
    .has-warning .control-label,
    .has-warning .radio,
    .has-warning .checkbox,
    .has-warning .radio-inline,
    .has-warning .checkbox-inline,
    .has-warning.radio label,
    .has-warning.checkbox label,
    .has-warning.radio-inline label,
    .has-warning.checkbox-inline label {
        color: #8a6d3b;
    }
    .has-warning .form-control {
        border-color: #8a6d3b;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    }
    .has-warning .form-control:focus {
        border-color: #66512c;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #c0a16b;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #c0a16b;
    }
    .has-warning .input-group-addon {
        color: #8a6d3b;
        background-color: #fcf8e3;
        border-color: #8a6d3b;
    }
    .has-warning .form-control-feedback {
        color: #8a6d3b;
    }
    .has-error .help-block,
    .has-error .control-label,
    .has-error .radio,
    .has-error .checkbox,
    .has-error .radio-inline,
    .has-error .checkbox-inline,
    .has-error.radio label,
    .has-error.checkbox label,
    .has-error.radio-inline label,
    .has-error.checkbox-inline label {
        color: #a94442;
    }
    .has-error .form-control {
        border-color: #a94442;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    }
    .has-error .form-control:focus {
        border-color: #843534;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #ce8483;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #ce8483;
    }
    .has-error .input-group-addon {
        color: #a94442;
        background-color: #f2dede;
        border-color: #a94442;
    }
    .has-error .form-control-feedback {
        color: #a94442;
    }
    .has-feedback label ~ .form-control-feedback {
        top: 25px;
    }
    .has-feedback label.sr-only ~ .form-control-feedback {
        top: 0;
    }
    .help-block {
        display: block;
        margin-top: 5px;
        margin-bottom: 10px;
        color: #737373;
    }
    @media (min-width: 768px) {
        .form-inline .form-group {
            display: inline-block;
            margin-bottom: 0;
            vertical-align: middle;
        }
        .form-inline .form-control {
            display: inline-block;
            width: auto;
            vertical-align: middle;
        }
        .form-inline .form-control-static {
            display: inline-block;
        }
        .form-inline .input-group {
            display: inline-table;
            vertical-align: middle;
        }
        .form-inline .input-group .input-group-addon,
        .form-inline .input-group .input-group-btn,
        .form-inline .input-group .form-control {
            width: auto;
        }
        .form-inline .input-group > .form-control {
            width: 100%;
        }
        .form-inline .control-label {
            margin-bottom: 0;
            vertical-align: middle;
        }
        .form-inline .radio,
        .form-inline .checkbox {
            display: inline-block;
            margin-top: 0;
            margin-bottom: 0;
            vertical-align: middle;
        }
        .form-inline .radio label,
        .form-inline .checkbox label {
            padding-left: 0;
        }
        .form-inline .radio input[type="radio"],
        .form-inline .checkbox input[type="checkbox"] {
            position: relative;
            margin-left: 0;
        }
        .form-inline .has-feedback .form-control-feedback {
            top: 0;
        }
    }
    .form-horizontal .radio,
    .form-horizontal .checkbox,
    .form-horizontal .radio-inline,
    .form-horizontal .checkbox-inline {
        padding-top: 7px;
        margin-top: 0;
        margin-bottom: 0;
    }
    .form-horizontal .radio,
    .form-horizontal .checkbox {
        min-height: 27px;
    }
    .form-horizontal .form-group {
        margin-right: -15px;
        margin-left: -15px;
    }
    @media (min-width: 768px) {
        .form-horizontal .control-label {
            padding-top: 7px;
            margin-bottom: 0;
            text-align: right;
        }
    }
    .form-horizontal .has-feedback .form-control-feedback {
        right: 15px;
    }
    @media (min-width: 768px) {
        .form-horizontal .form-group-lg .control-label {
            padding-top: 11px;
            font-size: 18px;
        }
    }
    @media (min-width: 768px) {
        .form-horizontal .form-group-sm .control-label {
            padding-top: 6px;
            font-size: 12px;
        }
    }
    .btn {
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: normal;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
    }
    .btn:focus,
    .btn:active:focus,
    .btn.active:focus,
    .btn.focus,
    .btn:active.focus,
    .btn.active.focus {
        outline: 5px auto -webkit-focus-ring-color;
        outline-offset: -2px;
    }
    .btn:hover,
    .btn:focus,
    .btn.focus {
        color: #333;
        text-decoration: none;
    }
    .btn:active,
    .btn.active {
        background-image: none;
        outline: 0;
        -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
    }
    .btn.disabled,
    .btn[disabled],
    fieldset[disabled] .btn {
        cursor: not-allowed;
        filter: alpha(opacity=65);
        -webkit-box-shadow: none;
        box-shadow: none;
        opacity: .65;
    }
    a.btn.disabled,
    fieldset[disabled] a.btn {
        pointer-events: none;
    }
    .btn-default {
        color: #333;
        background-color: #fff;
        border-color: #ccc;
    }
    .btn-default:focus,
    .btn-default.focus {
        color: #333;
        background-color: #e6e6e6;
        border-color: #8c8c8c;
    }
    .btn-default:hover {
        color: #333;
        background-color: #e6e6e6;
        border-color: #adadad;
    }
    .btn-default:active,
    .btn-default.active,
    .open > .dropdown-toggle.btn-default {
        color: #333;
        background-color: #e6e6e6;
        border-color: #adadad;
    }
    .btn-default:active:hover,
    .btn-default.active:hover,
    .open > .dropdown-toggle.btn-default:hover,
    .btn-default:active:focus,
    .btn-default.active:focus,
    .open > .dropdown-toggle.btn-default:focus,
    .btn-default:active.focus,
    .btn-default.active.focus,
    .open > .dropdown-toggle.btn-default.focus {
        color: #333;
        background-color: #d4d4d4;
        border-color: #8c8c8c;
    }
    .btn-default:active,
    .btn-default.active,
    .open > .dropdown-toggle.btn-default {
        background-image: none;
    }
    .btn-default.disabled:hover,
    .btn-default[disabled]:hover,
    fieldset[disabled] .btn-default:hover,
    .btn-default.disabled:focus,
    .btn-default[disabled]:focus,
    fieldset[disabled] .btn-default:focus,
    .btn-default.disabled.focus,
    .btn-default[disabled].focus,
    fieldset[disabled] .btn-default.focus {
        background-color: #fff;
        border-color: #ccc;
    }
    .btn-default .badge {
        color: #fff;
        background-color: #333;
    }
    .btn-primary {
        color: #fff;
        background-color: #337ab7;
        border-color: #2e6da4;
    }
    .btn-primary:focus,
    .btn-primary.focus {
        color: #fff;
        background-color: #286090;
        border-color: #122b40;
    }
    .btn-primary:hover {
        color: #fff;
        background-color: #286090;
        border-color: #204d74;
    }
    .btn-primary:active,
    .btn-primary.active,
    .open > .dropdown-toggle.btn-primary {
        color: #fff;
        background-color: #286090;
        border-color: #204d74;
    }
    .btn-primary:active:hover,
    .btn-primary.active:hover,
    .open > .dropdown-toggle.btn-primary:hover,
    .btn-primary:active:focus,
    .btn-primary.active:focus,
    .open > .dropdown-toggle.btn-primary:focus,
    .btn-primary:active.focus,
    .btn-primary.active.focus,
    .open > .dropdown-toggle.btn-primary.focus {
        color: #fff;
        background-color: #204d74;
        border-color: #122b40;
    }
    .btn-primary:active,
    .btn-primary.active,
    .open > .dropdown-toggle.btn-primary {
        background-image: none;
    }
    .btn-primary.disabled:hover,
    .btn-primary[disabled]:hover,
    fieldset[disabled] .btn-primary:hover,
    .btn-primary.disabled:focus,
    .btn-primary[disabled]:focus,
    fieldset[disabled] .btn-primary:focus,
    .btn-primary.disabled.focus,
    .btn-primary[disabled].focus,
    fieldset[disabled] .btn-primary.focus {
        background-color: #337ab7;
        border-color: #2e6da4;
    }
    .btn-primary .badge {
        color: #337ab7;
        background-color: #fff;
    }
    .btn-success {
        color: #fff;
        background-color: #5cb85c;
        border-color: #4cae4c;
    }
    .btn-success:focus,
    .btn-success.focus {
        color: #fff;
        background-color: #449d44;
        border-color: #255625;
    }
    .btn-success:hover {
        color: #fff;
        background-color: #449d44;
        border-color: #398439;
    }
    .btn-success:active,
    .btn-success.active,
    .open > .dropdown-toggle.btn-success {
        color: #fff;
        background-color: #449d44;
        border-color: #398439;
    }
    .btn-success:active:hover,
    .btn-success.active:hover,
    .open > .dropdown-toggle.btn-success:hover,
    .btn-success:active:focus,
    .btn-success.active:focus,
    .open > .dropdown-toggle.btn-success:focus,
    .btn-success:active.focus,
    .btn-success.active.focus,
    .open > .dropdown-toggle.btn-success.focus {
        color: #fff;
        background-color: #398439;
        border-color: #255625;
    }
    .btn-success:active,
    .btn-success.active,
    .open > .dropdown-toggle.btn-success {
        background-image: none;
    }
    .btn-success.disabled:hover,
    .btn-success[disabled]:hover,
    fieldset[disabled] .btn-success:hover,
    .btn-success.disabled:focus,
    .btn-success[disabled]:focus,
    fieldset[disabled] .btn-success:focus,
    .btn-success.disabled.focus,
    .btn-success[disabled].focus,
    fieldset[disabled] .btn-success.focus {
        background-color: #5cb85c;
        border-color: #4cae4c;
    }
    .btn-success .badge {
        color: #5cb85c;
        background-color: #fff;
    }
    .btn-info {
        color: #fff;
        background-color: #5bc0de;
        border-color: #46b8da;
    }
    .btn-info:focus,
    .btn-info.focus {
        color: #fff;
        background-color: #31b0d5;
        border-color: #1b6d85;
    }
    .btn-info:hover {
        color: #fff;
        background-color: #31b0d5;
        border-color: #269abc;
    }
    .btn-info:active,
    .btn-info.active,
    .open > .dropdown-toggle.btn-info {
        color: #fff;
        background-color: #31b0d5;
        border-color: #269abc;
    }
    .btn-info:active:hover,
    .btn-info.active:hover,
    .open > .dropdown-toggle.btn-info:hover,
    .btn-info:active:focus,
    .btn-info.active:focus,
    .open > .dropdown-toggle.btn-info:focus,
    .btn-info:active.focus,
    .btn-info.active.focus,
    .open > .dropdown-toggle.btn-info.focus {
        color: #fff;
        background-color: #269abc;
        border-color: #1b6d85;
    }
    .btn-info:active,
    .btn-info.active,
    .open > .dropdown-toggle.btn-info {
        background-image: none;
    }
    .btn-info.disabled:hover,
    .btn-info[disabled]:hover,
    fieldset[disabled] .btn-info:hover,
    .btn-info.disabled:focus,
    .btn-info[disabled]:focus,
    fieldset[disabled] .btn-info:focus,
    .btn-info.disabled.focus,
    .btn-info[disabled].focus,
    fieldset[disabled] .btn-info.focus {
        background-color: #5bc0de;
        border-color: #46b8da;
    }
    .btn-info .badge {
        color: #5bc0de;
        background-color: #fff;
    }
    .btn-warning {
        color: #fff;
        background-color: #f0ad4e;
        border-color: #eea236;
    }
    .btn-warning:focus,
    .btn-warning.focus {
        color: #fff;
        background-color: #ec971f;
        border-color: #985f0d;
    }
    .btn-warning:hover {
        color: #fff;
        background-color: #ec971f;
        border-color: #d58512;
    }
    .btn-warning:active,
    .btn-warning.active,
    .open > .dropdown-toggle.btn-warning {
        color: #fff;
        background-color: #ec971f;
        border-color: #d58512;
    }
    .btn-warning:active:hover,
    .btn-warning.active:hover,
    .open > .dropdown-toggle.btn-warning:hover,
    .btn-warning:active:focus,
    .btn-warning.active:focus,
    .open > .dropdown-toggle.btn-warning:focus,
    .btn-warning:active.focus,
    .btn-warning.active.focus,
    .open > .dropdown-toggle.btn-warning.focus {
        color: #fff;
        background-color: #d58512;
        border-color: #985f0d;
    }
    .btn-warning:active,
    .btn-warning.active,
    .open > .dropdown-toggle.btn-warning {
        background-image: none;
    }
    .btn-warning.disabled:hover,
    .btn-warning[disabled]:hover,
    fieldset[disabled] .btn-warning:hover,
    .btn-warning.disabled:focus,
    .btn-warning[disabled]:focus,
    fieldset[disabled] .btn-warning:focus,
    .btn-warning.disabled.focus,
    .btn-warning[disabled].focus,
    fieldset[disabled] .btn-warning.focus {
        background-color: #f0ad4e;
        border-color: #eea236;
    }
    .btn-warning .badge {
        color: #f0ad4e;
        background-color: #fff;
    }
    .btn-danger {
        color: #fff;
        background-color: #d9534f;
        border-color: #d43f3a;
    }
    .btn-danger:focus,
    .btn-danger.focus {
        color: #fff;
        background-color: #c9302c;
        border-color: #761c19;
    }
    .btn-danger:hover {
        color: #fff;
        background-color: #c9302c;
        border-color: #ac2925;
    }
    .btn-danger:active,
    .btn-danger.active,
    .open > .dropdown-toggle.btn-danger {
        color: #fff;
        background-color: #c9302c;
        border-color: #ac2925;
    }
    .btn-danger:active:hover,
    .btn-danger.active:hover,
    .open > .dropdown-toggle.btn-danger:hover,
    .btn-danger:active:focus,
    .btn-danger.active:focus,
    .open > .dropdown-toggle.btn-danger:focus,
    .btn-danger:active.focus,
    .btn-danger.active.focus,
    .open > .dropdown-toggle.btn-danger.focus {
        color: #fff;
        background-color: #ac2925;
        border-color: #761c19;
    }
    .btn-danger:active,
    .btn-danger.active,
    .open > .dropdown-toggle.btn-danger {
        background-image: none;
    }
    .btn-danger.disabled:hover,
    .btn-danger[disabled]:hover,
    fieldset[disabled] .btn-danger:hover,
    .btn-danger.disabled:focus,
    .btn-danger[disabled]:focus,
    fieldset[disabled] .btn-danger:focus,
    .btn-danger.disabled.focus,
    .btn-danger[disabled].focus,
    fieldset[disabled] .btn-danger.focus {
        background-color: #d9534f;
        border-color: #d43f3a;
    }
    .btn-danger .badge {
        color: #d9534f;
        background-color: #fff;
    }
    .btn-link {
        font-weight: normal;
        color: #337ab7;
        border-radius: 0;
    }
    .btn-link,
    .btn-link:active,
    .btn-link.active,
    .btn-link[disabled],
    fieldset[disabled] .btn-link {
        background-color: transparent;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .btn-link,
    .btn-link:hover,
    .btn-link:focus,
    .btn-link:active {
        border-color: transparent;
    }
    .btn-link:hover,
    .btn-link:focus {
        color: #23527c;
        text-decoration: underline;
        background-color: transparent;
    }
    .btn-link[disabled]:hover,
    fieldset[disabled] .btn-link:hover,
    .btn-link[disabled]:focus,
    fieldset[disabled] .btn-link:focus {
        color: #777;
        text-decoration: none;
    }
    .btn-lg,
    .btn-group-lg > .btn {
        padding: 10px 16px;
        font-size: 18px;
        line-height: 1.3333333;
        border-radius: 6px;
    }
    .btn-sm,
    .btn-group-sm > .btn {
        padding: 5px 10px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
    }
    .btn-xs,
    .btn-group-xs > .btn {
        padding: 1px 5px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
    }
    .btn-block {
        display: block;
        width: 100%;
    }
    .btn-block + .btn-block {
        margin-top: 5px;
    }
    input[type="submit"].btn-block,
    input[type="reset"].btn-block,
    input[type="button"].btn-block {
        width: 100%;
    }
    .fade {
        opacity: 0;
        -webkit-transition: opacity .15s linear;
        -o-transition: opacity .15s linear;
        transition: opacity .15s linear;
    }
    .fade.in {
        opacity: 1;
    }
    .collapse {
        display: none;
    }
    .collapse.in {
        display: block;
    }
    tr.collapse.in {
        display: table-row;
    }
    tbody.collapse.in {
        display: table-row-group;
    }
    .collapsing {
        position: relative;
        height: 0;
        overflow: hidden;
        -webkit-transition-timing-function: ease;
        -o-transition-timing-function: ease;
        transition-timing-function: ease;
        -webkit-transition-duration: .35s;
        -o-transition-duration: .35s;
        transition-duration: .35s;
        -webkit-transition-property: height, visibility;
        -o-transition-property: height, visibility;
        transition-property: height, visibility;
    }
    .caret {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 2px;
        vertical-align: middle;
        border-top: 4px dashed;
        border-top: 4px solid \9;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
    }
    .dropup,
    .dropdown {
        position: relative;
    }
    .dropdown-toggle:focus {
        outline: 0;
    }
    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        display: none;
        float: left;
        min-width: 160px;
        padding: 5px 0;
        margin: 2px 0 0;
        font-size: 14px;
        text-align: left;
        list-style: none;
        background-color: #fff;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        border: 1px solid #ccc;
        border: 1px solid rgba(0, 0, 0, .15);
        border-radius: 4px;
        -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
        box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    }
    .dropdown-menu.pull-right {
        right: 0;
        left: auto;
    }
    .dropdown-menu .divider {
        height: 1px;
        margin: 9px 0;
        overflow: hidden;
        background-color: #e5e5e5;
    }
    .dropdown-menu > li > a {
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: normal;
        line-height: 1.42857143;
        color: #333;
        white-space: nowrap;
    }
    .dropdown-menu > li > a:hover,
    .dropdown-menu > li > a:focus {
        color: #262626;
        text-decoration: none;
        background-color: #f5f5f5;
    }
    .dropdown-menu > .active > a,
    .dropdown-menu > .active > a:hover,
    .dropdown-menu > .active > a:focus {
        color: #fff;
        text-decoration: none;
        background-color: #337ab7;
        outline: 0;
    }
    .dropdown-menu > .disabled > a,
    .dropdown-menu > .disabled > a:hover,
    .dropdown-menu > .disabled > a:focus {
        color: #777;
    }
    .dropdown-menu > .disabled > a:hover,
    .dropdown-menu > .disabled > a:focus {
        text-decoration: none;
        cursor: not-allowed;
        background-color: transparent;
        background-image: none;
        filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
    }
    .open > .dropdown-menu {
        display: block;
    }
    .open > a {
        outline: 0;
    }
    .dropdown-menu-right {
        right: 0;
        left: auto;
    }
    .dropdown-menu-left {
        right: auto;
        left: 0;
    }
    .dropdown-header {
        display: block;
        padding: 3px 20px;
        font-size: 12px;
        line-height: 1.42857143;
        color: #777;
        white-space: nowrap;
    }
    .dropdown-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 990;
    }
    .pull-right > .dropdown-menu {
        right: 0;
        left: auto;
    }
    .dropup .caret,
    .navbar-fixed-bottom .dropdown .caret {
        content: "";
        border-top: 0;
        border-bottom: 4px dashed;
        border-bottom: 4px solid \9;
    }
    .dropup .dropdown-menu,
    .navbar-fixed-bottom .dropdown .dropdown-menu {
        top: auto;
        bottom: 100%;
        margin-bottom: 2px;
    }
    @media (min-width: 768px) {
        .navbar-right .dropdown-menu {
            right: 0;
            left: auto;
        }
        .navbar-right .dropdown-menu-left {
            right: auto;
            left: 0;
        }
    }
    .btn-group,
    .btn-group-vertical {
        position: relative;
        display: inline-block;
        vertical-align: middle;
    }
    .btn-group > .btn,
    .btn-group-vertical > .btn {
        position: relative;
        float: left;
    }
    .btn-group > .btn:hover,
    .btn-group-vertical > .btn:hover,
    .btn-group > .btn:focus,
    .btn-group-vertical > .btn:focus,
    .btn-group > .btn:active,
    .btn-group-vertical > .btn:active,
    .btn-group > .btn.active,
    .btn-group-vertical > .btn.active {
        z-index: 2;
    }
    .btn-group .btn + .btn,
    .btn-group .btn + .btn-group,
    .btn-group .btn-group + .btn,
    .btn-group .btn-group + .btn-group {
        margin-left: -1px;
    }
    .btn-toolbar {
        margin-left: -5px;
    }
    .btn-toolbar .btn,
    .btn-toolbar .btn-group,
    .btn-toolbar .input-group {
        float: left;
    }
    .btn-toolbar > .btn,
    .btn-toolbar > .btn-group,
    .btn-toolbar > .input-group {
        margin-left: 5px;
    }
    .btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {
        border-radius: 0;
    }
    .btn-group > .btn:first-child {
        margin-left: 0;
    }
    .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .btn-group > .btn:last-child:not(:first-child),
    .btn-group > .dropdown-toggle:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .btn-group > .btn-group {
        float: left;
    }
    .btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {
        border-radius: 0;
    }
    .btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,
    .btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .btn-group .dropdown-toggle:active,
    .btn-group.open .dropdown-toggle {
        outline: 0;
    }
    .btn-group > .btn + .dropdown-toggle {
        padding-right: 8px;
        padding-left: 8px;
    }
    .btn-group > .btn-lg + .dropdown-toggle {
        padding-right: 12px;
        padding-left: 12px;
    }
    .btn-group.open .dropdown-toggle {
        -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
    }
    .btn-group.open .dropdown-toggle.btn-link {
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .btn .caret {
        margin-left: 0;
    }
    .btn-lg .caret {
        border-width: 5px 5px 0;
        border-bottom-width: 0;
    }
    .dropup .btn-lg .caret {
        border-width: 0 5px 5px;
    }
    .btn-group-vertical > .btn,
    .btn-group-vertical > .btn-group,
    .btn-group-vertical > .btn-group > .btn {
        display: block;
        float: none;
        width: 100%;
        max-width: 100%;
    }
    .btn-group-vertical > .btn-group > .btn {
        float: none;
    }
    .btn-group-vertical > .btn + .btn,
    .btn-group-vertical > .btn + .btn-group,
    .btn-group-vertical > .btn-group + .btn,
    .btn-group-vertical > .btn-group + .btn-group {
        margin-top: -1px;
        margin-left: 0;
    }
    .btn-group-vertical > .btn:not(:first-child):not(:last-child) {
        border-radius: 0;
    }
    .btn-group-vertical > .btn:first-child:not(:last-child) {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .btn-group-vertical > .btn:last-child:not(:first-child) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    .btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {
        border-radius: 0;
    }
    .btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,
    .btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .btn-group-justified {
        display: table;
        width: 100%;
        table-layout: fixed;
        border-collapse: separate;
    }
    .btn-group-justified > .btn,
    .btn-group-justified > .btn-group {
        display: table-cell;
        float: none;
        width: 1%;
    }
    .btn-group-justified > .btn-group .btn {
        width: 100%;
    }
    .btn-group-justified > .btn-group .dropdown-menu {
        left: auto;
    }
    [data-toggle="buttons"] > .btn input[type="radio"],
    [data-toggle="buttons"] > .btn-group > .btn input[type="radio"],
    [data-toggle="buttons"] > .btn input[type="checkbox"],
    [data-toggle="buttons"] > .btn-group > .btn input[type="checkbox"] {
        position: absolute;
        clip: rect(0, 0, 0, 0);
        pointer-events: none;
    }
    .input-group {
        position: relative;
        display: table;
        border-collapse: separate;
    }
    .input-group[class*="col-"] {
        float: none;
        padding-right: 0;
        padding-left: 0;
    }
    .input-group .form-control {
        position: relative;
        z-index: 2;
        float: left;
        width: 100%;
        margin-bottom: 0;
    }
    .input-group .form-control:focus {
        z-index: 3;
    }
    .input-group-lg > .form-control,
    .input-group-lg > .input-group-addon,
    .input-group-lg > .input-group-btn > .btn {
        height: 46px;
        padding: 10px 16px;
        font-size: 18px;
        line-height: 1.3333333;
        border-radius: 6px;
    }
    select.input-group-lg > .form-control,
    select.input-group-lg > .input-group-addon,
    select.input-group-lg > .input-group-btn > .btn {
        height: 46px;
        line-height: 46px;
    }
    textarea.input-group-lg > .form-control,
    textarea.input-group-lg > .input-group-addon,
    textarea.input-group-lg > .input-group-btn > .btn,
    select[multiple].input-group-lg > .form-control,
    select[multiple].input-group-lg > .input-group-addon,
    select[multiple].input-group-lg > .input-group-btn > .btn {
        height: auto;
    }
    .input-group-sm > .form-control,
    .input-group-sm > .input-group-addon,
    .input-group-sm > .input-group-btn > .btn {
        height: 30px;
        padding: 5px 10px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
    }
    select.input-group-sm > .form-control,
    select.input-group-sm > .input-group-addon,
    select.input-group-sm > .input-group-btn > .btn {
        height: 30px;
        line-height: 30px;
    }
    textarea.input-group-sm > .form-control,
    textarea.input-group-sm > .input-group-addon,
    textarea.input-group-sm > .input-group-btn > .btn,
    select[multiple].input-group-sm > .form-control,
    select[multiple].input-group-sm > .input-group-addon,
    select[multiple].input-group-sm > .input-group-btn > .btn {
        height: auto;
    }
    .input-group-addon,
    .input-group-btn,
    .input-group .form-control {
        display: table-cell;
    }
    .input-group-addon:not(:first-child):not(:last-child),
    .input-group-btn:not(:first-child):not(:last-child),
    .input-group .form-control:not(:first-child):not(:last-child) {
        border-radius: 0;
    }
    .input-group-addon,
    .input-group-btn {
        width: 1%;
        white-space: nowrap;
        vertical-align: middle;
    }
    .input-group-addon {
        padding: 6px 12px;
        font-size: 14px;
        font-weight: normal;
        line-height: 1;
        color: #555;
        text-align: center;
        background-color: #eee;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .input-group-addon.input-sm {
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 3px;
    }
    .input-group-addon.input-lg {
        padding: 10px 16px;
        font-size: 18px;
        border-radius: 6px;
    }
    .input-group-addon input[type="radio"],
    .input-group-addon input[type="checkbox"] {
        margin-top: 0;
    }
    .input-group .form-control:first-child,
    .input-group-addon:first-child,
    .input-group-btn:first-child > .btn,
    .input-group-btn:first-child > .btn-group > .btn,
    .input-group-btn:first-child > .dropdown-toggle,
    .input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),
    .input-group-btn:last-child > .btn-group:not(:last-child) > .btn {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .input-group-addon:first-child {
        border-right: 0;
    }
    .input-group .form-control:last-child,
    .input-group-addon:last-child,
    .input-group-btn:last-child > .btn,
    .input-group-btn:last-child > .btn-group > .btn,
    .input-group-btn:last-child > .dropdown-toggle,
    .input-group-btn:first-child > .btn:not(:first-child),
    .input-group-btn:first-child > .btn-group:not(:first-child) > .btn {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .input-group-addon:last-child {
        border-left: 0;
    }
    .input-group-btn {
        position: relative;
        font-size: 0;
        white-space: nowrap;
    }
    .input-group-btn > .btn {
        position: relative;
    }
    .input-group-btn > .btn + .btn {
        margin-left: -1px;
    }
    .input-group-btn > .btn:hover,
    .input-group-btn > .btn:focus,
    .input-group-btn > .btn:active {
        z-index: 2;
    }
    .input-group-btn:first-child > .btn,
    .input-group-btn:first-child > .btn-group {
        margin-right: -1px;
    }
    .input-group-btn:last-child > .btn,
    .input-group-btn:last-child > .btn-group {
        z-index: 2;
        margin-left: -1px;
    }
    .nav {
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
    }
    .nav > li {
        position: relative;
        display: block;
    }
    .nav > li > a {
        position: relative;
        display: block;
        padding: 10px 15px;
    }
    .nav > li > a:hover,
    .nav > li > a:focus {
        text-decoration: none;
        background-color: #eee;
    }
    .nav > li.disabled > a {
        color: #777;
    }
    .nav > li.disabled > a:hover,
    .nav > li.disabled > a:focus {
        color: #777;
        text-decoration: none;
        cursor: not-allowed;
        background-color: transparent;
    }
    .nav .open > a,
    .nav .open > a:hover,
    .nav .open > a:focus {
        background-color: #eee;
        border-color: #337ab7;
    }
    .nav .nav-divider {
        height: 1px;
        margin: 9px 0;
        overflow: hidden;
        background-color: #e5e5e5;
    }
    .nav > li > a > img {
        max-width: none;
    }
    .nav-tabs {
        border-bottom: 1px solid #ddd;
    }
    .nav-tabs > li {
        float: left;
        margin-bottom: -1px;
    }
    .nav-tabs > li > a {
        margin-right: 2px;
        line-height: 1.42857143;
        border: 1px solid transparent;
        border-radius: 4px 4px 0 0;
    }
    .nav-tabs > li > a:hover {
        border-color: #eee #eee #ddd;
    }
    .nav-tabs > li.active > a,
    .nav-tabs > li.active > a:hover,
    .nav-tabs > li.active > a:focus {
        color: #555;
        cursor: default;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-color: transparent;
    }
    .nav-tabs.nav-justified {
        width: 100%;
        border-bottom: 0;
    }
    .nav-tabs.nav-justified > li {
        float: none;
    }
    .nav-tabs.nav-justified > li > a {
        margin-bottom: 5px;
        text-align: center;
    }
    .nav-tabs.nav-justified > .dropdown .dropdown-menu {
        top: auto;
        left: auto;
    }
    @media (min-width: 768px) {
        .nav-tabs.nav-justified > li {
            display: table-cell;
            width: 1%;
        }
        .nav-tabs.nav-justified > li > a {
            margin-bottom: 0;
        }
    }
    .nav-tabs.nav-justified > li > a {
        margin-right: 0;
        border-radius: 4px;
    }
    .nav-tabs.nav-justified > .active > a,
    .nav-tabs.nav-justified > .active > a:hover,
    .nav-tabs.nav-justified > .active > a:focus {
        border: 1px solid #ddd;
    }
    @media (min-width: 768px) {
        .nav-tabs.nav-justified > li > a {
            border-bottom: 1px solid #ddd;
            border-radius: 4px 4px 0 0;
        }
        .nav-tabs.nav-justified > .active > a,
        .nav-tabs.nav-justified > .active > a:hover,
        .nav-tabs.nav-justified > .active > a:focus {
            border-bottom-color: #fff;
        }
    }
    .nav-pills > li {
        float: left;
    }
    .nav-pills > li > a {
        border-radius: 4px;
    }
    .nav-pills > li + li {
        margin-left: 2px;
    }
    .nav-pills > li.active > a,
    .nav-pills > li.active > a:hover,
    .nav-pills > li.active > a:focus {
        color: #fff;
        background-color: #337ab7;
    }
    .nav-stacked > li {
        float: none;
    }
    .nav-stacked > li + li {
        margin-top: 2px;
        margin-left: 0;
    }
    .nav-justified {
        width: 100%;
    }
    .nav-justified > li {
        float: none;
    }
    .nav-justified > li > a {
        margin-bottom: 5px;
        text-align: center;
    }
    .nav-justified > .dropdown .dropdown-menu {
        top: auto;
        left: auto;
    }
    @media (min-width: 768px) {
        .nav-justified > li {
            display: table-cell;
            width: 1%;
        }
        .nav-justified > li > a {
            margin-bottom: 0;
        }
    }
    .nav-tabs-justified {
        border-bottom: 0;
    }
    .nav-tabs-justified > li > a {
        margin-right: 0;
        border-radius: 4px;
    }
    .nav-tabs-justified > .active > a,
    .nav-tabs-justified > .active > a:hover,
    .nav-tabs-justified > .active > a:focus {
        border: 1px solid #ddd;
    }
    @media (min-width: 768px) {
        .nav-tabs-justified > li > a {
            border-bottom: 1px solid #ddd;
            border-radius: 4px 4px 0 0;
        }
        .nav-tabs-justified > .active > a,
        .nav-tabs-justified > .active > a:hover,
        .nav-tabs-justified > .active > a:focus {
            border-bottom-color: #fff;
        }
    }
    .tab-content > .tab-pane {
        display: none;
    }
    .tab-content > .active {
        display: block;
    }
    .nav-tabs .dropdown-menu {
        margin-top: -1px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .navbar {
        position: relative;
        min-height: 50px;
        margin-bottom: 20px;
        border: 1px solid transparent;
    }
    @media (min-width: 768px) {
        .navbar {
            border-radius: 4px;
        }
    }
    @media (min-width: 768px) {
        .navbar-header {
            float: left;
        }
    }
    .navbar-collapse {
        padding-right: 15px;
        padding-left: 15px;
        overflow-x: visible;
        -webkit-overflow-scrolling: touch;
        border-top: 1px solid transparent;
        -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);
    }
    .navbar-collapse.in {
        overflow-y: auto;
    }
    @media (min-width: 768px) {
        .navbar-collapse {
            width: auto;
            border-top: 0;
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        .navbar-collapse.collapse {
            display: block !important;
            height: auto !important;
            padding-bottom: 0;
            overflow: visible !important;
        }
        .navbar-collapse.in {
            overflow-y: visible;
        }
        .navbar-fixed-top .navbar-collapse,
        .navbar-static-top .navbar-collapse,
        .navbar-fixed-bottom .navbar-collapse {
            padding-right: 0;
            padding-left: 0;
        }
    }
    .navbar-fixed-top .navbar-collapse,
    .navbar-fixed-bottom .navbar-collapse {
        max-height: 340px;
    }
    @media (max-device-width: 480px) and (orientation: landscape) {
        .navbar-fixed-top .navbar-collapse,
        .navbar-fixed-bottom .navbar-collapse {
            max-height: 200px;
        }
    }
    .container > .navbar-header,
    .container-fluid > .navbar-header,
    .container > .navbar-collapse,
    .container-fluid > .navbar-collapse {
        margin-right: -15px;
        margin-left: -15px;
    }
    @media (min-width: 768px) {
        .container > .navbar-header,
        .container-fluid > .navbar-header,
        .container > .navbar-collapse,
        .container-fluid > .navbar-collapse {
            margin-right: 0;
            margin-left: 0;
        }
    }
    .navbar-static-top {
        z-index: 1000;
        border-width: 0 0 1px;
    }
    @media (min-width: 768px) {
        .navbar-static-top {
            border-radius: 0;
        }
    }
    .navbar-fixed-top,
    .navbar-fixed-bottom {
        position: fixed;
        right: 0;
        left: 0;
        z-index: 1030;
    }
    @media (min-width: 768px) {
        .navbar-fixed-top,
        .navbar-fixed-bottom {
            border-radius: 0;
        }
    }
    .navbar-fixed-top {
        top: 0;
        border-width: 0 0 1px;
    }
    .navbar-fixed-bottom {
        bottom: 0;
        margin-bottom: 0;
        border-width: 1px 0 0;
    }
    .navbar-brand {
        float: left;
        height: 50px;
        padding: 15px 15px;
        font-size: 18px;
        line-height: 20px;
    }
    .navbar-brand:hover,
    .navbar-brand:focus {
        text-decoration: none;
    }
    .navbar-brand > img {
        display: block;
    }
    @media (min-width: 768px) {
        .navbar > .container .navbar-brand,
        .navbar > .container-fluid .navbar-brand {
            margin-left: -15px;
        }
    }
    .navbar-toggle {
        position: relative;
        float: right;
        padding: 9px 10px;
        margin-top: 8px;
        margin-right: 15px;
        margin-bottom: 8px;
        background-color: transparent;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
    }
    .navbar-toggle:focus {
        outline: 0;
    }
    .navbar-toggle .icon-bar {
        display: block;
        width: 22px;
        height: 2px;
        border-radius: 1px;
    }
    .navbar-toggle .icon-bar + .icon-bar {
        margin-top: 4px;
    }
    @media (min-width: 768px) {
        .navbar-toggle {
            display: none;
        }
    }
    .navbar-nav {
        margin: 7.5px -15px;
    }
    .navbar-nav > li > a {
        padding-top: 10px;
        padding-bottom: 10px;
        line-height: 20px;
    }
    @media (max-width: 767px) {
        .navbar-nav .open .dropdown-menu {
            position: static;
            float: none;
            width: auto;
            margin-top: 0;
            background-color: transparent;
            border: 0;
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        .navbar-nav .open .dropdown-menu > li > a,
        .navbar-nav .open .dropdown-menu .dropdown-header {
            padding: 5px 15px 5px 25px;
        }
        .navbar-nav .open .dropdown-menu > li > a {
            line-height: 20px;
        }
        .navbar-nav .open .dropdown-menu > li > a:hover,
        .navbar-nav .open .dropdown-menu > li > a:focus {
            background-image: none;
        }
    }
    @media (min-width: 768px) {
        .navbar-nav {
            float: left;
            margin: 0;
        }
        .navbar-nav > li {
            float: left;
        }
        .navbar-nav > li > a {
            padding-top: 15px;
            padding-bottom: 15px;
        }
    }
    .navbar-form {
        padding: 10px 15px;
        margin-top: 8px;
        margin-right: -15px;
        margin-bottom: 8px;
        margin-left: -15px;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
        -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 0 rgba(255, 255, 255, .1);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 0 rgba(255, 255, 255, .1);
    }
    @media (min-width: 768px) {
        .navbar-form .form-group {
            display: inline-block;
            margin-bottom: 0;
            vertical-align: middle;
        }
        .navbar-form .form-control {
            display: inline-block;
            width: auto;
            vertical-align: middle;
        }
        .navbar-form .form-control-static {
            display: inline-block;
        }
        .navbar-form .input-group {
            display: inline-table;
            vertical-align: middle;
        }
        .navbar-form .input-group .input-group-addon,
        .navbar-form .input-group .input-group-btn,
        .navbar-form .input-group .form-control {
            width: auto;
        }
        .navbar-form .input-group > .form-control {
            width: 100%;
        }
        .navbar-form .control-label {
            margin-bottom: 0;
            vertical-align: middle;
        }
        .navbar-form .radio,
        .navbar-form .checkbox {
            display: inline-block;
            margin-top: 0;
            margin-bottom: 0;
            vertical-align: middle;
        }
        .navbar-form .radio label,
        .navbar-form .checkbox label {
            padding-left: 0;
        }
        .navbar-form .radio input[type="radio"],
        .navbar-form .checkbox input[type="checkbox"] {
            position: relative;
            margin-left: 0;
        }
        .navbar-form .has-feedback .form-control-feedback {
            top: 0;
        }
    }
    @media (max-width: 767px) {
        .navbar-form .form-group {
            margin-bottom: 5px;
        }
        .navbar-form .form-group:last-child {
            margin-bottom: 0;
        }
    }
    @media (min-width: 768px) {
        .navbar-form {
            width: auto;
            padding-top: 0;
            padding-bottom: 0;
            margin-right: 0;
            margin-left: 0;
            border: 0;
            -webkit-box-shadow: none;
            box-shadow: none;
        }
    }
    .navbar-nav > li > .dropdown-menu {
        margin-top: 0;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {
        margin-bottom: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .navbar-btn {
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .navbar-btn.btn-sm {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .navbar-btn.btn-xs {
        margin-top: 14px;
        margin-bottom: 14px;
    }
    .navbar-text {
        margin-top: 15px;
        margin-bottom: 15px;
    }
    @media (min-width: 768px) {
        .navbar-text {
            float: left;
            margin-right: 15px;
            margin-left: 15px;
        }
    }
    @media (min-width: 768px) {
        .navbar-left {
            float: left !important;
        }
        .navbar-right {
            float: right !important;
            margin-right: -15px;
        }
        .navbar-right ~ .navbar-right {
            margin-right: 0;
        }
    }
    .navbar-default {
        background-color: #f8f8f8;
        border-color: #e7e7e7;
    }
    .navbar-default .navbar-brand {
        color: #777;
    }
    .navbar-default .navbar-brand:hover,
    .navbar-default .navbar-brand:focus {
        color: #5e5e5e;
        background-color: transparent;
    }
    .navbar-default .navbar-text {
        color: #777;
    }
    .navbar-default .navbar-nav > li > a {
        color: #777;
    }
    .navbar-default .navbar-nav > li > a:hover,
    .navbar-default .navbar-nav > li > a:focus {
        color: #333;
        background-color: transparent;
    }
    .navbar-default .navbar-nav > .active > a,
    .navbar-default .navbar-nav > .active > a:hover,
    .navbar-default .navbar-nav > .active > a:focus {
        color: #555;
        background-color: #e7e7e7;
    }
    .navbar-default .navbar-nav > .disabled > a,
    .navbar-default .navbar-nav > .disabled > a:hover,
    .navbar-default .navbar-nav > .disabled > a:focus {
        color: #ccc;
        background-color: transparent;
    }
    .navbar-default .navbar-toggle {
        border-color: #ddd;
    }
    .navbar-default .navbar-toggle:hover,
    .navbar-default .navbar-toggle:focus {
        background-color: #ddd;
    }
    .navbar-default .navbar-toggle .icon-bar {
        background-color: #888;
    }
    .navbar-default .navbar-collapse,
    .navbar-default .navbar-form {
        border-color: #e7e7e7;
    }
    .navbar-default .navbar-nav > .open > a,
    .navbar-default .navbar-nav > .open > a:hover,
    .navbar-default .navbar-nav > .open > a:focus {
        color: #555;
        background-color: #e7e7e7;
    }
    @media (max-width: 767px) {
        .navbar-default .navbar-nav .open .dropdown-menu > li > a {
            color: #777;
        }
        .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover,
        .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {
            color: #333;
            background-color: transparent;
        }
        .navbar-default .navbar-nav .open .dropdown-menu > .active > a,
        .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover,
        .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {
            color: #555;
            background-color: #e7e7e7;
        }
        .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a,
        .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover,
        .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {
            color: #ccc;
            background-color: transparent;
        }
    }
    .navbar-default .navbar-link {
        color: #777;
    }
    .navbar-default .navbar-link:hover {
        color: #333;
    }
    .navbar-default .btn-link {
        color: #777;
    }
    .navbar-default .btn-link:hover,
    .navbar-default .btn-link:focus {
        color: #333;
    }
    .navbar-default .btn-link[disabled]:hover,
    fieldset[disabled] .navbar-default .btn-link:hover,
    .navbar-default .btn-link[disabled]:focus,
    fieldset[disabled] .navbar-default .btn-link:focus {
        color: #ccc;
    }
    .navbar-inverse {
        background-color: #222;
        border-color: #080808;
    }
    .navbar-inverse .navbar-brand {
        color: #9d9d9d;
    }
    .navbar-inverse .navbar-brand:hover,
    .navbar-inverse .navbar-brand:focus {
        color: #fff;
        background-color: transparent;
    }
    .navbar-inverse .navbar-text {
        color: #9d9d9d;
    }
    .navbar-inverse .navbar-nav > li > a {
        color: #9d9d9d;
    }
    .navbar-inverse .navbar-nav > li > a:hover,
    .navbar-inverse .navbar-nav > li > a:focus {
        color: #fff;
        background-color: transparent;
    }
    .navbar-inverse .navbar-nav > .active > a,
    .navbar-inverse .navbar-nav > .active > a:hover,
    .navbar-inverse .navbar-nav > .active > a:focus {
        color: #fff;
        background-color: #080808;
    }
    .navbar-inverse .navbar-nav > .disabled > a,
    .navbar-inverse .navbar-nav > .disabled > a:hover,
    .navbar-inverse .navbar-nav > .disabled > a:focus {
        color: #444;
        background-color: transparent;
    }
    .navbar-inverse .navbar-toggle {
        border-color: #333;
    }
    .navbar-inverse .navbar-toggle:hover,
    .navbar-inverse .navbar-toggle:focus {
        background-color: #333;
    }
    .navbar-inverse .navbar-toggle .icon-bar {
        background-color: #fff;
    }
    .navbar-inverse .navbar-collapse,
    .navbar-inverse .navbar-form {
        border-color: #101010;
    }
    .navbar-inverse .navbar-nav > .open > a,
    .navbar-inverse .navbar-nav > .open > a:hover,
    .navbar-inverse .navbar-nav > .open > a:focus {
        color: #fff;
        background-color: #080808;
    }
    @media (max-width: 767px) {
        .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {
            border-color: #080808;
        }
        .navbar-inverse .navbar-nav .open .dropdown-menu .divider {
            background-color: #080808;
        }
        .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {
            color: #9d9d9d;
        }
        .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,
        .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {
            color: #fff;
            background-color: transparent;
        }
        .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a,
        .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover,
        .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {
            color: #fff;
            background-color: #080808;
        }
        .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a,
        .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover,
        .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {
            color: #444;
            background-color: transparent;
        }
    }
    .navbar-inverse .navbar-link {
        color: #9d9d9d;
    }
    .navbar-inverse .navbar-link:hover {
        color: #fff;
    }
    .navbar-inverse .btn-link {
        color: #9d9d9d;
    }
    .navbar-inverse .btn-link:hover,
    .navbar-inverse .btn-link:focus {
        color: #fff;
    }
    .navbar-inverse .btn-link[disabled]:hover,
    fieldset[disabled] .navbar-inverse .btn-link:hover,
    .navbar-inverse .btn-link[disabled]:focus,
    fieldset[disabled] .navbar-inverse .btn-link:focus {
        color: #444;
    }
    .breadcrumb {
        padding: 8px 15px;
        margin-bottom: 20px;
        list-style: none;
        background-color: #f5f5f5;
        border-radius: 4px;
    }
    .breadcrumb > li {
        display: inline-block;
    }
    .breadcrumb > li + li:before {
        padding: 0 5px;
        color: #ccc;
        content: "/\00a0";
    }
    .breadcrumb > .active {
        color: #777;
    }
    .pagination {
        display: inline-block;
        padding-left: 0;
        margin: 20px 0;
        border-radius: 4px;
    }
    .pagination > li {
        display: inline;
    }
    .pagination > li > a,
    .pagination > li > span {
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #337ab7;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
    }
    .pagination > li:first-child > a,
    .pagination > li:first-child > span {
        margin-left: 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    .pagination > li:last-child > a,
    .pagination > li:last-child > span {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    .pagination > li > a:hover,
    .pagination > li > span:hover,
    .pagination > li > a:focus,
    .pagination > li > span:focus {
        z-index: 2;
        color: #23527c;
        background-color: #eee;
        border-color: #ddd;
    }
    .pagination > .active > a,
    .pagination > .active > span,
    .pagination > .active > a:hover,
    .pagination > .active > span:hover,
    .pagination > .active > a:focus,
    .pagination > .active > span:focus {
        z-index: 3;
        color: #fff;
        cursor: default;
        background-color: #337ab7;
        border-color: #337ab7;
    }
    .pagination > .disabled > span,
    .pagination > .disabled > span:hover,
    .pagination > .disabled > span:focus,
    .pagination > .disabled > a,
    .pagination > .disabled > a:hover,
    .pagination > .disabled > a:focus {
        color: #777;
        cursor: not-allowed;
        background-color: #fff;
        border-color: #ddd;
    }
    .pagination-lg > li > a,
    .pagination-lg > li > span {
        padding: 10px 16px;
        font-size: 18px;
        line-height: 1.3333333;
    }
    .pagination-lg > li:first-child > a,
    .pagination-lg > li:first-child > span {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
    }
    .pagination-lg > li:last-child > a,
    .pagination-lg > li:last-child > span {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
    }
    .pagination-sm > li > a,
    .pagination-sm > li > span {
        padding: 5px 10px;
        font-size: 12px;
        line-height: 1.5;
    }
    .pagination-sm > li:first-child > a,
    .pagination-sm > li:first-child > span {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .pagination-sm > li:last-child > a,
    .pagination-sm > li:last-child > span {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
    .pager {
        padding-left: 0;
        margin: 20px 0;
        text-align: center;
        list-style: none;
    }
    .pager li {
        display: inline;
    }
    .pager li > a,
    .pager li > span {
        display: inline-block;
        padding: 5px 14px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 15px;
    }
    .pager li > a:hover,
    .pager li > a:focus {
        text-decoration: none;
        background-color: #eee;
    }
    .pager .next > a,
    .pager .next > span {
        float: right;
    }
    .pager .previous > a,
    .pager .previous > span {
        float: left;
    }
    .pager .disabled > a,
    .pager .disabled > a:hover,
    .pager .disabled > a:focus,
    .pager .disabled > span {
        color: #777;
        cursor: not-allowed;
        background-color: #fff;
    }
    .label {
        display: inline;
        padding: .2em .6em .3em;
        font-size: 75%;
        font-weight: bold;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: .25em;
    }
    a.label:hover,
    a.label:focus {
        color: #fff;
        text-decoration: none;
        cursor: pointer;
    }
    .label:empty {
        display: none;
    }
    .btn .label {
        position: relative;
        top: -1px;
    }
    .label-default {
        background-color: #777;
    }
    .label-default[href]:hover,
    .label-default[href]:focus {
        background-color: #5e5e5e;
    }
    .label-primary {
        background-color: #337ab7;
    }
    .label-primary[href]:hover,
    .label-primary[href]:focus {
        background-color: #286090;
    }
    .label-success {
        background-color: #5cb85c;
    }
    .label-success[href]:hover,
    .label-success[href]:focus {
        background-color: #449d44;
    }
    .label-info {
        background-color: #5bc0de;
    }
    .label-info[href]:hover,
    .label-info[href]:focus {
        background-color: #31b0d5;
    }
    .label-warning {
        background-color: #f0ad4e;
    }
    .label-warning[href]:hover,
    .label-warning[href]:focus {
        background-color: #ec971f;
    }
    .label-danger {
        background-color: #d9534f;
    }
    .label-danger[href]:hover,
    .label-danger[href]:focus {
        background-color: #c9302c;
    }
    .badge {
        display: inline-block;
        min-width: 10px;
        padding: 3px 7px;
        font-size: 12px;
        font-weight: bold;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        background-color: #777;
        border-radius: 10px;
    }
    .badge:empty {
        display: none;
    }
    .btn .badge {
        position: relative;
        top: -1px;
    }
    .btn-xs .badge,
    .btn-group-xs > .btn .badge {
        top: 0;
        padding: 1px 5px;
    }
    a.badge:hover,
    a.badge:focus {
        color: #fff;
        text-decoration: none;
        cursor: pointer;
    }
    .list-group-item.active > .badge,
    .nav-pills > .active > a > .badge {
        color: #337ab7;
        background-color: #fff;
    }
    .list-group-item > .badge {
        float: right;
    }
    .list-group-item > .badge + .badge {
        margin-right: 5px;
    }
    .nav-pills > li > a > .badge {
        margin-left: 3px;
    }
    .jumbotron {
        padding-top: 30px;
        padding-bottom: 30px;
        margin-bottom: 30px;
        color: inherit;
        background-color: #eee;
    }
    .jumbotron h1,
    .jumbotron .h1 {
        color: inherit;
    }
    .jumbotron p {
        margin-bottom: 15px;
        font-size: 21px;
        font-weight: 200;
    }
    .jumbotron > hr {
        border-top-color: #d5d5d5;
    }
    .container .jumbotron,
    .container-fluid .jumbotron {
        padding-right: 15px;
        padding-left: 15px;
        border-radius: 6px;
    }
    .jumbotron .container {
        max-width: 100%;
    }
    @media screen and (min-width: 768px) {
        .jumbotron {
            padding-top: 48px;
            padding-bottom: 48px;
        }
        .container .jumbotron,
        .container-fluid .jumbotron {
            padding-right: 60px;
            padding-left: 60px;
        }
        .jumbotron h1,
        .jumbotron .h1 {
            font-size: 63px;
        }
    }
    .thumbnail {
        display: block;
        padding: 4px;
        margin-bottom: 20px;
        line-height: 1.42857143;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        -webkit-transition: border .2s ease-in-out;
        -o-transition: border .2s ease-in-out;
        transition: border .2s ease-in-out;
    }
    .thumbnail > img,
    .thumbnail a > img {
        margin-right: auto;
        margin-left: auto;
    }
    a.thumbnail:hover,
    a.thumbnail:focus,
    a.thumbnail.active {
        border-color: #337ab7;
    }
    .thumbnail .caption {
        padding: 9px;
        color: #333;
    }
    .alert {
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
    }
    .alert h4 {
        margin-top: 0;
        color: inherit;
    }
    .alert .alert-link {
        font-weight: bold;
    }
    .alert > p,
    .alert > ul {
        margin-bottom: 0;
    }
    .alert > p + p {
        margin-top: 5px;
    }
    .alert-dismissable,
    .alert-dismissible {
        padding-right: 35px;
    }
    .alert-dismissable .close,
    .alert-dismissible .close {
        position: relative;
        top: -2px;
        right: -21px;
        color: inherit;
    }
    .alert-success {
        color: #3c763d;
        background-color: #dff0d8;
        border-color: #d6e9c6;
    }
    .alert-success hr {
        border-top-color: #c9e2b3;
    }
    .alert-success .alert-link {
        color: #2b542c;
    }
    .alert-info {
        color: #31708f;
        background-color: #d9edf7;
        border-color: #bce8f1;
    }
    .alert-info hr {
        border-top-color: #a6e1ec;
    }
    .alert-info .alert-link {
        color: #245269;
    }
    .alert-warning {
        color: #8a6d3b;
        background-color: #fcf8e3;
        border-color: #faebcc;
    }
    .alert-warning hr {
        border-top-color: #f7e1b5;
    }
    .alert-warning .alert-link {
        color: #66512c;
    }
    .alert-danger {
        color: #a94442;
        background-color: #f2dede;
        border-color: #ebccd1;
    }
    .alert-danger hr {
        border-top-color: #e4b9c0;
    }
    .alert-danger .alert-link {
        color: #843534;
    }
    @-webkit-keyframes progress-bar-stripes {
        from {
            background-position: 40px 0;
        }
        to {
            background-position: 0 0;
        }
    }
    @-o-keyframes progress-bar-stripes {
        from {
            background-position: 40px 0;
        }
        to {
            background-position: 0 0;
        }
    }
    @keyframes progress-bar-stripes {
        from {
            background-position: 40px 0;
        }
        to {
            background-position: 0 0;
        }
    }
    .progress {
        height: 20px;
        margin-bottom: 20px;
        overflow: hidden;
        background-color: #f5f5f5;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
    }
    .progress-bar {
        float: left;
        width: 0;
        height: 100%;
        font-size: 12px;
        line-height: 20px;
        color: #fff;
        text-align: center;
        background-color: #337ab7;
        -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
        box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
        -webkit-transition: width .6s ease;
        -o-transition: width .6s ease;
        transition: width .6s ease;
    }
    .progress-striped .progress-bar,
    .progress-bar-striped {
        background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
        background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
        background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
        -webkit-background-size: 40px 40px;
        background-size: 40px 40px;
    }
    .progress.active .progress-bar,
    .progress-bar.active {
        -webkit-animation: progress-bar-stripes 2s linear infinite;
        -o-animation: progress-bar-stripes 2s linear infinite;
        animation: progress-bar-stripes 2s linear infinite;
    }
    .progress-bar-success {
        background-color: #5cb85c;
    }
    .progress-striped .progress-bar-success {
        background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
        background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
        background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    }
    .progress-bar-info {
        background-color: #5bc0de;
    }
    .progress-striped .progress-bar-info {
        background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
        background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
        background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    }
    .progress-bar-warning {
        background-color: #f0ad4e;
    }
    .progress-striped .progress-bar-warning {
        background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
        background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
        background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    }
    .progress-bar-danger {
        background-color: #d9534f;
    }
    .progress-striped .progress-bar-danger {
        background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
        background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
        background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    }
    .media {
        margin-top: 15px;
    }
    .media:first-child {
        margin-top: 0;
    }
    .media,
    .media-body {
        overflow: hidden;
        zoom: 1;
    }
    .media-body {
        width: 10000px;
    }
    .media-object {
        display: block;
    }
    .media-object.img-thumbnail {
        max-width: none;
    }
    .media-right,
    .media > .pull-right {
        padding-left: 10px;
    }
    .media-left,
    .media > .pull-left {
        padding-right: 10px;
    }
    .media-left,
    .media-right,
    .media-body {
        display: table-cell;
        vertical-align: top;
    }
    .media-middle {
        vertical-align: middle;
    }
    .media-bottom {
        vertical-align: bottom;
    }
    .media-heading {
        margin-top: 0;
        margin-bottom: 5px;
    }
    .media-list {
        padding-left: 0;
        list-style: none;
    }
    .list-group {
        padding-left: 0;
        margin-bottom: 20px;
    }
    .list-group-item {
        position: relative;
        display: block;
        padding: 10px 15px;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid #ddd;
    }
    .list-group-item:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    .list-group-item:last-child {
        margin-bottom: 0;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    a.list-group-item,
    button.list-group-item {
        color: #555;
    }
    a.list-group-item .list-group-item-heading,
    button.list-group-item .list-group-item-heading {
        color: #333;
    }
    a.list-group-item:hover,
    button.list-group-item:hover,
    a.list-group-item:focus,
    button.list-group-item:focus {
        color: #555;
        text-decoration: none;
        background-color: #f5f5f5;
    }
    button.list-group-item {
        width: 100%;
        text-align: left;
    }
    .list-group-item.disabled,
    .list-group-item.disabled:hover,
    .list-group-item.disabled:focus {
        color: #777;
        cursor: not-allowed;
        background-color: #eee;
    }
    .list-group-item.disabled .list-group-item-heading,
    .list-group-item.disabled:hover .list-group-item-heading,
    .list-group-item.disabled:focus .list-group-item-heading {
        color: inherit;
    }
    .list-group-item.disabled .list-group-item-text,
    .list-group-item.disabled:hover .list-group-item-text,
    .list-group-item.disabled:focus .list-group-item-text {
        color: #777;
    }
    .list-group-item.active,
    .list-group-item.active:hover,
    .list-group-item.active:focus {
        z-index: 2;
        color: #fff;
        background-color: #337ab7;
        border-color: #337ab7;
    }
    .list-group-item.active .list-group-item-heading,
    .list-group-item.active:hover .list-group-item-heading,
    .list-group-item.active:focus .list-group-item-heading,
    .list-group-item.active .list-group-item-heading > small,
    .list-group-item.active:hover .list-group-item-heading > small,
    .list-group-item.active:focus .list-group-item-heading > small,
    .list-group-item.active .list-group-item-heading > .small,
    .list-group-item.active:hover .list-group-item-heading > .small,
    .list-group-item.active:focus .list-group-item-heading > .small {
        color: inherit;
    }
    .list-group-item.active .list-group-item-text,
    .list-group-item.active:hover .list-group-item-text,
    .list-group-item.active:focus .list-group-item-text {
        color: #c7ddef;
    }
    .list-group-item-success {
        color: #3c763d;
        background-color: #dff0d8;
    }
    a.list-group-item-success,
    button.list-group-item-success {
        color: #3c763d;
    }
    a.list-group-item-success .list-group-item-heading,
    button.list-group-item-success .list-group-item-heading {
        color: inherit;
    }
    a.list-group-item-success:hover,
    button.list-group-item-success:hover,
    a.list-group-item-success:focus,
    button.list-group-item-success:focus {
        color: #3c763d;
        background-color: #d0e9c6;
    }
    a.list-group-item-success.active,
    button.list-group-item-success.active,
    a.list-group-item-success.active:hover,
    button.list-group-item-success.active:hover,
    a.list-group-item-success.active:focus,
    button.list-group-item-success.active:focus {
        color: #fff;
        background-color: #3c763d;
        border-color: #3c763d;
    }
    .list-group-item-info {
        color: #31708f;
        background-color: #d9edf7;
    }
    a.list-group-item-info,
    button.list-group-item-info {
        color: #31708f;
    }
    a.list-group-item-info .list-group-item-heading,
    button.list-group-item-info .list-group-item-heading {
        color: inherit;
    }
    a.list-group-item-info:hover,
    button.list-group-item-info:hover,
    a.list-group-item-info:focus,
    button.list-group-item-info:focus {
        color: #31708f;
        background-color: #c4e3f3;
    }
    a.list-group-item-info.active,
    button.list-group-item-info.active,
    a.list-group-item-info.active:hover,
    button.list-group-item-info.active:hover,
    a.list-group-item-info.active:focus,
    button.list-group-item-info.active:focus {
        color: #fff;
        background-color: #31708f;
        border-color: #31708f;
    }
    .list-group-item-warning {
        color: #8a6d3b;
        background-color: #fcf8e3;
    }
    a.list-group-item-warning,
    button.list-group-item-warning {
        color: #8a6d3b;
    }
    a.list-group-item-warning .list-group-item-heading,
    button.list-group-item-warning .list-group-item-heading {
        color: inherit;
    }
    a.list-group-item-warning:hover,
    button.list-group-item-warning:hover,
    a.list-group-item-warning:focus,
    button.list-group-item-warning:focus {
        color: #8a6d3b;
        background-color: #faf2cc;
    }
    a.list-group-item-warning.active,
    button.list-group-item-warning.active,
    a.list-group-item-warning.active:hover,
    button.list-group-item-warning.active:hover,
    a.list-group-item-warning.active:focus,
    button.list-group-item-warning.active:focus {
        color: #fff;
        background-color: #8a6d3b;
        border-color: #8a6d3b;
    }
    .list-group-item-danger {
        color: #a94442;
        background-color: #f2dede;
    }
    a.list-group-item-danger,
    button.list-group-item-danger {
        color: #a94442;
    }
    a.list-group-item-danger .list-group-item-heading,
    button.list-group-item-danger .list-group-item-heading {
        color: inherit;
    }
    a.list-group-item-danger:hover,
    button.list-group-item-danger:hover,
    a.list-group-item-danger:focus,
    button.list-group-item-danger:focus {
        color: #a94442;
        background-color: #ebcccc;
    }
    a.list-group-item-danger.active,
    button.list-group-item-danger.active,
    a.list-group-item-danger.active:hover,
    button.list-group-item-danger.active:hover,
    a.list-group-item-danger.active:focus,
    button.list-group-item-danger.active:focus {
        color: #fff;
        background-color: #a94442;
        border-color: #a94442;
    }
    .list-group-item-heading {
        margin-top: 0;
        margin-bottom: 5px;
    }
    .list-group-item-text {
        margin-bottom: 0;
        line-height: 1.3;
    }
    .panel {
        margin-bottom: 20px;
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
        box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    }
    .panel-body {
        padding: 15px;
    }
    .panel-heading {
        padding: 10px 15px;
        border-bottom: 1px solid transparent;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    .panel-heading > .dropdown .dropdown-toggle {
        color: inherit;
    }
    .panel-title {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 16px;
        color: inherit;
    }
    .panel-title > a,
    .panel-title > small,
    .panel-title > .small,
    .panel-title > small > a,
    .panel-title > .small > a {
        color: inherit;
    }
    .panel-footer {
        padding: 10px 15px;
        background-color: #f5f5f5;
        border-top: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .panel > .list-group,
    .panel > .panel-collapse > .list-group {
        margin-bottom: 0;
    }
    .panel > .list-group .list-group-item,
    .panel > .panel-collapse > .list-group .list-group-item {
        border-width: 1px 0;
        border-radius: 0;
    }
    .panel > .list-group:first-child .list-group-item:first-child,
    .panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {
        border-top: 0;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    .panel > .list-group:last-child .list-group-item:last-child,
    .panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {
        border-bottom: 0;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .panel-heading + .list-group .list-group-item:first-child {
        border-top-width: 0;
    }
    .list-group + .panel-footer {
        border-top-width: 0;
    }
    .panel > .table,
    .panel > .table-responsive > .table,
    .panel > .panel-collapse > .table {
        margin-bottom: 0;
    }
    .panel > .table caption,
    .panel > .table-responsive > .table caption,
    .panel > .panel-collapse > .table caption {
        padding-right: 15px;
        padding-left: 15px;
    }
    .panel > .table:first-child,
    .panel > .table-responsive:first-child > .table:first-child {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    .panel > .table:first-child > thead:first-child > tr:first-child,
    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,
    .panel > .table:first-child > tbody:first-child > tr:first-child,
    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    .panel > .table:first-child > thead:first-child > tr:first-child td:first-child,
    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,
    .panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,
    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,
    .panel > .table:first-child > thead:first-child > tr:first-child th:first-child,
    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,
    .panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,
    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {
        border-top-left-radius: 3px;
    }
    .panel > .table:first-child > thead:first-child > tr:first-child td:last-child,
    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,
    .panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,
    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,
    .panel > .table:first-child > thead:first-child > tr:first-child th:last-child,
    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,
    .panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,
    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {
        border-top-right-radius: 3px;
    }
    .panel > .table:last-child,
    .panel > .table-responsive:last-child > .table:last-child {
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .panel > .table:last-child > tbody:last-child > tr:last-child,
    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,
    .panel > .table:last-child > tfoot:last-child > tr:last-child,
    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,
    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,
    .panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,
    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,
    .panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,
    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,
    .panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,
    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {
        border-bottom-left-radius: 3px;
    }
    .panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,
    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,
    .panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,
    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,
    .panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,
    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,
    .panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,
    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {
        border-bottom-right-radius: 3px;
    }
    .panel > .panel-body + .table,
    .panel > .panel-body + .table-responsive,
    .panel > .table + .panel-body,
    .panel > .table-responsive + .panel-body {
        border-top: 1px solid #ddd;
    }
    .panel > .table > tbody:first-child > tr:first-child th,
    .panel > .table > tbody:first-child > tr:first-child td {
        border-top: 0;
    }
    .panel > .table-bordered,
    .panel > .table-responsive > .table-bordered {
        border: 0;
    }
    .panel > .table-bordered > thead > tr > th:first-child,
    .panel > .table-responsive > .table-bordered > thead > tr > th:first-child,
    .panel > .table-bordered > tbody > tr > th:first-child,
    .panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,
    .panel > .table-bordered > tfoot > tr > th:first-child,
    .panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,
    .panel > .table-bordered > thead > tr > td:first-child,
    .panel > .table-responsive > .table-bordered > thead > tr > td:first-child,
    .panel > .table-bordered > tbody > tr > td:first-child,
    .panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,
    .panel > .table-bordered > tfoot > tr > td:first-child,
    .panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {
        border-left: 0;
    }
    .panel > .table-bordered > thead > tr > th:last-child,
    .panel > .table-responsive > .table-bordered > thead > tr > th:last-child,
    .panel > .table-bordered > tbody > tr > th:last-child,
    .panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,
    .panel > .table-bordered > tfoot > tr > th:last-child,
    .panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,
    .panel > .table-bordered > thead > tr > td:last-child,
    .panel > .table-responsive > .table-bordered > thead > tr > td:last-child,
    .panel > .table-bordered > tbody > tr > td:last-child,
    .panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,
    .panel > .table-bordered > tfoot > tr > td:last-child,
    .panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {
        border-right: 0;
    }
    .panel > .table-bordered > thead > tr:first-child > td,
    .panel > .table-responsive > .table-bordered > thead > tr:first-child > td,
    .panel > .table-bordered > tbody > tr:first-child > td,
    .panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,
    .panel > .table-bordered > thead > tr:first-child > th,
    .panel > .table-responsive > .table-bordered > thead > tr:first-child > th,
    .panel > .table-bordered > tbody > tr:first-child > th,
    .panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {
        border-bottom: 0;
    }
    .panel > .table-bordered > tbody > tr:last-child > td,
    .panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,
    .panel > .table-bordered > tfoot > tr:last-child > td,
    .panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,
    .panel > .table-bordered > tbody > tr:last-child > th,
    .panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,
    .panel > .table-bordered > tfoot > tr:last-child > th,
    .panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {
        border-bottom: 0;
    }
    .panel > .table-responsive {
        margin-bottom: 0;
        border: 0;
    }
    .panel-group {
        margin-bottom: 20px;
    }
    .panel-group .panel {
        margin-bottom: 0;
        border-radius: 4px;
    }
    .panel-group .panel + .panel {
        margin-top: 5px;
    }
    .panel-group .panel-heading {
        border-bottom: 0;
    }
    .panel-group .panel-heading + .panel-collapse > .panel-body,
    .panel-group .panel-heading + .panel-collapse > .list-group {
        border-top: 1px solid #ddd;
    }
    .panel-group .panel-footer {
        border-top: 0;
    }
    .panel-group .panel-footer + .panel-collapse .panel-body {
        border-bottom: 1px solid #ddd;
    }
    .panel-default {
        border-color: #ddd;
    }
    .panel-default > .panel-heading {
        color: #333;
        background-color: #f5f5f5;
        border-color: #ddd;
    }
    .panel-default > .panel-heading + .panel-collapse > .panel-body {
        border-top-color: #ddd;
    }
    .panel-default > .panel-heading .badge {
        color: #f5f5f5;
        background-color: #333;
    }
    .panel-default > .panel-footer + .panel-collapse > .panel-body {
        border-bottom-color: #ddd;
    }
    .panel-primary {
        border-color: #337ab7;
    }
    .panel-primary > .panel-heading {
        color: #fff;
        background-color: #337ab7;
        border-color: #337ab7;
    }
    .panel-primary > .panel-heading + .panel-collapse > .panel-body {
        border-top-color: #337ab7;
    }
    .panel-primary > .panel-heading .badge {
        color: #337ab7;
        background-color: #fff;
    }
    .panel-primary > .panel-footer + .panel-collapse > .panel-body {
        border-bottom-color: #337ab7;
    }
    .panel-success {
        border-color: #d6e9c6;
    }
    .panel-success > .panel-heading {
        color: #3c763d;
        background-color: #dff0d8;
        border-color: #d6e9c6;
    }
    .panel-success > .panel-heading + .panel-collapse > .panel-body {
        border-top-color: #d6e9c6;
    }
    .panel-success > .panel-heading .badge {
        color: #dff0d8;
        background-color: #3c763d;
    }
    .panel-success > .panel-footer + .panel-collapse > .panel-body {
        border-bottom-color: #d6e9c6;
    }
    .panel-info {
        border-color: #bce8f1;
    }
    .panel-info > .panel-heading {
        color: #31708f;
        background-color: #d9edf7;
        border-color: #bce8f1;
    }
    .panel-info > .panel-heading + .panel-collapse > .panel-body {
        border-top-color: #bce8f1;
    }
    .panel-info > .panel-heading .badge {
        color: #d9edf7;
        background-color: #31708f;
    }
    .panel-info > .panel-footer + .panel-collapse > .panel-body {
        border-bottom-color: #bce8f1;
    }
    .panel-warning {
        border-color: #faebcc;
    }
    .panel-warning > .panel-heading {
        color: #8a6d3b;
        background-color: #fcf8e3;
        border-color: #faebcc;
    }
    .panel-warning > .panel-heading + .panel-collapse > .panel-body {
        border-top-color: #faebcc;
    }
    .panel-warning > .panel-heading .badge {
        color: #fcf8e3;
        background-color: #8a6d3b;
    }
    .panel-warning > .panel-footer + .panel-collapse > .panel-body {
        border-bottom-color: #faebcc;
    }
    .panel-danger {
        border-color: #ebccd1;
    }
    .panel-danger > .panel-heading {
        color: #a94442;
        background-color: #f2dede;
        border-color: #ebccd1;
    }
    .panel-danger > .panel-heading + .panel-collapse > .panel-body {
        border-top-color: #ebccd1;
    }
    .panel-danger > .panel-heading .badge {
        color: #f2dede;
        background-color: #a94442;
    }
    .panel-danger > .panel-footer + .panel-collapse > .panel-body {
        border-bottom-color: #ebccd1;
    }
    .embed-responsive {
        position: relative;
        display: block;
        height: 0;
        padding: 0;
        overflow: hidden;
    }
    .embed-responsive .embed-responsive-item,
    .embed-responsive iframe,
    .embed-responsive embed,
    .embed-responsive object,
    .embed-responsive video {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
    }
    .embed-responsive-16by9 {
        padding-bottom: 56.25%;
    }
    .embed-responsive-4by3 {
        padding-bottom: 75%;
    }
    .well {
        min-height: 20px;
        padding: 19px;
        margin-bottom: 20px;
        background-color: #f5f5f5;
        border: 1px solid #e3e3e3;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
    }
    .well blockquote {
        border-color: #ddd;
        border-color: rgba(0, 0, 0, .15);
    }
    .well-lg {
        padding: 24px;
        border-radius: 6px;
    }
    .well-sm {
        padding: 9px;
        border-radius: 3px;
    }
    .close {
        float: right;
        font-size: 21px;
        font-weight: bold;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        filter: alpha(opacity=20);
        opacity: .2;
    }
    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
        filter: alpha(opacity=50);
        opacity: .5;
    }
    button.close {
        -webkit-appearance: none;
        padding: 0;
        cursor: pointer;
        background: transparent;
        border: 0;
    }
    .modal-open {
        overflow: hidden;
    }
    .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1050;
        display: none;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
        outline: 0;
    }
    .modal.fade .modal-dialog {
        -webkit-transition: -webkit-transform .3s ease-out;
        -o-transition:      -o-transform .3s ease-out;
        transition:         transform .3s ease-out;
        -webkit-transform: translate(0, -25%);
        -ms-transform: translate(0, -25%);
        -o-transform: translate(0, -25%);
        transform: translate(0, -25%);
    }
    .modal.in .modal-dialog {
        -webkit-transform: translate(0, 0);
        -ms-transform: translate(0, 0);
        -o-transform: translate(0, 0);
        transform: translate(0, 0);
    }
    .modal-open .modal {
        overflow-x: hidden;
        overflow-y: auto;
    }
    .modal-dialog {
        position: relative;
        width: auto;
        margin: 10px;
    }
    .modal-content {
        position: relative;
        background-color: #fff;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        border: 1px solid #999;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 6px;
        outline: 0;
        -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
        box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
    }
    .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1040;
        background-color: #000;
    }
    .modal-backdrop.fade {
        filter: alpha(opacity=0);
        opacity: 0;
    }
    .modal-backdrop.in {
        filter: alpha(opacity=50);
        opacity: .5;
    }
    .modal-header {
        padding: 15px;
        border-bottom: 1px solid #e5e5e5;
    }
    .modal-header .close {
        margin-top: -2px;
    }
    .modal-title {
        margin: 0;
        line-height: 1.42857143;
    }
    .modal-body {
        position: relative;
        padding: 15px;
    }
    .modal-footer {
        padding: 15px;
        text-align: right;
        border-top: 1px solid #e5e5e5;
    }
    .modal-footer .btn + .btn {
        margin-bottom: 0;
        margin-left: 5px;
    }
    .modal-footer .btn-group .btn + .btn {
        margin-left: -1px;
    }
    .modal-footer .btn-block + .btn-block {
        margin-left: 0;
    }
    .modal-scrollbar-measure {
        position: absolute;
        top: -9999px;
        width: 50px;
        height: 50px;
        overflow: scroll;
    }
    @media (min-width: 768px) {
        .modal-dialog {
            width: 600px;
            margin: 30px auto;
        }
        .modal-content {
            -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
            box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
        }
        .modal-sm {
            width: 300px;
        }
    }
    @media (min-width: 992px) {
        .modal-lg {
            width: 900px;
        }
    }
    .tooltip {
        position: absolute;
        z-index: 1070;
        display: block;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: normal;
        line-height: 1.42857143;
        text-align: left;
        text-align: start;
        text-decoration: none;
        text-shadow: none;
        text-transform: none;
        letter-spacing: normal;
        word-break: normal;
        word-spacing: normal;
        word-wrap: normal;
        white-space: normal;
        filter: alpha(opacity=0);
        opacity: 0;

        line-break: auto;
    }
    .tooltip.in {
        filter: alpha(opacity=90);
        opacity: .9;
    }
    .tooltip.top {
        padding: 5px 0;
        margin-top: -3px;
    }
    .tooltip.right {
        padding: 0 5px;
        margin-left: 3px;
    }
    .tooltip.bottom {
        padding: 5px 0;
        margin-top: 3px;
    }
    .tooltip.left {
        padding: 0 5px;
        margin-left: -3px;
    }
    .tooltip-inner {
        max-width: 200px;
        padding: 3px 8px;
        color: #fff;
        text-align: center;
        background-color: #000;
        border-radius: 4px;
    }
    .tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }
    .tooltip.top .tooltip-arrow {
        bottom: 0;
        left: 50%;
        margin-left: -5px;
        border-width: 5px 5px 0;
        border-top-color: #000;
    }
    .tooltip.top-left .tooltip-arrow {
        right: 5px;
        bottom: 0;
        margin-bottom: -5px;
        border-width: 5px 5px 0;
        border-top-color: #000;
    }
    .tooltip.top-right .tooltip-arrow {
        bottom: 0;
        left: 5px;
        margin-bottom: -5px;
        border-width: 5px 5px 0;
        border-top-color: #000;
    }
    .tooltip.right .tooltip-arrow {
        top: 50%;
        left: 0;
        margin-top: -5px;
        border-width: 5px 5px 5px 0;
        border-right-color: #000;
    }
    .tooltip.left .tooltip-arrow {
        top: 50%;
        right: 0;
        margin-top: -5px;
        border-width: 5px 0 5px 5px;
        border-left-color: #000;
    }
    .tooltip.bottom .tooltip-arrow {
        top: 0;
        left: 50%;
        margin-left: -5px;
        border-width: 0 5px 5px;
        border-bottom-color: #000;
    }
    .tooltip.bottom-left .tooltip-arrow {
        top: 0;
        right: 5px;
        margin-top: -5px;
        border-width: 0 5px 5px;
        border-bottom-color: #000;
    }
    .tooltip.bottom-right .tooltip-arrow {
        top: 0;
        left: 5px;
        margin-top: -5px;
        border-width: 0 5px 5px;
        border-bottom-color: #000;
    }
    .popover {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1060;
        display: none;
        max-width: 276px;
        padding: 1px;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: normal;
        line-height: 1.42857143;
        text-align: left;
        text-align: start;
        text-decoration: none;
        text-shadow: none;
        text-transform: none;
        letter-spacing: normal;
        word-break: normal;
        word-spacing: normal;
        word-wrap: normal;
        white-space: normal;
        background-color: #fff;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        border: 1px solid #ccc;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 6px;
        -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
        box-shadow: 0 5px 10px rgba(0, 0, 0, .2);

        line-break: auto;
    }
    .popover.top {
        margin-top: -10px;
    }
    .popover.right {
        margin-left: 10px;
    }
    .popover.bottom {
        margin-top: 10px;
    }
    .popover.left {
        margin-left: -10px;
    }
    .popover-title {
        padding: 8px 14px;
        margin: 0;
        font-size: 14px;
        background-color: #f7f7f7;
        border-bottom: 1px solid #ebebeb;
        border-radius: 5px 5px 0 0;
    }
    .popover-content {
        padding: 9px 14px;
    }
    .popover > .arrow,
    .popover > .arrow:after {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }
    .popover > .arrow {
        border-width: 11px;
    }
    .popover > .arrow:after {
        content: "";
        border-width: 10px;
    }
    .popover.top > .arrow {
        bottom: -11px;
        left: 50%;
        margin-left: -11px;
        border-top-color: #999;
        border-top-color: rgba(0, 0, 0, .25);
        border-bottom-width: 0;
    }
    .popover.top > .arrow:after {
        bottom: 1px;
        margin-left: -10px;
        content: " ";
        border-top-color: #fff;
        border-bottom-width: 0;
    }
    .popover.right > .arrow {
        top: 50%;
        left: -11px;
        margin-top: -11px;
        border-right-color: #999;
        border-right-color: rgba(0, 0, 0, .25);
        border-left-width: 0;
    }
    .popover.right > .arrow:after {
        bottom: -10px;
        left: 1px;
        content: " ";
        border-right-color: #fff;
        border-left-width: 0;
    }
    .popover.bottom > .arrow {
        top: -11px;
        left: 50%;
        margin-left: -11px;
        border-top-width: 0;
        border-bottom-color: #999;
        border-bottom-color: rgba(0, 0, 0, .25);
    }
    .popover.bottom > .arrow:after {
        top: 1px;
        margin-left: -10px;
        content: " ";
        border-top-width: 0;
        border-bottom-color: #fff;
    }
    .popover.left > .arrow {
        top: 50%;
        right: -11px;
        margin-top: -11px;
        border-right-width: 0;
        border-left-color: #999;
        border-left-color: rgba(0, 0, 0, .25);
    }
    .popover.left > .arrow:after {
        right: 1px;
        bottom: -10px;
        content: " ";
        border-right-width: 0;
        border-left-color: #fff;
    }
    .carousel {
        position: relative;
    }
    .carousel-inner {
        position: relative;
        width: 100%;
        overflow: hidden;
    }
    .carousel-inner > .item {
        position: relative;
        display: none;
        -webkit-transition: .6s ease-in-out left;
        -o-transition: .6s ease-in-out left;
        transition: .6s ease-in-out left;
    }
    .carousel-inner > .item > img,
    .carousel-inner > .item > a > img {
        line-height: 1;
    }
    @media all and (transform-3d), (-webkit-transform-3d) {
        .carousel-inner > .item {
            -webkit-transition: -webkit-transform .6s ease-in-out;
            -o-transition:      -o-transform .6s ease-in-out;
            transition:         transform .6s ease-in-out;

            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            -webkit-perspective: 1000px;
            perspective: 1000px;
        }
        .carousel-inner > .item.next,
        .carousel-inner > .item.active.right {
            left: 0;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }
        .carousel-inner > .item.prev,
        .carousel-inner > .item.active.left {
            left: 0;
            -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
        }
        .carousel-inner > .item.next.left,
        .carousel-inner > .item.prev.right,
        .carousel-inner > .item.active {
            left: 0;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }
    .carousel-inner > .active,
    .carousel-inner > .next,
    .carousel-inner > .prev {
        display: block;
    }
    .carousel-inner > .active {
        left: 0;
    }
    .carousel-inner > .next,
    .carousel-inner > .prev {
        position: absolute;
        top: 0;
        width: 100%;
    }
    .carousel-inner > .next {
        left: 100%;
    }
    .carousel-inner > .prev {
        left: -100%;
    }
    .carousel-inner > .next.left,
    .carousel-inner > .prev.right {
        left: 0;
    }
    .carousel-inner > .active.left {
        left: -100%;
    }
    .carousel-inner > .active.right {
        left: 100%;
    }
    .carousel-control {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 15%;
        font-size: 20px;
        color: #fff;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
        background-color: rgba(0, 0, 0, 0);
        filter: alpha(opacity=50);
        opacity: .5;
    }
    .carousel-control.left {
        background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);
        background-image:      -o-linear-gradient(left, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);
        background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, .5)), to(rgba(0, 0, 0, .0001)));
        background-image:         linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);
        background-repeat: repeat-x;
    }
    .carousel-control.right {
        right: 0;
        left: auto;
        background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);
        background-image:      -o-linear-gradient(left, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);
        background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, .0001)), to(rgba(0, 0, 0, .5)));
        background-image:         linear-gradient(to right, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);
        background-repeat: repeat-x;
    }
    .carousel-control:hover,
    .carousel-control:focus {
        color: #fff;
        text-decoration: none;
        filter: alpha(opacity=90);
        outline: 0;
        opacity: .9;
    }
    .carousel-control .icon-prev,
    .carousel-control .icon-next,
    .carousel-control .glyphicon-chevron-left,
    .carousel-control .glyphicon-chevron-right {
        position: absolute;
        top: 50%;
        z-index: 5;
        display: inline-block;
        margin-top: -10px;
    }
    .carousel-control .icon-prev,
    .carousel-control .glyphicon-chevron-left {
        left: 50%;
        margin-left: -10px;
    }
    .carousel-control .icon-next,
    .carousel-control .glyphicon-chevron-right {
        right: 50%;
        margin-right: -10px;
    }
    .carousel-control .icon-prev,
    .carousel-control .icon-next {
        width: 20px;
        height: 20px;
        font-family: serif;
        line-height: 1;
    }
    .carousel-control .icon-prev:before {
        content: '\2039';
    }
    .carousel-control .icon-next:before {
        content: '\203a';
    }
    .carousel-indicators {
        position: absolute;
        bottom: 10px;
        left: 50%;
        z-index: 15;
        width: 60%;
        padding-left: 0;
        margin-left: -30%;
        text-align: center;
        list-style: none;
    }
    .carousel-indicators li {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 1px;
        text-indent: -999px;
        cursor: pointer;
        background-color: #000 \9;
        background-color: rgba(0, 0, 0, 0);
        border: 1px solid #fff;
        border-radius: 10px;
    }
    .carousel-indicators .active {
        width: 12px;
        height: 12px;
        margin: 0;
        background-color: #fff;
    }
    .carousel-caption {
        position: absolute;
        right: 15%;
        bottom: 20px;
        left: 15%;
        z-index: 10;
        padding-top: 20px;
        padding-bottom: 20px;
        color: #fff;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
    }
    .carousel-caption .btn {
        text-shadow: none;
    }
    @media screen and (min-width: 768px) {
        .carousel-control .glyphicon-chevron-left,
        .carousel-control .glyphicon-chevron-right,
        .carousel-control .icon-prev,
        .carousel-control .icon-next {
            width: 30px;
            height: 30px;
            margin-top: -10px;
            font-size: 30px;
        }
        .carousel-control .glyphicon-chevron-left,
        .carousel-control .icon-prev {
            margin-left: -10px;
        }
        .carousel-control .glyphicon-chevron-right,
        .carousel-control .icon-next {
            margin-right: -10px;
        }
        .carousel-caption {
            right: 20%;
            left: 20%;
            padding-bottom: 30px;
        }
        .carousel-indicators {
            bottom: 20px;
        }
    }
    .clearfix:before,
    .clearfix:after,
    .dl-horizontal dd:before,
    .dl-horizontal dd:after,
    .container:before,
    .container:after,
    .container-fluid:before,
    .container-fluid:after,
    .row:before,
    .row:after,
    .form-horizontal .form-group:before,
    .form-horizontal .form-group:after,
    .btn-toolbar:before,
    .btn-toolbar:after,
    .btn-group-vertical > .btn-group:before,
    .btn-group-vertical > .btn-group:after,
    .nav:before,
    .nav:after,
    .navbar:before,
    .navbar:after,
    .navbar-header:before,
    .navbar-header:after,
    .navbar-collapse:before,
    .navbar-collapse:after,
    .pager:before,
    .pager:after,
    .panel-body:before,
    .panel-body:after,
    .modal-header:before,
    .modal-header:after,
    .modal-footer:before,
    .modal-footer:after {
        display: table;
        content: " ";
    }
    .clearfix:after,
    .dl-horizontal dd:after,
    .container:after,
    .container-fluid:after,
    .row:after,
    .form-horizontal .form-group:after,
    .btn-toolbar:after,
    .btn-group-vertical > .btn-group:after,
    .nav:after,
    .navbar:after,
    .navbar-header:after,
    .navbar-collapse:after,
    .pager:after,
    .panel-body:after,
    .modal-header:after,
    .modal-footer:after {
        clear: both;
    }
    .center-block {
        display: block;
        margin-right: auto;
        margin-left: auto;
    }
    .pull-right {
        float: right !important;
    }
    .pull-left {
        float: left !important;
    }
    .hide {
        display: none !important;
    }
    .show {
        display: block !important;
    }
    .invisible {
        visibility: hidden;
    }
    .text-hide {
        font: 0/0 a;
        color: transparent;
        text-shadow: none;
        background-color: transparent;
        border: 0;
    }
    .hidden {
        display: none !important;
    }
    .affix {
        position: fixed;
    }
    @-ms-viewport {
        /*width: device-width;*/
    }
    .visible-xs,
    .visible-sm,
    .visible-md,
    .visible-lg {
        display: none !important;
    }
    .visible-xs-block,
    .visible-xs-inline,
    .visible-xs-inline-block,
    .visible-sm-block,
    .visible-sm-inline,
    .visible-sm-inline-block,
    .visible-md-block,
    .visible-md-inline,
    .visible-md-inline-block,
    .visible-lg-block,
    .visible-lg-inline,
    .visible-lg-inline-block {
        display: none !important;
    }
    @media (max-width: 767px) {
        .visible-xs {
            display: block !important;
        }
        table.visible-xs {
            display: table !important;
        }
        tr.visible-xs {
            display: table-row !important;
        }
        th.visible-xs,
        td.visible-xs {
            display: table-cell !important;
        }
    }
    @media (max-width: 767px) {
        .visible-xs-block {
            display: block !important;
        }
    }
    @media (max-width: 767px) {
        .visible-xs-inline {
            display: inline !important;
        }
    }
    @media (max-width: 767px) {
        .visible-xs-inline-block {
            display: inline-block !important;
        }
    }
    @media (min-width: 768px) and (max-width: 991px) {
        .visible-sm {
            display: block !important;
        }
        table.visible-sm {
            display: table !important;
        }
        tr.visible-sm {
            display: table-row !important;
        }
        th.visible-sm,
        td.visible-sm {
            display: table-cell !important;
        }
    }
    @media (min-width: 768px) and (max-width: 991px) {
        .visible-sm-block {
            display: block !important;
        }
    }
    @media (min-width: 768px) and (max-width: 991px) {
        .visible-sm-inline {
            display: inline !important;
        }
    }
    @media (min-width: 768px) and (max-width: 991px) {
        .visible-sm-inline-block {
            display: inline-block !important;
        }
    }
    @media (min-width: 992px) and (max-width: 1199px) {
        .visible-md {
            display: block !important;
        }
        table.visible-md {
            display: table !important;
        }
        tr.visible-md {
            display: table-row !important;
        }
        th.visible-md,
        td.visible-md {
            display: table-cell !important;
        }
    }
    @media (min-width: 992px) and (max-width: 1199px) {
        .visible-md-block {
            display: block !important;
        }
    }
    @media (min-width: 992px) and (max-width: 1199px) {
        .visible-md-inline {
            display: inline !important;
        }
    }
    @media (min-width: 992px) and (max-width: 1199px) {
        .visible-md-inline-block {
            display: inline-block !important;
        }
    }
    @media (min-width: 1200px) {
        .visible-lg {
            display: block !important;
        }
        table.visible-lg {
            display: table !important;
        }
        tr.visible-lg {
            display: table-row !important;
        }
        th.visible-lg,
        td.visible-lg {
            display: table-cell !important;
        }
    }
    @media (min-width: 1200px) {
        .visible-lg-block {
            display: block !important;
        }
    }
    @media (min-width: 1200px) {
        .visible-lg-inline {
            display: inline !important;
        }
    }
    @media (min-width: 1200px) {
        .visible-lg-inline-block {
            display: inline-block !important;
        }
    }
    @media (max-width: 767px) {
        .hidden-xs {
            display: none !important;
        }
    }
    @media (min-width: 768px) and (max-width: 991px) {
        .hidden-sm {
            display: none !important;
        }
    }
    @media (min-width: 992px) and (max-width: 1199px) {
        .hidden-md {
            display: none !important;
        }
    }
    @media (min-width: 1200px) {
        .hidden-lg {
            display: none !important;
        }
    }
    .visible-print {
        display: none !important;
    }
    @media print {
        .visible-print {
            display: block !important;
        }
        table.visible-print {
            display: table !important;
        }
        tr.visible-print {
            display: table-row !important;
        }
        th.visible-print,
        td.visible-print {
            display: table-cell !important;
        }
    }
    .visible-print-block {
        display: none !important;
    }
    @media print {
        .visible-print-block {
            display: block !important;
        }
    }
    .visible-print-inline {
        display: none !important;
    }
    @media print {
        .visible-print-inline {
            display: inline !important;
        }
    }
    .visible-print-inline-block {
        display: none !important;
    }
    @media print {
        .visible-print-inline-block {
            display: inline-block !important;
        }
    }
    @media print {
        .hidden-print {
            display: none !important;
        }
    }
    /*# sourceMappingURL=bootstrap.css.map */

</style>