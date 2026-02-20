"use client";

import { useEffect, useState } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function EmailTemplateBuilder({ value, onChange }: Props) {
  const [logo, setLogo] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [footer, setFooter] = useState("");

  /* =============================
     Generate Email Safe HTML
  ============================== */
  useEffect(() => {
    const html = `
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;font-family:Arial, sans-serif;">
              
              ${
                logo
                  ? `
              <tr>
                <td align="center" style="padding:20px;">
                  <img src="${logo}" width="150" style="display:block;" />
                </td>
              </tr>`
                  : ""
              }

              ${
                heroImage
                  ? `
              <tr>
                <td>
                  <img src="${heroImage}" width="600" style="width:100%;display:block;" />
                </td>
              </tr>`
                  : ""
              }

              ${
                title
                  ? `
              <tr>
                <td style="padding:20px 30px 10px 30px;">
                  <h1 style="margin:0;font-size:24px;color:#111111;">
                    ${title}
                  </h1>
                </td>
              </tr>`
                  : ""
              }

              ${
                body
                  ? `
              <tr>
                <td style="padding:10px 30px 20px 30px;color:#444444;font-size:15px;line-height:1.6;">
                  ${body}
                </td>
              </tr>`
                  : ""
              }

              ${
                buttonText && buttonLink
                  ? `
              <tr>
                <td align="center" style="padding:20px;">
                  <a href="${buttonLink}" 
                     style="background:#fbbf24;color:#000000;
                     text-decoration:none;padding:12px 24px;
                     border-radius:6px;font-weight:bold;display:inline-block;">
                     ${buttonText}
                  </a>
                </td>
              </tr>`
                  : ""
              }

              ${
                footer
                  ? `
              <tr>
                <td style="padding:20px 30px;background:#f9f9f9;font-size:12px;color:#888888;text-align:center;">
                  ${footer}
                </td>
              </tr>`
                  : ""
              }

            </table>
          </td>
        </tr>
      </table>
    `;

    onChange(html);
  }, [logo, heroImage, title, body, buttonText, buttonLink, footer]);

  return (
    <div className="space-y-6 bg-[#111111] p-6 rounded-2xl border border-neutral-800">
      <h2 className="text-lg font-semibold">Email Template Builder</h2>

      <input
        type="text"
        placeholder="Logo URL"
        value={logo}
        onChange={(e) => setLogo(e.target.value)}
        className="w-full p-3 rounded-xl bg-black border border-neutral-700"
      />

      <input
        type="text"
        placeholder="Hero Image URL"
        value={heroImage}
        onChange={(e) => setHeroImage(e.target.value)}
        className="w-full p-3 rounded-xl bg-black border border-neutral-700"
      />

      <input
        type="text"
        placeholder="Email Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded-xl bg-black border border-neutral-700"
      />

      <textarea
        placeholder="Email Body (HTML allowed)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        className="w-full p-3 rounded-xl bg-black border border-neutral-700"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Button Text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          className="p-3 rounded-xl bg-black border border-neutral-700"
        />

        <input
          type="text"
          placeholder="Button Link"
          value={buttonLink}
          onChange={(e) => setButtonLink(e.target.value)}
          className="p-3 rounded-xl bg-black border border-neutral-700"
        />
      </div>

      <textarea
        placeholder="Footer Text"
        value={footer}
        onChange={(e) => setFooter(e.target.value)}
        rows={2}
        className="w-full p-3 rounded-xl bg-black border border-neutral-700"
      />
    </div>
  );
}
