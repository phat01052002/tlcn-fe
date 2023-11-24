import { BottomNavigation, Button, Input } from '@mui/material';
import React from 'react';
import './css/Footer.css';
export default function Footer() {
    return (
        <div className="footer row">
            <div className="col-1"></div>
            <div className="register-follow col-10">
                <span className="input-register-follow">
                    <label>Đăng kí nhận tin</label>
                    <Input placeholder="Nhập email"></Input>
                    <Button>Đăng kí</Button>
                </span>
                <i class="fa-solid fa-couch fa-beat fa-2xl"></i>
            </div>
            <div className="col-1"></div>
            <div className="col-lg-1 col-0"></div>
            <div className="col-lg-3 col-6 info-web">
                <h3>Công ty cổ phần nội thất</h3>
                <div>
                    <i class="fa-solid fa-location-dot"></i> &nbsp; 203 Huỳnh Văn Nghệ, phường 12, quận Gò Vấp, TPHCM.
                    <br />
                    <i class="fa-solid fa-location-dot"></i> &nbsp; 32 Đường số 16, phường Linh Trung, Thủ Đức.
                    <br />
                    <i class="fa-solid fa-envelope"></i>&nbsp; chauthuanphat10@gmail.com.
                    <br />
                    <i class="fa-solid fa-phone"></i>&nbsp; 0865762255
                </div>
            </div>
            <div className="col-lg-2 col-6 chinhsach">
                <h3>Chính sách</h3>
                - Chính sách bảo hành
                <br />- Chính sách vận chuyển
                <br />- Chính sách đổi trả
                <br />- Các hình thức thanh toán
            </div>
            <div className="col-lg-2 col-6 contact">
                <h3>Liên hệ</h3>
                <label
                    onClick={() => {
                        window.location = 'https://www.facebook.com/tphat0105';
                    }}
                >
                    <i class="fa-brands fa-facebook"></i>&nbsp; Thuận Phát
                </label>
                <label
                    onClick={() => {
                        window.location = 'https://www.facebook.com/tphat0105';
                    }}
                >
                    <i class="fa-brands fa-facebook"></i>&nbsp; Thuận Phát
                </label>
            </div>
            <div className="col-lg-3 col-6 pay-method">
                <img src="https://on.net.vn/web/image/3876184-2b57e083/202166185_2021396718013233_8499389898242103910_n.png" />
            </div>
            <div className="col-lg-1 col-0"></div>
            <div className="col-12 made-by">Made By SV SPKT-Duan-Phat-@2023</div>
        </div>
    );
}
