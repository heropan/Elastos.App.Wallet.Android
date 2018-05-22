/***
 * 二维码规则
 */
export class QrcodeModel {

  public version: number;   // 版本控制 默认1.0
  public qrcode: string;    // 二维码内容
  public amount: number;    // 交易数额
  public orderId: number;   // 订单号
  public payfees: number;   // 1 sender 2 receiver
  public coinID:string;


  constructor() {
    this.version = 1.0;
    this.amount = 0;
    this.payfees = 1;
  }


}
