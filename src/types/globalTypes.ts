// Source
export const WEBSITE_SRC: number = 4;

// Payment method
export const COD: number = 1; // Tiền mặt
export const CARD: number = 2; // Chuyển khoản
export const BAOKIM: number = 3;
export const INTERNET_BANKING: number = 4;
export const VISA: number = 5; // Thanh toán qua thẻ visa hoặc master-card

// Payment status
export const PENDING: number = 0;
export const FAIL: number = 1; // Chưa thanh toán
export const DEBT: number = 2; // Khách còn nợ
export const PAID: number = 3; // Đã thanh toán

// Status
export const AVAILABLE: number = 1;
export const UNAVAIABLE: number = 0;

// Booking Status
export const BOOKING_NEW: number = 1; // Đơn mới
export const BOOKING_CONFIRM: number = 2; // Đã xác nhận
export const BOOKING_USING: number = 3;
export const BOOKING_COMPLETE: number = 4;
export const BOOKING_CANCEL: number = 5;

// Type lists
export const BOOKING_TYPE_HOUR: number = 1; // Hour
export const BOOKING_TYPE_DAY: number = 2; // Day

//
export const OFFLINE: number = 1;
export const ONLINE: number = 2;

//
export const UNCONFIRMED: number = 0; // Chưa được xác nhận thanh toán
export const CONFIRM: number = 1; // Xác nhận thanh toán

// Đi công tác
export const BUSINESS_TRIP: number = 1; // Tôi đi công tác
export const NOT_BUSINESS_TRIP: number = 0;

// Nguồn đặt lists
export const FANPAGE: number = 1;
export const HOTLINE: number = 2;
export const CHATBOT: number = 3;
export const WEBSITE: number = 4;
export const AIRBNB: number = 5;
export const BOOKING: number = 6;

// Trạng thái payment history
export const UNPAID: number = 0;
export const PARTLY_PAID: number = 1;
export const FULLY_PAID: number = 2;

// Booking Cancel Status
export const BOOKING_CANCEL_AVAILABLE: number = 0;
export const BOOKING_CANCEL_UNAVAILABLE: number = 1;
export const BOOKING_CANCEL_LEVEL: number = 4;

// Datetime
export const DEFAULT_DATE_TIME_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

export const IMAGE_URL = 'https://s3-ap-southeast-1.amazonaws.com/westay-img/';
export const IMAGE_STORAGE_LG = IMAGE_URL + 'lg/';
export const IMAGE_STORAGE_SM = IMAGE_URL + 'sm/';
export const IMAGE_STORAGE_MD = IMAGE_URL + 'md/';
export const IMAGE_STORAGE_XS = IMAGE_URL + 'xs/';
