import React, { ReactNode } from "react";

const Bios: { time: string; content: ReactNode }[] = [
  {
    time: "2001",
    content: "Sinh ra trong một gia đình nghèo khó tại Thường Tín, Hà Nội",
  },
  {
    time: "2019",
    content:
      "Nhờ vào lỗ lực của bản thân, anh ấy đã đậu trường Cao đẳng Bách Khoa danh giá mà nhiều người mơ ước",
  },
  {
    time: "09/2021",
    content: (
      <>
        Trong thời gian diễn ra bệnh dịch Covid-19, mình tận dụng những thời
        gian cách ly để bắt đầu học những thứ căn bản về Javascript
      </>
    ),
  },
  {
    time: "03/2022",
    content: "Thực tập sinh với vị trí Frontend Developer",
  },
  {
    time: "06/2022",
    content: "Tốt nghiệp loại khá với bằng kỹ sư",
  },
  {
    time: "09/2022 - 11/2023",
    content:
      "Frontend Developer tại CÔNG TY CỔ PHẦN CÔNG NGHỆ & TRUYỀN THÔNG XTEL",
  },
];

const Bio = () => (
  <div className="mt-6">
    <h3 className="text-xl font-bold underline decoration-4 decoration-gray-500 underline-offset-4">
      Bio
    </h3>

    <table className="mt-2">
      <tbody>
        {Bios.map(({ content, time }) => (
          <tr key={time} className="leading-5 align-top">
            <td className="pr-5 py-2 text-start">
              <strong>{time}</strong>
            </td>
            <td className="py-2">{content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Bio;
