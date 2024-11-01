const MyHTMLComponent = () => {
  const htmlString = `
    <div class="sc-fLseNd gCMRpD">
      <div class="sc-bBkKde ineHnI">
        <div class="sc-gjLLEI tCulY">
          <span class="sc-eAKtBH oKhPP">.dwdw</span>
          <img src="/src/assets/cross.png" class="sc-bZHSRq hXDYPO"/>
        </div>
        <label for="firstName" class="sc-iuOOrT czIfrq">What's Your Name? <span class="sc-iKOmoZ etRYgR">*</span></label>
        <input type="text" placeholder="John Doe" class="sc-cyZbeP iKQmSf"/>
        <label for="firstName" class="sc-iuOOrT czIfrq">What's Your Email?<span class="sc-iKOmoZ etRYgR">*</span></label>
        <input type="email" placeholder="example@domain.com" class="sc-cyZbeP iKQmSf"/>
        <label for="firstName" class="sc-iuOOrT czIfrq">How can we help you? <span class="sc-iKOmoZ etRYgR">*</span></label>
        <input type="text" placeholder="Your questions or comments" class="sc-cyZbeP iKQmSf"/>
        <button class="sc-lnsjTu iWXjWi">Send</button>
      </div>
    </div>
  `;

  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default MyHTMLComponent;
