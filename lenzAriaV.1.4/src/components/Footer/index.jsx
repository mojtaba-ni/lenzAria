import {
  PhoneFilled,
  InstagramFilled,
  PinterestFilled,
  TwitterOutlined,
  LinkedinFilled
} from "@ant-design/icons";
import style from "./footer.module.css";

const Footer = () => {
  return (
    <div className={style.footerWrapper}>
      <div className={style.footerWrapperFirst}>
        <div className={style.footerWrapperSection}>
          <div className={style.footerTitle}>تماس با ما</div>
          <div className={style.footerContactBox}>
            <div className={style.footerContactBoxLi}>
              <PhoneFilled />
              <p>021-84169321</p>
            </div>
            <div className={style.footerContactBoxLi}>
              <PhoneFilled />
              <p>021-84169321</p>
            </div>
            <div className={style.footerContactBoxLi}>
              <PhoneFilled />
              <p>021-84169321</p>
            </div>
          </div>
        </div>

        <div className={style.footerWrapperSection}>
          <div className={style.footerTitle}>شرکت عرش طلای آریا</div>
          <div className={style.footerDesc}>
            <p>
              ما مشاوره تخصصی , پشتیبانی و خدمات پس از فروش لنز با استفاده از
              جدیدترین علم روزچشم پزشکی و اپتومتری می باشد ما مشاوره تخصصی ,
              پشتیبانی و خدمات پس از فروش لنز با استفاده از جدیدترین علم روزچشم
              پزشکی و اپتومتری می باشد
            </p>
          </div>
        </div>
        <div className={style.footerWrapperSection}>
          <div className={style.footerTitle}>تماس با ما</div>
          <div className={style.footerContactBox}>
            <div className={style.footerContactBoxLi}>
              <PhoneFilled />
              <p>021-84169321</p>
            </div>
            <div className={style.footerContactBoxLi}>
              <PhoneFilled />
              <p>021-84169321</p>
            </div>
            <div className={style.footerContactBoxLi}>
              <PhoneFilled />
              <p>021-84169321</p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.footerWrapperSec}>
        <div className={style.footerSecLine}>
          <InstagramFilled  className={style.footerIcon} />
          <PinterestFilled className={style.footerIcon} />
          <TwitterOutlined  className={style.footerIcon} />
          <LinkedinFilled className={style.footerIcon} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
