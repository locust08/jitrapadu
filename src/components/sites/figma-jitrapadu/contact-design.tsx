/* eslint-disable @next/next/no-img-element */
"use client";
import { Mail, Phone, Smartphone, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { ResourceFrame } from "./editorial";
import "./resources.css";
const directions="https://www.google.com/maps/search/?api=1&query=3.0705801,101.4191679";

export function ContactDesign() {
  return <ResourceFrame withCta={false}><section className="resource-hero contact-hero" data-reveal><img src="/sites/figma-jitrapadu/shared/fa8df.png" alt=""/><div className="resource-hero-copy"><p className="resource-eyebrow">Contact Us</p><h1>Contact Us</h1><p>Have a project enquiry? Send us your requirements and our team will get back to you.</p></div></section>
  <section className="resource-shell contact-layout"><div className="contact-introduction" data-reveal><h2>Contact Us</h2><p>Have a project enquiry? Send us your requirements and our team will get back to you.</p></div><div className="contact-form-panel" data-reveal><h2>Sales Enquiry Form</h2><p>Tell us about your project and our team will recommend a suitable solution based on your site condition, technical requirements and deployment timeline.</p><form onSubmit={event=>event.preventDefault()} aria-describedby="contact-activation-note">
    <label>Full name <span>*</span><input name="name" autoComplete="name" required maxLength={100}/></label>
    <label className="contact-field-half">Company <span>*</span><input name="company" required autoComplete="organization" maxLength={150}/></label>
    <label className="contact-field-half">Job Title <span>*</span><input name="jobTitle" required autoComplete="organization-title" maxLength={150}/></label>
    <label className="contact-field-half">Email <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={200}/></label>
    <label className="contact-field-half">Phone <span>*</span><input name="phone" type="tel" autoComplete="tel" required maxLength={40}/></label>
    <label>Project Location <span>*</span><input name="location" required maxLength={200}/></label>
    <label className="contact-field-half">Solution Interested In <span>*</span><select name="solution" required defaultValue=""><option value="" disabled>Please select</option><option>Telecom Tower & Monopole</option><option>Rapid Deployment System</option><option>Smart Pole & Lamp Pole</option><option>Custom Steel Fabrication</option><option>Others</option></select></label>
    <label className="contact-field-half">Project Stage<select name="stage" defaultValue=""><option value="">Please select (optional)</option>{["Planning","Tender","Design","Fabrication","Deployment","Maintenance / Upgrade"].map(stage=><option key={stage}>{stage}</option>)}</select></label>
    <label>Message / Project Requirements <span>*</span><textarea name="message" rows={6} required maxLength={4000}/></label>
    <label className="contact-consent"><input name="consent" type="checkbox" required/><span>I agree to be contacted by Jitrapadu Engineering regarding my enquiry.</span></label>
    <p className="form-delivery-note" id="contact-activation-note">Online enquiry submission will be available when the website is published. For now, please use the contact details alongside.</p>
    <button className="resource-button" type="submit" disabled>Send Enquiry <ArrowRight size={18}/></button>
  </form></div>
  <aside className="contact-details" data-reveal><p className="resource-eyebrow">Headquarters</p><h2>Jitrapadu Engineering Sdn Bhd</h2><div className="contact-detail"><Mail/><div><h3>Email</h3><a href="mailto:hello@jitrapadu.com">hello@jitrapadu.com</a></div></div><div className="contact-detail"><Phone/><div><h3>Telephone</h3><a href="tel:+60333435663">+603 3343 5663</a></div></div><div className="contact-detail"><Smartphone/><div><h3>Hazim</h3><a href="tel:+60127285663">+6012 728 5663</a><br/><a href="tel:+60177982984">+6017 7982 984</a><h3>Nazree</h3><a href="tel:+60127673631">+6012 767 3631</a></div></div><div className="contact-detail"><MapPin/><div><h3>Headquarters</h3><address>Lot 810 &amp; 811,<br/>Batu 3 ½ Jalan Kapar,<br/>42100 Klang,<br/>Selangor Darul Ehsan,<br/>Malaysia.</address></div></div></aside></section>
  <section className="resource-shell contact-map"><div><div><p className="resource-eyebrow">Our location</p><h2>Find Us on the Map</h2><p>Visit our location in Klang or use the map below to plan your route to Jitrapadu Engineering.</p></div><a href={directions} target="_blank" rel="noopener noreferrer" className="resource-outline">Get Directions <ExternalLink size={16}/></a></div><iframe title="Google Maps: Jitrapadu Engineering in Klang" src="https://www.google.com/maps?q=3.0705801,101.4191679&z=15&output=embed" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/></section>
  <section className="resource-shell contact-closing" data-reveal><h2>Let’s Build Your Next Infrastructure Project</h2><p>Whether you need a tower, smart pole, RDS structure or custom steel solution, our team is ready to help you plan, fabricate and deploy with confidence.</p><a className="resource-button" href="mailto:hello@jitrapadu.com">Contact Us Today <ArrowRight size={18}/></a></section>
  </ResourceFrame>;
}
