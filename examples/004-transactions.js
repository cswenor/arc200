import dotenv from "dotenv";
import arc200 from "../util/arc200.js";
import { checkEnv, checkYOrN } from "../util/check.js";
import algosdk, { waitForConfirmation } from "algosdk";

dotenv.config();

checkEnv();

const contractsData = [
  { contractId: 6778021, contractInstanceName: "VRC200" }, // OpenARc200v1, has touch + grant method
];

const accountsData = [
  { address: "PE7JOARGLQY7P4P3I3OPE4D4UH5FMWZHEN3VTVY3ORZTJJY3QISMV3DNOA" },
  { address: "DJASBA6SCNC5HT463XRDONJ7W44HM4KXK7UB3TOF7ISZONSHG4YVTGTQWE" },
  { address: "54I65DE4SBMBBQB7W54INEAQ6E6ZB2K7NVGCCS3C7J4I7CPB52HRGBR5DM" },
  { address: "FFX2QWUU7B4XNLFKV7UHRNMTYF43D2BGTZUBOV5MSISSYS6ENWBSWJ5A24" },
  { address: "NL3NIBJBATMITPDMKNRILMGRQ3IM4BGX5ZGJSUXWFDLJQE73S2D4H36QKE" },
  { address: "7Q6L2XXDE3PF5XO4YVVGTDOCDNBNKVQ73I3UUZ7AVPD35UIQBE6EN2W5DU" },
  { address: "UD5LOVE643WWV7CFQVMAYW6L5J6OW2ST3TTYYIKGDSRC3AEMFKV2RC667U" },
  { address: "3NJCEVVDHE4URRLPZ5ENV3TZLAEGITRPVOR3FKKYG5ROLUY6CEAVO3VLRM" },
  { address: "N6T57UMUEOB55NLNZ7N5T3UUPNYQ5WXMZ2IPOFGOLULO26Z5BC3T6GVP7Y" },
  { address: "CTW5TERGQ3R75WEKZH225MTTXNPX7RNT7YQPO5M4NZZ5RW4SKHS7LIH5HE" },
  { address: "XK2MA64GERBIWYAF5LEQN3DXKKKEAFPJSJYUU72EXQB52ALUPGGDY45OZI" },
  { address: "LNAFIFNIKKMZLMGVJ3QQJJ5MBK5ALIURNLGZQQLTJ42QPVWG6M22455UNU" },
  { address: "7UTAHV4YNYGEPPOGW6HESRRLDVGZKOCYLFJZMUO6DLVP7BZKO2UMKPICKQ" },
  { address: "G6LPPXMK5DQ3O3SUJH5Y7OPG52ULOD44NBP62V5IUOT3KPG53PYAX6A2H4" },
  { address: "IKBA63OLIONTVSA2LXQCPIV7BHCEDWMIHTOIVAZJBALYVBHQD6SGZ6HI4A" },
  { address: "GXKM7N3MNASW2VX4I3JDJ5WWI5YEVVGM6VBCB3KCEWNEBTOYQZPYWUZERI" },
  { address: "QMVOVBS3XVVTYAWJRBKV6PJE3ARU2JAQKVBFQHKMAMJEJP5J5JVJN5C4JY" },
  { address: "HAHARFG7KQP3DUXA55WRU6MJLNY4LPLVDHIYK3F45RDK4HHSNB2BJBPXAY" },
  { address: "D4VYJWR6NVNYYDU45Z3X7BNNTV66D2LVRQ5ZPCDMGVKUAAJA3TN4IQOQ4U" },
  { address: "FODFE2T6P6IGQQ7SG3AIVN3OCZWYCGHKCWWGC45KB3IKM266OZXYGYHDMA" },
  { address: "HPTJN7GF7W66KSR5DTB6CDZNHNZWEEQSX6YFNIXM7FF4CYMME6IOMPW32A" },
  { address: "I4LZAVVELFA44JG6WOJXKGVV7S44MZJZTD2M2UMGLTY5DKS4S56P7NPP7A" },
  { address: "ORADHH6KFY7A6JUTVVH4SHVUY7MXDWPTROSXHMWVJMWUFS6IKO5KASYOYE" },
  { address: "UCLIHGXKSALDYMWLAEKLKJXTXF6QYDRI2AWL7NJYTZD54YV27BFSWNRFMA" },
  { address: "R45WPDWADHVPP2PW7BKJUX2YTSNZ5AWXBOEKGHXLN55BGZSZGWGSVS5V5E" },
  { address: "CVMLXGFWTNW7GBRQZZSQY2UHX2Y6CEHWCZV6NMXO2GU3T3QSQ6FKTRQNCE" },
  { address: "LIVOIC24OM5PVF3YOTFWHYS3AVNAD4YYEMU76IQ63MGUBQIAFWDGRB4EDU" },
  { address: "S44E2Q7G4GTIRZFC744A3Z4TWYKLXWJSNE2H52PPYHDVGGTBHKPTQTUSJE" },
  { address: "WKU6ISGGC3WCQBMDBRYN3CXAM46H4PQ3YCXP3RLTFYWHWDXFG4N7XNDSGY" },
  { address: "DNNRKF6EXIGIAA45LSXOU2IJXHLC4IXF6EP5AXBTE3VAZBWDS2PFQQMCSU" },
  { address: "VMMV4O5KEGGS7WVM74GPNHFM5B5YS6JZKJWFAKCHNY3Q3FEYBBSIMF5FWU" },
  { address: "ZKW6PTTHQMDNGNXCH3GQ464XP6NW7OTW4SR2VREFETBGI7TASIG24HSF3I" },
  { address: "7WO47R4XY5TIO3YP4KFK7RU6Z72YL5VPPIOM2P5NNFH6YFYLQZVVJWMJFI" },
  { address: "HD4OXLRTBFF5NAWEYDG6HVTHTCFWE3NILIESJC3XHLDQYHWJN5KCO4BMQE" },
  { address: "GLG2ZIDZFIFYFNL73AIRZXAPLN3XH4ILXJX5XGXXQNA5JGDWTO6VZZSLPM" },
  { address: "VOIUK3B5KQXVMVMYMLZOELHNABRKV27BP3CZRIK2ZCF7HEFP4F6APX76NM" },
  { address: "X5X5DSLBCTL42YSNDYQH3PCIIUYOEQSXRYBOH7L6NK32WWCLUYQEP53B7E" },
  { address: "H4Y2NDJELPWL5KO7VYPCPGRP4P7UWXTNOKNPXMX6HAUXBJHV5ZDC4JIHNE" },
  { address: "SC7OM77YNTEEG3O3F34KFBIFNEIDU3PGJD2NTTVY7WNGRUO6EC57K3VQHI" },
  { address: "RH556KVHEZMSDEFIHQQJJOIBFHVZZGYT2YTXF67A7LWMUR5EA6S524DGDQ" },
  { address: "7TRSTDOU5WCQ3JNPL7WX25G67MHPVOVG2K6LONLJFNLOUGSL2CLYBPJVR4" },
  { address: "FNCFQU67HCG7KPTZ46LCTUPANOCCWF4NMWFOVNCXTILYYDZ7BLVDJV5KGU" },
  { address: "IBJBM2RBHYM6XADFFQEJWXIZRHTCUT5NVPR5VXPFYHY7JQZC3AP3R3D7KA" },
  { address: "2I4T4RIVRCFMUNGLICPQVQ4QU6P7FPZURCFSIWOWS5CR5RNS4JOPO3C5LY" },
  { address: "UPOHVNJVID64ASF5NNDVP7AD6NS4AIO7IVLABAGOIPRRNZXGPLMTAFOYMI" },
  { address: "EM6YOBT4UOMEGWZO74OLOSA55V6EH6DUQSCAJA6FNMQ5IS5U3GZXBUR2OI" },
  { address: "3ENZ5UAFXUENSBQ6VEBDJGDLGQMSRH7KJUBZAQBPAYCIXZ6M5UEXIKB6NE" },
  { address: "26VN3QDHQ7AYKA563TRRW3V2F7XMA2243WFDCDKYWQ2GP2Z6NHSZHYF5T4" },
  { address: "77YOKHWKK7FHEAULULKCZV23TIUFZQCT25RLDTXUXSZGCRDLS7WGDBQ75Q" },
  { address: "AE7J2DFIHOUO4SEC5FYKVORIJGYIKV7JW5DQRL62TMCTGU3FZNYZZFQSSE" },
  { address: "QR36VBICMIJC2HFQP4T33NOLECGMV6FNVIHCDOTA64PUVR5FCICYZQEHYM" },
  { address: "TNTSFV2C6ZI3JY2GIFHF2OAA2BXSIJBGECENJV5DNLJTXME2K33VKHGWSA" },
  { address: "VYK2HS4YHAKPESNM3SDNZSH4623AOX3JTSB6DJLS4WQAH2AWBFKGPODPTQ" },
  { address: "GPXA3I6PRDCODCR4PL4GICVEJNRR5YQOGQWX67ZIXJ6VUNH7XLA5QH3XHM" },
  { address: "QLE5ZQK7UO3WUBYQH4WW3W36MME5MRDUOYBXA3YCRXKHUNEFM6ABQWLAJY" },
  { address: "UPHSXCIIPEAQTZV5KSVG4AEHX3WWJEPGSBWTI2RDNJ3JBUCF5PIGOEXZDU" },
  { address: "YN3K4TCNIK6LKXHNLFQNXMMQ7ELPKATNXOZYRZNT5IQRMUL5BSQFAOH5OA" },
  { address: "2RMPWZ6VDF5FKNIWLQQRJFMIXRCOML5NWB2XBLIUOVPQCW56F7VTUQCMAU" },
  { address: "CH7U2IH245QDJOXXUHBFT3F4HQRLOTTRCDIR7XY3PCPYRUAQMFDTXEVI6E" },
  { address: "EWFMNXU5PHBWKG7RBEUA76CXRSJSL75JABWGBAMZREPYRMW53SCAPL3DW4" },
  { address: "F76ZRA5363BHN6R4WF4GZI47UWBP27U5G775BS7FVNWA7PZCG7V5XM55PA" },
  { address: "ICPHQCX6RN56SNCPFBMEAODL6SUKOZO6NSZKK6JLKUZU5IYEJ5AFZLOYHM" },
  { address: "STABLEBIDVRZ4NOB76MBUPRY5QDJEQBHNQW7TUQ3DHR4ZZ27AWZU3U6DVQ" },
  { address: "WLFPR3KAN7VVA2BDZVRNQSLMU6KNJX4SZVAEQUAZCSGEHQ6SEN2JT3RJM4" },
  { address: "6Q74W36WN35KYKWJ3TLYZKG7AVKTUQQPKF3URGFFQY4NMUWVHCDL53GRFY" },
  { address: "7YP3IOTG47W6JV5EBF2TBSDKI5NTKA3BCGLHXEHHYBRSVX6IQAF2G3R4RE" },
  { address: "B4SXDEBKAA37GPG3XT65DOISFLKF2KCNLFJPDESEHIOORX7HDPUF7RLDOE" },
  { address: "CGHPWAZZXRJIRVFVO5DRIT5BLLKV3E5E5XKVU24IDYIYOYYL7LZUBNQMF4" },
  { address: "DTHIRTEENUHXDHS7IZZBUPHXYWNT5TSSAAUX6NKTLJBR5ABOPTHNEA4DCU" },
  { address: "NX4HD3BCC2BSZZKH5VFUFE6GMTHSG7G3K7XP5ZER5TV65MN5HM3OERYUEU" },
  { address: "WBFLO2RNV7BGO3WJFCU3BEUH56KC4WOUHKEYQBXVBQIFSPKNSPYZBVETPI" },
  { address: "ESZW5SHXRYK4AZFX45EBE6T5SGDIS5HVZAHURS4ZGQUVJYR77IAWFJ63EM" },
  { address: "FREELANCINGOQPXOXN5CPEY7FDBGI6YPOPIA22RKB75T5JPWGGUIARBC3Q" },
  { address: "TJUVSNRBDTF2DDAWQDNLE5B4J2KUA7QQOEWSBFT5OGVPFZX5C25WWG4D3I" },
  { address: "TX3YK7JVETVYV6MVHTVD6QOKQIVCT3U7PJFD2OPYYRDLKVIXVKHTI5G54A" },
  { address: "B573LVAJXPSNQDGIJKNAUMA4PM6UEZRIB7JWACGGPRK6WIGUFKGI27WY7M" },
  { address: "FQBOAHRBYSCNQRYYDY2CJXM4YJ65J2M4PQME7C7ZMY24SVNU2XFPQSKZY4" },
  { address: "KUNLFEIZM4DIQALHP47XCQIFBMNUFXK2QJOAKQR5H22I4BRKIH7UTBXADE" },
  { address: "Q6AK4J46UDJYCUDNFUTTB73IIWKGDCBUEXKO2UQUI257BIOBUTS3J2BM5I" },
  { address: "YEI2LF6D6MAJOJ3QHRFEWG4Q2IZVI7AIPPW44P2YPOFEIUOGGALZCTGEIY" },
  { address: "DRQSIY4BYECUSRVGNGWQA7CKM2V632ZIQA263DMTWUYL62B5ENBUOCCQ7E" },
  { address: "HXQEYFESYI5V25O2WZWJGXELTGTW35KGVOW5H33WEYGZRWCF6OSOI5EDLM" },
  { address: "OFDX2SLOWN445RYTR24K6B4UQ4KU3ZT7G63ZUZRICICEPD52SBHPZLG32Q" },
  { address: "SNEV5QYQWGCMIHGVZPCC3FNJVIGNPYDYO5JZOVOUNG7M4ZXJSEVLBRMQQM" },
  { address: "PU7OZ2ML6ELO3LENDUFD6V35XRPZ72INDUIDD65C6KDVU5S6WUN7COMC3A" },
  { address: "ZLLIDP6ORXXQVBTSWSIFI2GNG4PYGT2LOPQ57UWGCXEGPGC3XLB2GEKP3E" },
  { address: "OX7N4RN7EXW3UTLHRKFEFSYFNXWJOBGFBOGSW2NUIQ4YCJGNXBS63ZTVDY" },
  { address: "2OX2UN54GZLNNSCQ6JF2HZBZX675JKDOXWY4GCT2ACP7PSTU6JIISXXFSU" },
  { address: "O77LJOKLFVZBNMJ23KWITXM6BC2HYYW74HNAIO6KGJZ6CEHNFFPVCYVFJE" },
  { address: "4O3WFM7EKQORGYOAQYCZKM4MIRZ3WG55DYTYDGKAVUFZSNBHUMLB7TWAYM" },
  { address: "KXOAPC36Y4PGDWRDKQJM2QCWXD7NUGERBCOLCGMEESYLDEY6LLE4FBS264" },
  { address: "NOOBCIJETEMWKOKEHA6M25KJFHIZDHAKSLWHKQEL7BUJ573E6FY33JDU2A" },
  { address: "R7TBR3Y5QCM6Y2OPQP3BPNUQG7TLN75IOC2WTNRUKO4VPNSDQF52MZB4ZE" },
  { address: "UYN332CM6YTIPCT3PRHT52CYILSZLLNI2XJ6XIJYNDQE22PNPPXKSK4POE" },
  { address: "6UURB2M7BBWIPB5PB77NVRAY2RDVK7ZRL7RLU53DMD4T3X7HPJ3NGCP4WU" },
  { address: "PLKOKLXRSCUPXEDJ27Z2PLR5UIQB6DVDY635KCG3ZBFKKDQEPEKWBBBJMI" },
  { address: "X6NI2AEJKOMHQEWGNTJ2FP7VCJPM2IW5NPUHYF4HJGXPABZRQOR5F6C3ZE" },
  { address: "3FYX2XABFADN752JHFOAPIBEI46PTDU6ZTMFEMNOYFCXRZ6ZA7M3GAWDNU" },
  { address: "ICV3S3BLZRPGE3LMJARV3AH7JQD23EXPHVZIOCXWHQKILNG5RPPHPWBMLU" },
  { address: "VOINOTFUHAR3NYQQHRP34DJ6KIJH3SFPCXUIXXU3IKWHHY6DY4WWJP44IM" },
  { address: "WJAMZRISXKHB62R6XMB7REAT5PAO7SQHFLGLSJRP62WDR52FR4PBYBQLGA" },
  { address: "GBVTLLYJC73DDU3XMBWMSZM6UIXWJYUFHAMUT2VNEIKJGJTKGN6FOQCJWU" },
  { address: "GZLNLVUUOCBRKC6RM4A2ZEB6NBNQSULHOKKO45EUDIXPZB5OY5I3MBXNKU" },
  { address: "IN55A64JOE6PZELLU5LNHH5PM5FQ6QINJA3FHYG3C7NQ7FWCQUT7G4WNPM" },
  { address: "LVU2XS3RAKIC5T6LGPRGKQFS67SKMFG47D2OONXC2W67MMNX7M67TQDJPU" },
  { address: "VFR4XCDMAXMDL2EPK5E6XSQOETSXVD5EKIIDNWFWVNMRPC6G4LGH6AKSHY" },
  { address: "GR5TOPPARZWPTHDJI7DZU5ETMMYNVFZEH67SXOWQHQAZQQHYZDJ6FCACZM" },
  { address: "HRBS5SLOFBXXSQRUHBSGH3E3R6PHSHVVUXY65POW3XHT7JOMPJF6T6KJA4" },
  { address: "OAM7BXJNQVBFJVPKK4RTHQMPWQJURF6B6YPXBIV7UV76EMGZUZDPV25F6I" },
  { address: "5GQQRWZ2QSJNBHY76F2SMEDXFUGI2ZXDTHC6ULO5OYO7CRD27IYVC253DI" },
  { address: "HYTD36W54AJNNSCHBNQGD4GQW7VWLV7LEGDCDZYSLT34ZDMRTI3MJ2WGFE" },
  { address: "L6DVTZ23OXM36WUQ3DID7JFS65YVQTFBF667XQQAHY5U3LIZCGIGKKNMGU" },
  { address: "LVIQ6YM6OPAVA77AZNLAXVDX566QDJKRKIEIBXIHDCRK7LSJC3HIGBGHQA" },
  { address: "AAUFU2JX5HVJKIKMEYRM7RIZB6QE3YU3JULCX3SCP3MWXCA3MB7JCRHYHY" },
  { address: "AJ5W4WZUHEP6NCAFJRGP76RUOZPE3TH6X42V43H6Q6HJ6LGE5I3ZPRDN54" },
  { address: "AW33EN3JYYCLMDJVDMMRLZCDETCVXUJBVJW5EHUNGXQW4RMZWWXKDBKKSQ" },
  { address: "CQ3I6XHY6BJIKGIIW5TQ4QTOL2ZRFWYBPA4OMEN7JJUCF55ANJYEYQAY2U" },
  { address: "MC75APUKC4IXFP3B62PJAYGOYFTK7RBM5DD7SABLKTBMPTJLLKWWOFLLXM" },
  { address: "RZEWMEZRILPNDSOSWHAY57SHCVQ57NCFZAO7GVGABZHRZ5XPJ2WD2UBZW4" },
  { address: "SKYNETHBDDJCJ2G32U3RKCDIT7PJRURYIHTF7R5GRKF5MOESBBTZOT75NQ" },
  { address: "THURS2CF2SIXT5UHJDV7OC6TE4OXZWT6W6KCBIKEUHJ26IT3HBKWVJSGUI" },
  { address: "TSSZUO5D7FRP5MLZGZC4STTJGUBMNU2WLP36F64FUCQZXXF45BFKK54XOY" },
  { address: "TZGYXZ6OG5AEF7DH5DFH2A65RH3CVUNOJN36D27MJ5YWV6ZC67DX4HDCIM" },
  { address: "WUPOPX3BD7B7L5R3W6B3XHTWLC3PRW4BIYBDE6LXPXVGBIY3IEIEF5VM5U" },
  { address: "ZU267GRO4ROKJS6K2RYHYEFKUVJJZ64MWIWSUGOLDF7N6C52OECFDAKN2Y" },
  { address: "BSJGVSI6WLAZNB7HGQ4AV7AJ464NX6ADVELKFSLWWF6QD5E6VJTQOKGXGI" },
  { address: "FUINCLE4RQFLIZMPFTEGSDAC6LPO4OVS2QNLGSOIGET7IYD7SCSZUYPUHI" },
  { address: "NORVOI324M6ME7ECXBOXAHWIYKV5EM335OGA7S6KVHBQFXXZ7FYVWIB2T4" },
  { address: "RRZ23GNNKI5CJL2ZCYJBG3PTBEGAFDA6FMVHGCHLSFWKAK2P5SR6MX7TYA" },
  { address: "3WQOUP67VJY6JRZ4X66WS6NZ53XS7U5A5NTQMNRGM7B4XTWHICLEZTWYSU" },
  { address: "6LXSH3M7ORCKFU6EASJKZ5BEOKGLPA3W5FVMR3MOZBQT5ASJXHDWX5BPE4" },
  { address: "XM4ZODSANMIBBY6P6QJO65BCRLNTFTLMLI7UTDO7OLS4N2ABB72WJXI3NE" },
  { address: "7LQYW6WEGLLTFIBQJUOS53E232ER6LQEQUGSZZQSVCLMGMAYRPVCA3YJ5A" },
  { address: "DUJVPL4TKRAHMIS6G7REUYLSBE3IB3XGWB3UZRUNJKAMKM7CJUDAPUBSII" },
  { address: "ZJH2W6EUELASJOUFBVFTROFGP3COVDPZTMBZHWRMTGEJYEHQVGAHMGWMUY" },
  { address: "63VHG2ME45CQC6GSX3GQ2RGWJWYR4FOBPBHNIOS5TYNNTTXCHK2XRJ2DY4" },
  { address: "AKHML3KZ2IZFYUYUG4ZXNMKSYYFMO4KLG7O423GQZE53ACKPTNAKXMM2JE" },
  { address: "JMYMPNO75KC7NER3NQ4YUIA64RM4P3UWFUG3QWXDZM7LY25IVTZ7U4KESQ" },
  { address: "4MD2KSGCSMXMUF6PKDZTYYQJ2M6GI2IMHSELVOGDAKJNXA4DCUBLL77OUU" },
  { address: "QGQ2RNBRVNOTDDFJI76XADZHLWQDRPOZ5X4XP3O2HSVTRVTOQ2M4W5OHPM" },
  { address: "RLXIMVTOYVG4KBXEDJOF4L5V2OPLVAQIIPUGBCUJZSVUVLSD7NWJY6EXVY" },
  { address: "SL7FKCMPOY2SBWHWANY37X26FQZJW67U7ZC2ZA5UK7GAZIXPB3UX6ED2PE" },
  { address: "XMU47TKW2UJOIF3PAMPF5UNJXSXVPUX53F66FHTQJQHMT6EV4FY5VVA6H4" },
  { address: "XQBFLQHVKRCPVGDBVPMW5GKVSTH4B32UCGTAWYPXEBGNPLIFXO5RFSYVOI" },
  { address: "6AIGDKQNOQVUOAZA7XYUZIXUYT534PH6MZKHSEWGR6RPPTJLKGRZEUEWJQ" },
  { address: "FJFKBBY6X5RKZMKGS4R4CTW6SMDRTELNEIRC5NILWMN5BAPUNIGCY3LYWY" },
  { address: "ILEP234YO65JYZTJH4ZEFFBLVTGIRJJNN4GNFNY3SGTEG7OYHWER3ZBX3A" },
  { address: "VCY6QRZVJSFVYEUNTUJI342RHYYEQSFCJ3AQAWX7HAMEKW3FESEI4VCYBE" },
  { address: "4WVIBPQEXHSIKDWCEPVO5PQFEFWY3NTN25RW7ATBRXSRJDGSQYO4KMR2HM" },
  { address: "5XQMZO5XKLQDKVI42XK7EGIWILRVGOB3OBEF26WFAVX6Y4FQWL2KUMXD4Q" },
  { address: "RCTDIDXBAS2TIAYQZOFJTCIXD5HRANYJH2CBBMEPSYQ37IZZOHTZNDESQY" },
  { address: "XTAC5MW7A3DJHYM3E4GLE5TGSG2NVMXNDCDRZD5TB6CFWDHNJ26YNBPDZQ" },
  { address: "HEEUDCJALG33PZ5R3QL2JBJFOWH4CBXYDHK4O4E3A2EXYMUMQGORT6FMGE" },
  { address: "WAUEKBMVVAZPRPJCAG7XFBVQY3UDMMY2IBWR2G3YUV2FXSMGEGYWDFRCBI" },
  { address: "XQDW6KXZAMOQYXGZL6ENJPANLQZQZ4RLHDWGGXX3P4ALXJGD2J7TCDFA4Y" },
  { address: "4NDEJKMLZEY276DZSHT2WD67L5QQE2ZHX2UQAZ2N5N2HMLHDCNOPQAUM2Y" },
  { address: "I5TNYQUKY3I3O2GZPVWJ3VPUQ2EX3JOMQXXYWW5JFIEPISWKWLM5CVQQLY" },
  { address: "WICRYIUTNOYMAUSUBRAQVZTBCRPWMJ4HGC74R5KZCDFDLHCGCG4NBDSYJA" },
  { address: "5KIIDNMPUPTY5TMDOIR4W7IKRK7IDIYUTLUVZKAXUFFWYZRZXLXVSZNWKM" },
  { address: "7PFIOEFDGZKKAIZCTQKN6ATYN5T5ZJJXSTYA2Q62DMQMTG46MMC2Y2MTAI" },
  { address: "BEEFEWNPV72AOTW6GG33HEIHEHTWPDR7KWMAK4ARNSD2MEJM4K526UEHY4" },
  { address: "C5NZ5SNL5EMOEVKFW3DS3DBG3FNMIYJAJY3U4I5SRCOXHGY33ML3TGHD24" },
  { address: "CUY4TINI2DHV333UUNGDMVD23RDY7LMGEB2ZP364OWVLAWY5UGXR53OVOI" },
  { address: "S4HNVCPZJLTZ5AQWLH3ZTLXMPPSKRCVA5WSYFAYXOSOBFFG7HJYROWL364" },
  { address: "VOIBTFTHE2BJEPCWGBCXZJ2F3TGW4KKPUCWHMOK2PI7LEBV4EBSIB2OWX4" },
  { address: "I7NF5EWAUHZGFGVR4BNWST6DKWXRFWMJENGC3THJOXNTA6CB7SXAZENWTY" },
  { address: "QGVG4QN2C2Q3L7GQFUBC26AGHQTGBX4F4AE6DZEHW4HNSZARZ3F3LUQOBE" },
  { address: "HGNP3L6KZ3VK7BPTUIBK3APYQYSO4AZ2LWXA2LUZCRFDQC6K4LI7UWC2N4" },
  { address: "HJKZF4CUQRFQUUHR2O3YFBYKCCQIDU6A3JGBNKMAPWQ65LI2HUSYKC7EBM" },
  { address: "KCBKXMOAYSUFPBQUYTGJTIGCYIFXZC2FQDZ3HRXUZNHRUDQDBKWYP5Z4OM" },
  { address: "RD3DLSSKHHLUPP6YLID6HHDNINMVVNADTIPSA6SH3Z67DHLCKBOPZJMIQE" },
  { address: "XCVLOA6QE7R26EY7PPAOP4HQPTL372ZSDTY5METXGXHWFBNKQDQXHWHA7A" },
  { address: "AE3K4SWDR2N2GUXS2ZKD6TYSOLLGEAJF4A4TL6RRQYQUFS4GBSCRU7NDFI" },
  { address: "GLOSSYXX5RTAPRAKN4VOMO3BWPKDXMRQ4FJO6DNEIF7BZC6W324VDMR5CY" },
  { address: "LBAMBLVEQTKMLUYIOHZR6USWVFWAZ477JMLEJNBVMG4KV5BYFXTTQASBNI" },
  { address: "RAYXZ54BJIFVLCARBGOJ64ZRM3NJ3GOYVSZHRMYAZXNM6F2L4VS6R573EE" },
  { address: "VZK3VTY767AKITXFYKANANWQPEI4BQBRW43XRMTKPYHCVORAZAD5LJJEKM" },
  { address: "5UD66TOXYWBUGTF3RECYHS723QC7NMHGAXBAVFWTZPIEBTDNHOLGTCHWFI" },
  { address: "ELMDY3QPR4T7ZN7RJMKKWNNWVVRU2OMDCJY3YSCLTLOVVNPSTZFRTWAJRE" },
  { address: "6UGKB7P6ZX6JEARQHCPZPEERODXDOGUHMXQCOAU6MA3WN4JSZQ5EDUCV4Q" },
  { address: "COOU4FUQAC637C6YCWBYOMSPJXCK25UI6PD3RQNHAIQEKOFTQBIFPZ4TVY" },
  { address: "O7RPYIZ6M4R22TKINZSUZTT2MUJU2SA7FGQCZQ4CXCTU65BG6FCVG6FUPM" },
  { address: "AUSTSGSNXEGTUD3TIO7ORZADRB5BPAMHKMHQXGLWONMSJNZEP42XCHMVOI" },
  { address: "GUWJ7FNTYFF4W4JOICVJH3YTJZIILNOV2J34B5ISWKX2T5YAOCP6JBL4Z4" },
  { address: "UQXYGA6ULSAGYR5JJ7BMXYDU7RNGAEHXM2QSHDQGNNPIZ7MJZ3HLKVJ4KU" },
  { address: "MBBDIPQQI5HJRFRHZ6AXPVVEPNDQZQXAFCYIZTRVWISERYRMPZ4NSPX5R4" },
  { address: "T5MNVAAN26QZUHME7CXW3MG4QK5DV6CZBDUAXIHUKSCGP5775PSNDHFJYY" },
  { address: "RIM6BZBYKDR5A4BAGRO2VIKNYXFR7XV3ESUNKS4F4EOUVCDJP7JYGUGQ2A" },
  { address: "ESHADSBWVGEWO3JTRRXA4RAVZ6L5A4SSZOTBDHAWQCXATYCIQGQYVIFVPY" },
  { address: "KQSGM2T2RO45NABKO6J7OZJXP2KWOENILIODDSIHZGI7AWMY6N4OHL7BCU" },
  { address: "NVZ4JBXBFOVR3R5XSKYGAUNXHEJ5V6TAYYFDGCMMV6RINWSQBJ5WSGEOMA" },
  { address: "PEACET4BV4AIUMZT2EHXPI5PR6NT6HKPA2FNLOMS2NILIUKRPTYAGVG7IQ" },
  { address: "REH5VX6LVS22T2ZIR6ZAWOR2X2ZLWJVG3TISA5P3PUDL2PTZRGVBAR7YSE" },
  { address: "TEISU4GTMXFEDOQLMAQZHFWBWANXRGAG2KTPJCFKZOTK47FAR3BUFFN4XM" },
  { address: "7PG2OFK3UCZ7WD4EIBDRK5W4GMXGRPM37JCFSXK2WXQRXIN53TYVAAFXWM" },
  { address: "TOCE6RGN5JBVTY56L6ADTA2HA6ZFTFHF35MFNXHWXW5NZRBPHVJ7B3VRDI" },
  { address: "45LFMHUEJ4VOUSYARMLWF5OMVCRDWYIOGUPUO4DB6HK2CKPIOX2HCQSIUU" },
  { address: "MUTS5EI5IYSNNM2QDLNPBJ2NNRSRRMUC4S6OTCXM3JZMHUAJOSJT6YUKRA" },
  { address: "NZ4M43MHTTWV4HBG6YZDAFRXO7TEEUA5NF4GYBKI64QHWV2F6XH3Y54WP4" },
  { address: "JVQ6GHU6SXD4LSGT2CNOM2VUIUVV2ZZCGNU3Y7CORZU6REJSS6Q6MQKOWA" },
  { address: "4IIYAT5UPFR6NCN64XXSDMCFOCJQEZNXUCIT5ZOQ5HPDWVIULXMTSZDZEE" },
  { address: "6YDLNUHUR32S4VBLVD5JCB7PD5VVVJJQVHG7D7AHQ7QBHDZFFKEPCG3DXA" },
  { address: "CLN2KRTZNH3N34G2232ZGGHRP7L2LV2INM55LTT77TPKQX6RQRC3PSX55A" },
  { address: "547PJL7VX6BKTJJ27BIG2JDLLKBC77EEIFNIKQ4BX34KL3HHAXOPSFF5VE" },
  { address: "G7YV23APCBLYTMCN55E3P7WWT2MKMYJQYLB6HNLOCJDHM67WF25ZYIGU6E" },
  { address: "HOQPE5J6NYVC452ROKG2RB4MOTVH4KXCCDNLAB6O3LEQZGYBLEITWJ5GEI" },
  { address: "6T4DBKTOVW57RNTH32N3AS6NOCOBZI232FRE4GHYWTKLER57BTDUM6FREI" },
  { address: "PINWUFIGWV7IK2YGC2KP4TOVQA2UMWM5GSTIKG5MHJUSPJ5DCHBNSPXJKE" },
  { address: "MUTN56X3MPLJWR6F5IJ3DR77RKMQZUWIDR4GPXMKT5SWSXZMTO2QHN7RJI" },
  { address: "BSVFQL2I7YZWVRQ5THOPTXZXPUYOMYPXUGJUQLVZGQEEPJ27EUZCPEANDI" },
  { address: "IITEWKELRQFB6VCIH4RQ6J6WEMSLPLWP4QZIB4FLJOFQ66PFP2QQ3SZNPI" },
  { address: "ORORC4PHV2IE2QMWMC3UN6WKJSBYNN4JGWV47FQVWKDFPEZYIS5PEDZZIA" },
  { address: "IXEW3VZ3BZH7WETW2SUCM6IJO42S4JNAFMJTXNCJUUSBAPQOBGVMT76QPI" },
  { address: "R67DR73V3XD6LRROPZTXIGEVK3PDUIVXOK2SQNLVJYISCY6SBLVGPRTBW4" },
  { address: "3ZJJ56GQ7WKIGFTCMZQ6RSQMI5CO3UQMDDUUT6C7HAXKX3W4NPVAER3FIY" },
  { address: "ZHP62GN33O7LM4LUA5WRPM6CAZIO2R445UYITEU4OFMB6GMM7ABP54N6VA" },
  { address: "KKV5EDLPX5KOXS36EMEG5UHODPWCCFSOTMLYI5CAI5FMT2AEL3Q2S4FBOE" },
  { address: "OUGIJ4EEKCI5ZVHTJ5IXO6DDB7PLENENHUKDKPWDNYTMUZYUJOYB57JORI" },
  { address: "DHRHWRHFGTZPC7E3O7OIBI5TWUWV6ZGSMEBIEKKQQBACHBZYV5VJDLSTN4" },
  { address: "MUTVKVLM6ONY6WBLUHCVBCHG2KDVERXOXVEIRJG2UDREN2HUOZTT5FVBQE" },
  { address: "TBKH6I4TIKO6OV35BBFB74SGPUGGPZ7QINKPNLSVG24OR5IUKHDIXHFDGM" },
  { address: "VFKNUICBZAWC6SEUMJLHYOTXZOB74JPFC6VP2ED2MLLPZI64N3RXPHYV5Q" },
  { address: "DCB3QC2V5KA3AAYGHXNV7E32J4UDP5Z7HVQTBCRYWYTKOUUD7PO5UJVZ5E" },
  { address: "HJNYZYPXZWQFFB4ODJE64BJPVTP3G2TNEWE7H5FHXFD5YJWYQKIJFJ5HNE" },
  { address: "TI45TN6QZFQQGKB5EVX7H5H4YW65R2Z5YPCTPMJTQT5CZZGCQT7MULOC7Q" },
  { address: "XAFITVEYRC475CMIFAMGA76SO3MLYTKYEFB5HD5MPQUYJRE35CQMF43HWU" },
  { address: "6X5PCGELDAF2A7HL2D4Y6LXRP5VGOLC5FP4RLSR2FFNONYZGJA3URXXNSA" },
  { address: "DKSUEYTIWUL27WLAV5Y4WFDPSWMYB3MRBQAWIOVFQCG3LOKJL6YHOFIO3U" },
  { address: "2DMFXPPEGTMGIWFOVTBM2RLMR6DEGZU36QWQZ42CEK4FUGSIVV54DMZQRQ" },
  { address: "GOJFYNMTLD65D3T42MY7DK6D3HFUTNV5LNAKEYIHZRG5JMCQYDVLEGH5QI" },
  { address: "SXAMXMRSSZXITSJL7PX3ILB3LQCHJGNT4S56XLHMBLYBH6TZ52OBAMD3R4" },
  { address: "MUTIDPE65RE53LMJP2LNP46Y2BHBONBRY5K67NGMDV6CPQXCEKII6OOSL4" },
  { address: "7QQUNQJ6UZUQTLZFVDEB7NQGHVS73E5S2AMUKQNPIENHC7MHMNKNFVGSE4" },
  { address: "FC4MBLUFVOETHBKTDUDIND6AGZ2MAYIGRSWLOVQ44UMEFCG56TXSSRBYRY" },
  { address: "3RWW7BCSMPMOIFQXVQMOYOTOO7OKKZ2SXHNKRPKJ657PJ5NS666KBVPNPM" },
  { address: "NIZN5HCZXODMZTCQARTP6NVRIN55VSHEACOKESFRTMAVLVXG6Y45XKFHFQ" },
  { address: "7MWTNAHW4G67TFWOAQDRRJWVTV7XRPQDXLSPC5KHAZTBOL5Z7ULUYXW46E" },
  { address: "JCTHE7EGML57GBSFY4GCVFNMLCE55FZ7NEG747KPBCRSJGVCZ6BWJJ5P6I" },
  { address: "MAKKE7FC2R3BM4EMU5P7NMDZWKS4EBWJETNDAV3OBETWDH5RXSG5XM6ABA" },
  { address: "7V2WR2NL2POCFGMQBQ5Y375ABLUCMMU6DTMDQK22D4CLR3PBO25D6R55CA" },
  { address: "UFKUN4LKYDKH4GSKTNUYSWK2ZQ7VH6K7WSSKAXESQZMCR6S5A3BHYCKZQM" },
  { address: "MSWW5DDV5OE3IKHOR5KTTYPDSTRUXIYL3BJL4ZDS6YV2KWF5SUOOVA6W6Q" },
  { address: "AXP5KBMZJD6KRAVESZFZJRWNG2B62MRUHWNK7IEIKMTZYZY3UUAJX5UFXI" },
  { address: "KSJCRGIZREU7Z63THWCI43W7PTF3XGOHPDPVKXIJPUYX56HCLSAZPSEOKE" },
  { address: "37WPS6HRJQJGGWKWXW64LOASFCLHWSCGPAOGII3FC5GB65WAYIV4NIJL64" },
  { address: "K7UISBCIZEMQAYXWPOYVL6FDF46XRA6GYGW7E2RIROYTAT5XZ3HBUGQCSU" },
  { address: "FMZOL7NMTIAIEQBNRMWQD5FSK7A6MDVCIPMXLFJ6DN3TC3NXF4ZPAYSI4I" },
  { address: "N6AHTV6CXJZSUHU6VBZOT37ATLUIGR3IBBBPQHCFJSH5WOOAJVJDOGPSJM" },
  { address: "SGWIY4Z7IL7UHAVIIMVPZSOZMQPYFZRD3JDVIFNR4GHRZJTEACVAU6PXTQ" },
  { address: "AGTEZRQMACMVQBVLXFTNVY5SSWQ4WBUEV4VJKEYIXRAVFODXCKLY74ZOQE" },
  { address: "CAPLHTQEZTJKJT64G5326IHHEHISYEYHDH44VR34YP3OUJ2O56L6TSONMA" },
  { address: "GWARQ5CANHEBHDBIWBQ7YIEGMHJ6VYW57WUETNBMWEBKC3724HMH6IICI4" },
  { address: "HCB67DRXMDU5SBQOFGQREW3QWKEM5UFJNPMGCYJMNCIW4K5LA2WQPCRF2E" },
  { address: "POPOO6QSUX2UTF4XCRY7WHHLSQTRDRTYIE7YW2DQ2KPGLQRAA7ZTCGLET4" },
  { address: "G7ML6KAL4IOCPSXJHN757R2Z7BW4OGDFQOCSCHFGGVZAREGP334SG6ZHQU" },
  { address: "HIAQW5UM36UFYYDDKJWZCXDAZ3O7KQOQJ6PB55X46MABVQBKJA73NBY4FM" },
  { address: "BSLBJH3F7S3URBY2UJD3FPKPVXWJUDXHQTNWGOLRD3JPDSCKPOVXY7TLSE" },
  { address: "HIKZJUQVGAWIWFBKNH2YQ2TE7QU6TBHGCELAU46OPHMTSKQQMWVMKEDE6A" },
  { address: "MSBBB3E6NG3F4A34NULS3XL47NYC55XXRNIFOXIF5NFIEUCDEISEIPAASQ" },
  { address: "DHHGBWHIFFIWOJIBDSO4BL2P77XYLETSF3ZG5YX7RQ73SGTUJC2SWYOYZE" },
  { address: "7RB7URC3TAEVOPUFIGXNTOV2525ULVCGSZ35DHTGMMBZI7XAIIUWVI5LOY" },
  { address: "NJ7REXMPDMROFOJM5BGI2GY5BQ5WFCY2TPC65BAP3JVJXJVYWVLX5ZCQGI" },
  { address: "XQC3VWZIHUYZPP3HLRWWFCSHW7J5X4AJOWENHK27PY4N5CFHLWQSMN63J4" },
  { address: "JAAEBTA3R4CP5VGNGMLLQ57DLCQ2M5LKNGA3NI5FIHFQQWPV4E55NAK37E" },
  { address: "ZVFJODKUHQCSFVGRJIF3CSU2AAU2AM56SQPIY24ODHP3ZQFVGPUPDCAFGQ" },
  { address: "G2OYAUKAEINBZ4YHUDYDDARZY3PXE7TBHN37ACIXHUPVIYWRHALO2I326E" },
  { address: "KM76LLMPQMQMOOAJ22OMXGA7Y4ACRXIX3Y4PRLSBV6JAAKJFEGJQOMDLEI" },
  { address: "U7NDSIXZHZU4JQ2S22DVGLK7K24KTENUS7LR5XT3KHJC2FRKCVGYCLGSPQ" },
  { address: "X6RULNCHG76HAHHOIMOVX5VO2VSGHEUEWKAQCJNVCKLDJZ5F5EK57YCDEY" },
  { address: "CDNLM2BPHVPZYLG4WRFOZHJZPUHK53LQPOMEFNN23L7PXUDDCYM243IESE" },
  { address: "OOEDQF6YL44JOIFBDXWVNREBXQ4IL53JMTA32R66S7GLKEP5WC4CL4SFLE" },
  { address: "YZAVCSLN7TWA3MNXHSPCGI2UBACDFVCTS6WMPNTBAKVMBBNPCUOVS2SKSA" },
  { address: "N4QNRSEJ6BVLY7RRES2AFLYH3OCJQRZDZYKXEZWZWSVZHAOHY7MI7P6KPE" },
  { address: "6D7KNVZAJXA525B7M6OIGPKQRV5V3TJANKJDPCGJM5CCTFRPIU6EOVNDGM" },
  { address: "JAXTSTR5ZSGULUUA6UPLGJ7TXMPYDXGWPXZH4WE4TSGO3NDEBCKJ3R7HPI" },
  { address: "6KRT3WYH6YU2GSXKNU4J4DINEQRQ7G5F3TSVJ72MJCJ3DB3ONROKYZW35Q" },
  { address: "EVAY273WRCOZEO6KZDAFB2JS3VHMEBQWGUUBNCZMR7D766FZPTUOKAXQ6Q" },
  { address: "EYKYEKP7CIEOWSGGD7VZRB26ZAQ2WJ4W7RNUY7SPFMPCDB4FLE3H4HIJQY" },
  { address: "SRFARKN5FMO7BI37VHUMKC7IQO6PLIE7UPJAJ3NBLER5RZZJ5LEHCUWFLI" },
  { address: "L5V2I7WAZ2EXNUTY2E7Y72OBTAXWB6YOQQ5JSYSMJ45OKLARJIKITO5NR4" },
  { address: "HEYXMPYMYFJLWU3MSFFWDZE7T4DUMR26LL6ZFJFWCQHQWQ3K33UBJPS5SE" },
  { address: "XU6NXRVJMJMHVWCC77AOKK43ITG6YSMZB4Q74VUNYFQ27ZNJJHIYI5R7XE" },
  { address: "K6LHZJ37SPRTU57CLRCU5IGKSMHHIKR2N3T3U2EEPLDOL3KDTNL5YR4PQI" },
  { address: "CJGG3RLQUMTUBUKIPD7MYZIFT5JOI4ZAXDTCX5DM4DAZ4JN6MLGFR4GQTA" },
  { address: "THKCRZWDWNRR6EAD6OLRMCJ2EDJJTA2N4LIR2J6K4ZNYICB5LM7VOGK54I" },
  { address: "6PICJA7JBIWDAJYLWIMZTYBS62CJHGO6W4KJ2XC3W7RF5UHEJAUZUJSHWE" },
  { address: "C6YYUZ5GKITPYG5GDFYLHBLBEIFRCNCK42I36TVNNSJAS2YD2RL6FCJ3XQ" },
  { address: "EOMRKBSH2SY5WVXF2UCBXS5LVUH3ZIJTSYMMJMZA2C2LBFEVORHVWJD3KQ" },
  { address: "LENSGH2LLBKUFJFE7RHERTGTKLZQAUZDNJHDCNHWVYWV2RFPETU72PMOEM" },
  { address: "UQ4QQ5ZD3TQKHJJERF4FSRWO6234CZM53VO6J3PYFQTPE3LGOGABOUNZIY" },
  { address: "LJAD4A7NQ5VNK3SU4LOTUBSWWCK4CZKGP5DF35SZWT65SEGY3FSQVRZPOY" },
  { address: "5LSITMKAKHKO3LG5HPJTF5OXYYCYVBNTISAHPSFXLKI34QYJZKA4EHXEDQ" },
  { address: "K6HQKB3CN4MA2ZEUXIOMGQ2HRDTRVJNA3VLLJVTEEBAMAQKALL4EFLD2HE" },
  { address: "6PHC3CRGRLPLSMI7PXWSG6GH4OIVPZPUGQRCTXS5XA7ZFPSWWFMZCNP7HA" },
  { address: "2DFT2YWDJXQKTP4AFHNKOATBJ6VI2KKVKNCKV4W62AHXFDO4DZWBWINCQE" },
  { address: "OEFMORUPNZUVRELNRYM3NWYLTHVRYMYBTJJLDD2UN4KLU4S5IFAWJ3S5XY" },
  { address: "ONLRMNGDYC6PQ2RG5DUQVEMOVJOLWO5BJJ5FSO44GK3LF3WFV3ES5N5UFU" },
  { address: "C5SL6VMO6ATOKRWTD6TQTMDYBO3U4HKJ4WNFRUONTGFVL26LJFQRKOUKIU" },
  { address: "JDC7ABGPYVRQ4ZFXGRFAONGFXGVVYI3DN2FLOM3W26EVVVO7LPC3QCCONM" },
  { address: "FJ5VLTO3SM4UU6ZGQSNH2Y2KET5HCV6EYAFVCOMJSH7JUOYN4C65XKADFY" },
  { address: "OV5BLRS7GNUE6SEIOKVPXCBYDCHKDDVKSRNUZIDUSL5U6BIQJIIH7BF2GA" },
  { address: "OQ72P2FYDEJEFIEI6JMFUUE3ZHM5FGJGVUHCEVNJMOMXZ5TRNXHFMCXPEY" },
  { address: "FFPRTQVQYVPYEJVJ4HH6S4QBGR5Q2OKZKF672NCNNPUZPYZDH3KRDHHMPQ" },
  { address: "DONYNZSF2B6JMTPHLDK3ETVUQ4JIZNS45SJAGNMQWMEHPH5VSAQVSWK2SQ" },
  { address: "DBWU2IEHYZPFZ4JZN3CAO4D43MV2RSBOEIER6T4UXHMZTLH3T22GZTSKZU" },
  { address: "MI4YM5YV55E6UWU6K7IAVY5MKSYHCAXIV4Q6C5KSJJH7DTQIBKXO6XETUI" },
  { address: "NGQSFYI6GNY3QH3WAJFGJF75UVO373E7Y6JPMYRQBEAQU7M5QMND62353I" },
  { address: "OKVX36ELHUWWHTADD4D2H2UNGZNOUYFV446HGAKJNIA5LWE6XIV3QWFJOU" },
  { address: "XGZNOT34UQY2M6OY443ETTSXHJ4ZKXMO4U5745ESVOPC7Y3PDJL3SYFUYA" },
  { address: "YLWIMPK35L7FTIFM5GRIT4LIAVFPYMDUVVDMEKBOJ2HYGXGHCHLKFPPMHA" },
  { address: "DO3DQ3WGMMNFMOL2AY67DVG4QTJRE3NWLJ7DQ24UONPZCYIDXQTNH52RSY" },
  { address: "XNJRT6S4OJAROTS5GQOHG54DTI3U5F6O2TXLWHYR6OF7QAQIRUAXUN4IFI" },
  { address: "HORBUDRCMIJYOV7POWG5MDWOPBAKMGIYZEESPJQO4OOBU7O3EB7IHOZELE" },
  { address: "JY36JTHJDV2EJKGNSO6EI6CTD56HMT3EYAPVJHAQTRVGG7S3SLAH2LWGPU" },
  { address: "RPAPIUCL47DCJWH7GP5V3CV7PYHQLDRWSPWJSBFRWTPHDJEH4W34W5DPCM" },
  { address: "LTBU6CVYR42MFDJ7KMEIGVPZQER3T6AOQY7AFYDWKMKRC5POGKY2RWZ4KU" },
  { address: "Q7F4TY7YT7U7YH3C4T45TYAR3OLYHHXYHS3AYNGIK54AKR4BDYSLND4GFU" },
  { address: "QIRKEFOU6M7SH2VJXX5EIV2VGHCXPOJXAW7WLNR7U6KCQQOAVDYCW5D7M4" },
  { address: "AQ53K6B4SAJ2IIBIE6H452KKKX37H5M2DRICE7YHNYGEBCCNFWMKAV3DKA" },
  { address: "R3XDGN65S3DF6L55PU3YGZJ4P6AYWSBQETDJ7TLJCYLBTBAWAEP5Z4OVLE" },
  { address: "YG72HPRJH47UM7KGRIDPI3N3CRHVISBQXOSMDULQ5N4HF5AWP6P6RYLA2M" },
  { address: "VDEVK22RGTKEE4EVKRTWVBPBPBB3IOFGO25RQCKDZCLZMRBKFBNNECRDLI" },
  { address: "BT4GYQVOYOAGPZ5Q3IC6Q5SQTUL43SDYMHLJGNE626N3PQAM5WZJWGH6D4" },
  { address: "IT7NQKFAKCGGSDPGH4W7YNZRXQSZ4WTVOSCOFD5VUT3ZESZJS5CPTVTTPM" },
  { address: "LOF4NPATKA7V6ZV5VQN3NPI5C5C6SEGY4SV3Y7KORY4IAATI6H2BAPVDQA" },
  { address: "GXPFOM4AMADVEF54HB25U5M4E4S6CK7DOCKVBSH6LGGQ53BS5HIK35MC7M" },
  { address: "QAJJWRYIKZNPWEYMU3L4CSOSY22T7BAY72XM2GWHIRF4BHHGS5YG4SNNAA" },
  { address: "UQCS4AMRB56FPP72NJCYJFZYD6WW2VCTA3UASSYF3OEVHCWFNEVG4TFJV4" },
  { address: "FZPGANXMQIHVSWYN6ZXS63QO5A5X4LEYCB4O52IP37HR6LY5RJY6FRC3LA" },
  { address: "RPU2CFEZD54CMFWLLSBJV6JX7PWT7GLN6CVXPI2DJPDHBFNRF6SDSWAEZI" },
  { address: "SIRA35DNRZ7LQBG2GMRACLBSIAOPDW4SNB2EHYP4OVNRONDUJ7VMOXGYIU" },
  { address: "SS5CMWWAJOXEFNN5O6X675VSHK56ZHFDBOWGRRG3E4RI7V3IHICEYNMONE" },
  { address: "HWLNRAUWPVKGHL6W5QW3UURD2PIOLPKRPUJNVQ4GFHNQM4WWVRUUIGVBLA" },
  { address: "VRC33XHHBZOTX6AB6HDRNUF5NS5WVQRFVDKHT3VNE3CYUIV6CBKPY3LZ6Y" },
  { address: "ITHWPYAMDJR62UOPFHDQUQACFTPXF7APAO5TBVKZY63HSNCDSPIQFOH4ZE" },
  { address: "PBB4QJB4FCLUDKW3HNH5NJ3URGWOAL7BBX76KT7LS7VTKK55QMHBF7WRGE" },
  { address: "LYGCD65BGU6Z24ZKCVDOO47XREHBFN3N5QA5WIDTURUEDO4HUWLGMZELPU" },
  { address: "MCVGTFNOMM4R5VJ2FDMVI7A5WGITFBIQZZHLAQH4Z3XTQF7LWG3ELJ3ILA" },
  { address: "VKOJPM2GKDZ5PAS6C62P26FHCCG25AYTZNKQ5IKK37MN3L3443VPZSRUME" },
  { address: "7LFKAEPD2PKTTEK6OKDY3KBQFYZ5SBH6NXSEP3QOYXSJW4ZT524NOTD2LA" },
  { address: "DYKW6EWBHT5NRREOXI6DBAVP4DWYHV62LYWP7E7GFABQKKHGA3EAIORO5E" },
  { address: "GYF5STIFKB5SO4C7EQQFNN2MCB7UQEXCOEIRWOKXIMXW2BUAS4IKK74CYE" },
  { address: "CQPPELH6PTYHVCYU5GZRAA7AEAP3MEANICAQAOUBTLCKTEIWK7642RWV3Y" },
  { address: "JCV6YHAGDNFHSHWFXNVVYZYDV3AB5MBLRQ7QCO7Y2HYWHANSEKSXA7YBOA" },
  { address: "LPHT4A2DTKDDA6FIRTI22HZZCJKM7WA4KWL4CLLOB62G7PAPMYLRUUUMHU" },
  { address: "PAIBSSW4TU723BAVDUN6KH5N62BYLJKVSRXCTQZ23NKTS7XPLAM5K4BVUA" },
  { address: "2LA6B6WD3TCVLP7CKG2FK6FOHMJPYAXFJB2RZKXNJZSIAYREZWSRJT376M" },
  { address: "GSOKVSVSL6HQYLEIOI3L7KDFWJCNQPLBOM2JJL7TW7CX2SEOCPDWVESF4I" },
  { address: "RE3OKDIXCNED3J7WJUVGSDUIJQLRXNC4YDUNZMMOBDCBRJMTZWJN2DWHPQ" },
  { address: "VXKW5Z7NMJTYOSGNJAICCSGRZPVPWW5DSJWGXKH7YFGOXEPS6BAC57O6IQ" },
  { address: "FCLXYYVGYFSFDCMPOJPZNNI3U3SOJJA42HR7D4W5D4QPZUKKT2JK2B6L44" },
  { address: "HB2ZD7JKVM5NDAD4I4QZZAVYARX6SUCR5D5OYMP2ZCVDKX25THLO26MDQY" },
  { address: "PECUMUFJC2PTAEFH5P6JE3IECOOGYCP6GR4EQSW2XPSUCIS3EIKIYTSMXU" },
  { address: "2LYYDDYVMXUXLAS44WGJTDLH7H6YTI5KC76ZBLIMOGF6F5A2BPBJPJE4QE" },
  { address: "QTIOZHOSHK6WSKASWKSDBLAO7EBHCHRFB673EBJV32LNQ2IM3NZBIWFCOQ" },
  { address: "VEUDN5ZU7GASCFE4RGDZ4V23XOWPUO3ZFQTW27TBSCBAXYG6TY6QM4QDJM" },
  { address: "WOFJSEQCSH6D2GGTU7AM73TAZHDUUQHA4DF3BMBXEVXOTCUPI3XC4N6UL4" },
  { address: "KLGULEOCWWU2JY7W6K3DSSLJEYDBNQYWZUAT5NEHFFBYOWKDOT63MCOU7Q" },
  { address: "4GABP64LRW5XTM3ONCDETM64SRHJ3WDTXLX3TOE4KVPMX6CEX4BR44TSJY" },
  { address: "57ZBVPT7EXD4HJSW5GR5HLJFTZCQO6LKMO7A2DMMHT42HUH6XPFDWJSM6M" },
  { address: "E5GUVQTBWA22XJWCIIPMET4VZPNHOZUB2E3VTRYZOKOG3FIWBCUPL6IFYM" },
  { address: "KVB5ZWT6Q4JIDKRG334J526C64LHASL4PGFSS23JJQQMGEOUPUROAGOPSI" },
  { address: "NAH74TPCGDNVKEKDBOWAAEUWWJSROZF3MXQBR2EHT5AXYDBWMSWOXDAFOY" },
  { address: "2TCUW2NCFV3K6INURZPLB5FEUB4CUBGQPJLC6II7PXEUTB7IKS4YEEBDH4" },
  { address: "BWJZIO7AMGDVJW35MCRDV5WKOKC3FD7W4L4KTVZJUMWR573PVOSQAQ3G3M" },
  { address: "G25NEYJ2DS53EGQGDQKOPDHZH7TRR67SVCHXZMK3SQ7GUJDDEJFJW5UHEI" },
  { address: "IVNJEDRZLZMAOYCUJ6Y7YVXJQ7BSQEMUVUNJEXMWWTXTB2SU6SLX6FFMJA" },
  { address: "LEHULVHXY3I7QPNYT4HRI5AZ3Y7O54FTGC4NVHGNIIVVNIXYLWSHGFWXY4" },
  { address: "TJ6RGKPXD3UAXSIFYOFLY4FAXQN25ONHYTDHB7VAIJ3O62ZFTW7YWDIMXM" },
  { address: "VH5MOPCVTDM4DHNGPB2LZPOEE2XWGQPGIQZKLPQKLC6VPWXALLEWXV2JOQ" },
  { address: "Z4BQF2QNZYLDTOKCMLWRM6MOIZDQRL56QSN6CO7742KM5DYZQQXYUCUKEU" },
  { address: "QKHXEAXOC3WO72JJS4N4KWVVBNOXNXVUTRQQSURSKJ2KRWMELXSVJ3VXEI" },
  { address: "ZGWHSEHORXD2UMOEMHB43IZ5L3O6MBQY4RQ5XC5H5DBEVMI3HTCNHB6QBM" },
  { address: "LVDOKMWOSEIXVCOONSVMO7X6XWGZH37SJGHW466DIKSWMT3UVXO7NDPCPQ" },
  { address: "TCXME7MFC4OHYMUA2S4AEZKH5ZSR45I5F5R2ZX34ELURAUBKDE63DRBYJI" },
  { address: "HMOSYXQG52CCNGJBRBD23EX3WUF7VC26LA4NPZG4V5KSU367GXI6JOMYRI" },
  { address: "5OD67F3QHNVGMR4DRZLFOQTK37UCRR4GOW4WX345S4HDNNGDVZYTF25Q5I" },
  { address: "CAE7QD42MPYZOPWPKCEHFQNXJLWFOT3WNB4XY73AHK5VLXV7ABNHVRHGZE" },
  { address: "JM23RMS2S6ZZUYFRTJ5QG4675ZULRFPNIGUBINWGPFAHIZYQ4SMQG63ODU" },
  { address: "5OW2RJPJKZIIOKZCOS4O4V34HFNKTH53T44JDMGPJ24XQQ2USR4OJERW4U" },
  { address: "JXY4JBJQHAZMF72UKY6S7PK2M46XIRDFGQMMYBMHBKA4OJ56EEAGHAGCJI" },
  { address: "4PAGQEWU6TNEE2RWFTRC6IU3DBR5ZGQOR3PKZLQQUFDVEMDALCFTHFYVBY" },
  { address: "ACP4CXBXEVEYH6LKZRFWF2HG3FEESIWJWTYBSTQELR7K46G3IHYFAPFX3E" },
  { address: "4LQQ23UEAKSPHWQZPQTOZUCLPFBH2KGE2LQ5MJSZOL4SDOBHKWOUQVLR5Y" },
  { address: "FYTATNF323OIPS3DZX4OION4M2YDPH2A77QDRNRLOJFN4HNKDGGWN7AD2E" },
  { address: "ORKHF23L5BLXQG5NNB4T2LWICUL5VJOZTYIPFNE4PY6UOPDWFA7YVARHVU" },
  { address: "PKJ6ZJBF4IZHVOAPFMJSXUAN2AU43NADPD5GM57RBFS2UYXQZ44E7EEN6E" },
  { address: "VIHXEFHIWKDIVQYUJDTQ6O6WRUN6AWHAUWQHFTV3FUEA7YVCWNP6GL36N4" },
  { address: "A43Y3CMPV2IA3SIAP5LFX5QUSSAFNAQEQIXCRKHUD2OQDJNYPUPOL7FIUE" },
  { address: "RDGX646QTJDIYJNH26446OGYE74IYRPSYXSTEE7R2D4ZRZ5INF6CPZKXWM" },
  { address: "HYPNFBY2GH7RPNUB37BVAD4BXYLJMPDGGHVFZBYQZ73EMN3KIQ3CRBHQQA" },
  { address: "RADFLXNONHO5UDAMIB3UAAQULZPBZJU3CVAZU32TRBQZADLJQ42GB45KA4" },
  { address: "BSCKOQ4EPV46VT6JZYQTORTRCSD57DCMAX5JJCSOTPVYJORD5RLGGLQZSA" },
  { address: "5NWUM4HQEM37T3MUS7PFZXOIW5I2GQZUFDFHV5CITXG2PTKVNVJP6DVGWU" },
  { address: "PA2VXJTYMA6DNRBBDQ2BKIETHZMEUR4ASH7NSUKJRVMA2PACIP2XUG3PJE" },
  { address: "HVBH2KDKB44BC6GQVXCB3Y42NA2DC6UMZU7T4XU7RP7VOX5LIICUWASNQU" },
  { address: "L67Z5S26ZW7FHNUUZXARCIRRQYNK5DFSV44NKC2VX4TIOCCTKJNOI2QZYA" },
  { address: "DHT2TX4EO23VU4RUZCG37TE7CFLG6I5T44QZSMQIQ67ZTVHEFQDVQET6OI" },
];

const confirm = async () => {
  // TODO update confirmMessage (next line)
  const confirmMessage = `This script will read the contract's metadata. It will not modify the contract or your account. Continue?`;
  const confirmed = await checkYOrN(confirmMessage);
  if (!confirmed) {
    console.log("Exiting.");
    process.exit(0);
  }
};

function sliceArrayIntoChunks(array, chunkSize) {
  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }

  return result;
}

(async () => {
  await confirm();
  // script here
  console.log("Generating transactions to sign...");
  for (const contractData of contractsData) {
    try {
      console.log(`Processing ${contractData.contractInstanceName}:`);
      const acc = algosdk.mnemonicToSecretKey(process.env.WALLET_MNEMONIC);
      const {
        arc200_name,
        arc200_symbol,
        arc200_totalSupply,
        arc200_decimals,
        safe_arc200_transfer: transfer,
      } = arc200.init(contractData.contractId, acc);
      const tokenMetadata = async () => {
        await arc200_name();
        await arc200_symbol();
        await arc200_totalSupply();
        await arc200_decimals();
      };
      await tokenMetadata();

      const algodToken = ""; // Your Algod API token
      const algodServer = process.env.ALGOD_URL; // Address of your Algod node
      const algodPort = ""; // Port of your Algod node
      const algodClient = new algosdk.Algodv2(
        algodToken,
        algodServer,
        algodPort
      );

      // send 1 token to RTKW...OGPE (simulated but not signed)
      console.log(`[send 1 token to ${accountsData[9].address.slice(0,4)}...  (simulated but not signed)]`);
      const res2 = await transfer(
        accountsData[0].address,
        100_000_000
        // default: simulate
      );
      // send 1 token to RTKW...OGPE (not simulated)
      console.log(`[send 1 token to ${accountsData[9].address.slice(0,4)}...  (not simulated)]`);
      const res = await transfer(
        accountsData[0].address,
        100_000_000,
        false // do not simulate
      );
      console.log("Waiting for confirmation...");
      await waitForConfirmation(algodClient, res.txId, 4);
      console.log("Confirmed");
      // send 1 token to RTKW...OGPE (simulated and signed)
      console.log(`[send 1 token to ${accountsData[9].address.slice(0,4)}... (simulated and signed)]`);
      const createAndSignTxn = async (address) => {
        const res3 = await transfer(
          address,
          10_000_000, // 2 VRC200
          true // simulate and sign
        );
        const res4 = res3.txns.map((txn) =>
          algosdk
            .decodeUnsignedTransaction(Buffer.from(txn, "base64"))
            .signTxn(acc.sk)
        );
        return res4;
      };
      const res4 = await createAndSignTxn(accountsData[0].address, 10_000_000);
      const res5 = await algodClient.sendRawTransaction(res4).do();
      console.log("Waiting for confirmation...");
      await waitForConfirmation(algodClient, res5.txId, 4);
      console.log("Confirmed");
      // send batch
      console.log("[send batch]");
      const accs = sliceArrayIntoChunks(accountsData, 25);
      while(accs.length > 0) {
        const lst = accs.shift();
        const res6 = await Promise.all(
          lst.map((el) => createAndSignTxn(el.address, 10_000_000))
        );
        const res7 = await Promise.all(
          res6.map((el) => algodClient.sendRawTransaction(el).do())
        );
        console.log("Waiting for confirmation...");
        await Promise.all(
          res7.map((el) => waitForConfirmation(algodClient, el.txId, 4))
        );
        console.log("Confirmed");
      }
      console.log(`Done processing ${contractData.contractInstanceName}`);
    } catch (error) {
      console.error(
        `Error processing ${contractData.contractInstanceName}:`,
        error
      );
    }
  }
})();