'use client';
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {usePublicSettings} from "./PublishedContentProvider";
import {contactHref} from "@/cms/public-model";
import { FigmaIcon } from "./FigmaIcon";
const assetPathPrefix="/sites/figma-jitrapadu/shared";
const imgJitrapaduSecondLogo041 = `${assetPathPrefix}/d777f.png`;
const imgFooterWithCta = `${assetPathPrefix}/e7d8f.png`;
const imgFooterWithCta1 = `${assetPathPrefix}/90da0.png`;
const imgImage236 = `${assetPathPrefix}/5607c.png`;
const imgLine4 = `${assetPathPrefix}/c87ff.svg`;
const imgLine1 = `${assetPathPrefix}/ce8f2.svg`;
export function FooterWithCta({ className, enquiryTitle, enquiryText, enquiryLabel }: { className?: string; enquiryTitle?: string; enquiryText?: string; enquiryLabel?: string }) {
  const settings=usePublicSettings();
  return (
    <div data-reveal className={className || "content-stretch flex flex-col gap-[57px] items-start p-[50px] relative w-[1920px]"} data-node-id="133:1170" data-name="Footer with CTA">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-white inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[112.49%] left-0 max-w-none top-[-12.5%] w-[116.32%]" src={imgFooterWithCta} />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[111.86%] left-0 max-w-none top-[-3.36%] w-[111.87%]" src={imgFooterWithCta1} />
        </div>
      </div>
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[var(--spacing-40,40px)] h-[402px] items-start not-italic p-[var(--spacing-40,40px)] relative rounded-[var(--spacing-24,24px)] shrink-0 text-[color:var(--color-text-inverse,white)] w-[990px]" data-node-id="133:1099" data-name="Frame">
        <div className="content-stretch flex flex-col gap-[var(--spacing-24,24px)] items-start relative shrink-0 w-full" data-node-id="133:1100">
          <p className="font-sans font-bold leading-[76px] relative shrink-0 text-[68px] tracking-[-1.8px] w-full" data-node-id="133:1101">
            {enquiryTitle || "Build Stronger Network Infrastructure with Jitrapadu"}
          </p>
          <p className="font-sans font-semibold leading-[32px] relative shrink-0 text-[24px] tracking-[-0.3px] w-full" data-node-id="133:1102">
            {enquiryText || "Tell us about your tower or monopole project and our team will recommend a structure that fits your site, load requirement and deployment timeline."}
          </p>
        </div>
        <a className="bg-[var(--color-brand-primary,#007cf8)] content-stretch flex gap-[15px] items-center justify-center px-[20px] py-[10px] relative rounded-[30px] shrink-0 text-[16px] whitespace-nowrap" data-node-id="133:1103" data-name="Button" href="/contact-us">
          <p className="font-sans font-semibold leading-[20px] relative shrink-0 tracking-[0.1px]" data-node-id="I133:1103;14:396">
            {enquiryLabel || "Send an Enquiry"}
          </p>
          <FigmaIcon name="envelope"  className=" leading-[1.6] relative shrink-0" data-node-id="I133:1103;14:397" />
        </a>
      </div>
      <div className="backdrop-blur-[2.5px] bg-[rgba(9,42,84,0.9)] content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--spacing-24,24px)] shrink-0 w-full" data-node-id="133:1104" data-name="Footer" id="contact">
        <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="133:1106">
          <div className="content-stretch flex flex-[1_0_0] gap-[50px] items-start min-w-px p-[50px] relative" data-node-id="133:1126" data-name="footer-columns">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[50px] items-start min-w-px px-[5px] relative self-stretch" data-node-id="184:952" data-name="about">
              <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0" data-node-id="184:953">
                <div className="h-[60px] relative shrink-0 w-[277px]" data-node-id="184:954" data-name="Jitrapadu Second logo-04 1">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[195.12%] left-[-14.32%] max-w-none top-[-47.56%] w-[126%]" src={imgJitrapaduSecondLogo041} />
                  </div>
                </div>
                <div className="[word-break:break-word] font-sans font-semibold leading-[0] not-italic relative shrink-0 text-[24px] text-[color:var(--color-text-inverse,white)] tracking-[-0.3px] whitespace-nowrap" data-node-id="184:955">
                  <p className="leading-[32px] mb-0">Engineering Excellence,</p>
                  <p className="leading-[32px]">Powering Innovation</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-px relative" data-node-id="133:1127" data-name="Quick Links">
              <p className="[word-break:break-word] font-sans font-semibold leading-[26px] not-italic relative shrink-0 text-[18px] text-[color:var(--color-text-inverse,white)] w-[200px]" data-node-id="133:1128">
                Quick Links
              </p>
              <div className="h-0 relative shrink-0 w-full" data-node-id="133:1129">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine4} />
                </div>
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col font-sans font-normal gap-[10px] items-start not-italic relative shrink-0 text-[16px] text-[color:var(--color-text-inverse,white)] w-full" data-node-id="133:1130">
                <Link className="block cursor-pointer leading-[0] relative shrink-0 w-full" data-node-id="133:1131" href="/about-us">
                  <p className="leading-[26px]">About Us</p>
                </Link>
                <Link className="block cursor-pointer leading-[0] relative shrink-0 w-full" data-node-id="133:1132" href="/our-factory">
                  <p className="leading-[26px]">Our Factory</p>
                </Link>
                <Link className="leading-[26px] relative shrink-0 w-full" data-node-id="133:1173" href="/portfolio">
                  Portfolio
                </Link>
                <Link href="/news-events" className="leading-[26px] relative shrink-0 w-full" data-node-id="133:1133">{`News & Events`}</Link>
                <Link href="/csr" className="leading-[26px] relative shrink-0 w-full" data-node-id="133:1134">
                  CSR
                </Link>
                <a className="leading-[26px] relative shrink-0 w-full" data-node-id="133:1135" href="/contact-us">
                  Contact Us
                </a>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-px relative" data-node-id="133:1136" data-name="Quick Links">
              <p className="[word-break:break-word] font-sans font-semibold leading-[26px] not-italic relative shrink-0 text-[18px] text-[color:var(--color-text-inverse,white)] w-[200px]" data-node-id="133:1137">
                Our Solutions
              </p>
              <div className="h-0 relative shrink-0 w-full" data-node-id="133:1138">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine4} />
                </div>
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col font-sans font-normal gap-[10px] items-start not-italic relative shrink-0 text-[16px] text-[color:var(--color-text-inverse,white)]" data-node-id="133:1139">
                <Link className="block cursor-pointer leading-[0] relative shrink-0 w-full" data-node-id="133:1140" href="/solutions/telecom-tower-monopole">
                  <p className="leading-[26px]">{`Telecom Tower & Monopole`}</p>
                </Link>
                <Link href="/solutions/rapid-deployment-system" className="leading-[26px] relative shrink-0 w-full" data-node-id="133:1141">
                  Rapid Deployment System
                </Link>
                <Link href="/solutions/smart-pole-lamp-pole" className="leading-[26px] relative shrink-0 w-full" data-node-id="133:1142">{`Smart Pole & Lamp Pole`}</Link>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-px relative" data-node-id="133:1143" data-name="Quick Links">
              <p className="[word-break:break-word] font-sans font-semibold leading-[26px] not-italic relative shrink-0 text-[18px] text-[color:var(--color-text-inverse,white)] w-[200px]" data-node-id="133:1144">
                Contacts
              </p>
              <div className="h-0 relative shrink-0 w-full" data-node-id="133:1145">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine4} />
                </div>
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[10px] items-start not-italic relative shrink-0 w-full" data-node-id="133:1146" data-name="contact-items">
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="133:1147" data-name="contact-row-0">
                  <FigmaIcon name="location-dot"  className=" leading-[1.6] relative shrink-0 text-[color:var(--color-brand-primary,#007cf8)] text-[length:var(--font-size-body,16px)] text-justify whitespace-nowrap" data-node-id="133:1148" />
                  <div className="flex-[1_0_0] font-sans font-normal leading-[0] min-w-px relative text-[16px] text-[color:var(--color-text-inverse,white)] whitespace-pre-wrap" data-node-id="133:1149">
                    {settings.address!.split(/\n/).map((line,index)=><p className="leading-[26px]" key={index}>{line}</p>)}
                  </div>
                </div>
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="133:1150" data-name="contact-row-1">
                  <FigmaIcon name="phone"  className=" leading-[1.6] relative shrink-0 text-[color:var(--color-brand-primary,#007cf8)] text-[length:var(--font-size-body,16px)] text-justify whitespace-nowrap" data-node-id="133:1151" />
                  <div className="flex-[1_0_0] font-sans font-normal leading-[0] min-w-px relative text-[16px] text-[color:var(--color-text-inverse,white)]" data-node-id="133:1152">
                    <a href={contactHref("phone",settings.phone!)} className="block leading-[26px]">{settings.phone}</a>
                    <a href={contactHref("phone",settings.mobile!)} className="block leading-[26px]">{settings.mobile}</a>
                    <a href="tel:+60127285663" className="block leading-[26px]">Hazim: +6012 728 5663</a>
                    <a href="tel:+60127673631" className="block leading-[26px]">Nazree: +6012 767 3631</a>
                  </div>
                </div>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="133:1153" data-name="contact-row-2">
                  <FigmaIcon name="envelope"  className=" leading-[1.6] relative shrink-0 text-[color:var(--color-brand-primary,#007cf8)] text-[length:var(--font-size-body,16px)] text-justify whitespace-nowrap" data-node-id="133:1154" />
                  <a className="flex-[1_0_0] font-sans font-normal leading-[26px] min-w-px relative text-[16px] text-[color:var(--color-text-inverse,white)]" data-node-id="133:1155" href={contactHref("email",settings.email!)}>
                    {settings.email}
                  </a>
                </div>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="133:1156" data-name="contact-row-2">
                  <FigmaIcon name="fax"  className=" leading-[1.6] relative shrink-0 text-[color:var(--color-brand-primary,#007cf8)] text-[length:var(--font-size-body,16px)] text-justify whitespace-nowrap" data-node-id="133:1157" />
                  <p className="flex-[1_0_0] font-sans font-normal leading-[26px] min-w-px relative text-[16px] text-[color:var(--color-text-inverse,white)]" data-node-id="133:1158">
                    {settings.fax}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[rgba(230,240,235,0.3)] border-solid border-t content-stretch flex items-start justify-between px-[50px] py-[30px] relative shrink-0 w-full" data-node-id="133:1160" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1820 140' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-62.35 2.1307e-14 0.0000010153 -62.35 1820 70)'><stop stop-color='rgba(152,204,255,1)' offset='0.35209'/><stop stop-color='rgba(114,184,253,0.75)' offset='0.51406'/><stop stop-color='rgba(76,164,252,0.5)' offset='0.67604'/><stop stop-color='rgba(0,124,248,0)' offset='1'/></radialGradient></defs></svg>\")" }} data-name="bottom-bar">
          <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-node-id="184:919">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="133:1162">
              <Link className="[word-break:break-word] font-sans font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-text-inverse,white)] whitespace-nowrap" data-node-id="133:1163" href="/disclaimer">
                Disclaimer
              </Link>
              <div className="flex h-[22px] items-center justify-center relative shrink-0 w-0" data-node-id="133:1164">
                <div className="flex-none rotate-90">
                  <div className="h-0 relative w-[22px]">
                    <div className="absolute inset-[-1px_0_0_0]">
                      <img alt="" className="block max-w-none size-full" src={imgLine1} />
                    </div>
                  </div>
                </div>
              </div>
              <Link className="[word-break:break-word] font-sans font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-text-inverse,white)] whitespace-nowrap" data-node-id="133:1165" href="/privacy-policy">
                Privacy Policy
              </Link>
              <div className="flex h-[22px] items-center justify-center relative shrink-0 w-0" data-node-id="133:1166">
                <div className="flex-none rotate-90">
                  <div className="h-0 relative w-[22px]">
                    <div className="absolute inset-[-1px_0_0_0]">
                      <img alt="" className="block max-w-none size-full" src={imgLine1} />
                    </div>
                  </div>
                </div>
              </div>
              <Link className="[word-break:break-word] font-sans font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-text-inverse,white)] whitespace-nowrap" data-node-id="133:1167" href="/terms-and-conditions">{`Terms & Conditions`}</Link>
            </div>
            <p className="[word-break:break-word] font-sans font-normal leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--color-text-inverse,white)] whitespace-nowrap" data-node-id="133:1161">
              <span className="footer-copyright-company">© 2026 {settings.companyName}</span>{" "}
              <span className="footer-copyright-registration">0779493A (200701021478).</span>{" "}
              <span className="footer-copyright-rights">All rights reserved.</span>
            </p>
          </div>
          <div className="h-[80px] relative shrink-0 w-[275px]" data-node-id="184:913" data-name="image 236">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage236} />
          </div>
        </div>
      </div>
    </div>
  );
}
