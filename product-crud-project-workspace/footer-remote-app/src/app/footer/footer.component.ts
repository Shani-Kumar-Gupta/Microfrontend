import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  likeCount: number = 0;

  ngOnInit(): void {
    // Initialize like count from storage or default to 0
    const storedCount = localStorage.getItem('likeCount');
    if (storedCount) {
      this.likeCount = parseInt(storedCount, 10);
      this.updateHeaderLikeCount();
    }
  }

  onLikeClick(): void {
    this.likeCount++;
    localStorage.setItem('likeCount', this.likeCount.toString());
    this.updateHeaderLikeCount();
  }

  private updateHeaderLikeCount(): void {
    // Dispatch custom event to communicate with header MFE
    const event = new CustomEvent('likeCountUpdated', {
      detail: { count: this.likeCount }
    });
    window.dispatchEvent(event);
  }
}

